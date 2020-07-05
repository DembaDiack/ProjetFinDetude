import { Dropbox } from "dropbox";
import Axios from "axios";
import Auth from "../Auth/Auth";
const ACCESS_TOKEN = "TlKu2L-kEpAAAAAAAAAApUJO7qAGP3oAuJJTfLxKLiLW_pF3G9mvXn6Le7aWRVBH";
const dropbox = new Dropbox({ accessToken: ACCESS_TOKEN });
const auth = new Auth();

const upload = (email, file, faculty, title, year, tags) => {
  //dropbox
  const path = `/iscae/${email}/${file.name}`;
  return dropbox.filesUpload({
    contents: file,
    path: path
  })
    .then(result => {
      console.log(result);
      console.log("received tags : ", tags);
      tags = tags.split(",");
      return Axios.post("/add", {
        documentInfo: { ...result, faculty: faculty, title: title, views: 0, year: year, lastSeen: Date.now(), downloads: 0, tags: tags },
        email: email
      })
        .then(result => {
          console.log(result);
        })
    })
    .catch(err => {
      console.log(err);
      return err
    })
}

const listDocsByFolder = email => {
  return dropbox.filesListFolder({
    path: `/iscae/${email}/`
  })
    .then(result => {
      return result;
    })
    .catch(err => {
      return [];
    })
}

const downloadFile = id => {
  return dropbox.filesDownload({
    path: id
  })
    .then(result => {
      const url = window.URL.createObjectURL(result.fileBlob);
      window.open(url);
      // window.open(url,"_blank");
      return url;
    })
    .catch(err => err)
}

const temp_link = id => {
  return dropbox.filesGetTemporaryLink({
    path: id
  })
    .then(result => result)
    .catch(err => err)
}
const preview = id => {
  dropbox.filesGetPreview({
    path: `id:${id}`
  })
}

const deleteFile = id => {
  return dropbox.filesDelete({
    path: id
  })
    .then(result => result)
    .catch(err => err)
}

const editProfilePicture = (image, email) => {
  if (email) {
    console.log("uploading to ...", `/iscae/${email}/profile`);
    return dropbox.filesDelete({
      path: `/iscae/${email}/profile.jpg`
    })
      .then(result => {
        return profileFunction(image, email);
      })
      .catch(err => {
        return profileFunction(image, email);
      })
  }
  else {
    throw "bad path";
  }
}


const profileFunction = (image, email) => {
  return dropbox.filesUpload({
    path: `/iscae/${email}/profile.jpg`,
    contents: image,
    strict_conflict: false
  })
    .then(imageResult => {
      console.log(imageResult);
      dropbox.sharingCreateSharedLink({
        path: imageResult.path_lower
      })
        .then(link => {
          getProfilePicture();
          console.log(link);
        })
        .catch(err => {
          console.log(err);
        })
    })
    .catch(err => {
      console.log(err);
      return err;
    })
}

const getProfilePicture = () => {
  return dropbox.sharingCreateSharedLink({
    path: `/iscae/${auth.getEmail()}/profile.jpg`
  })
    .then(result => {
      console.log("pppp", result);
      auth.getUserInfo()
        .then(data => {
          console.log(data);
          data.avatar = result.url.split("?")[0] + "?dl=1";
          Axios.post("/update", {
            data: data
          })
            .then(result => {
              console.log(result);

            })
        })
      return result;
    })
    .catch(err => {
      console.log("pppppp", err);
      return err;
    })
}

const getThumbnail = (path) => {
  return dropbox.filesGetThumbnail({
    path: path,
    format: "jpeg",
    size: "w960h640"
  })
    .then(result => {
      console.log("thumbnail result",result);
      return result;
    })
}


const upload_sessions = (email, file, faculty, title, year, tags,setPercentage) => {
  try {
    const path = `/iscae/${email}/${file.name}`;
    let maxBlob = 1 * 1000 * 100;
    if(file.size <= maxBlob)
    {
      maxBlob = file.size / 2;
    }
    let workItems = [];
    let offset = 0;
    let sessionID;
    let percentage = 0;

    while (offset < file.size) {
      const chunkSize = Math.min(maxBlob, file.size - offset);
      workItems.push(file.slice(offset, offset + chunkSize));
      offset += chunkSize;
    }

    const task = workItems.reduce((acc, blob, idx, items) => {
      if (idx == 0) {
        // Starting multipart upload of file
        percentage = (idx * maxBlob) * 100 / file.size;
        return acc.then(function() {
          return dropbox.filesUploadSessionStart({ close: false, contents: blob})
                    .then(response => {
                      console.log("percentage",percentage);
                      setPercentage(percentage);
                      return response.session_id;
                    })
        });        
          
      } else if (idx < items.length-1) {  
        // Append part to the upload session
        return acc.then(function(sessionId) {
         var cursor = { session_id: sessionId, offset: idx * maxBlob };
         return dropbox.filesUploadSessionAppendV2({ cursor: cursor, close: false, contents: blob }).then(() => {
          percentage = (idx * maxBlob) * 100 / file.size;
          console.log("percentage",percentage);
          setPercentage(percentage);
           return sessionId}); 
        });
      } else {
        // Last chunk of data, close session
        return acc.then(function(sessionId) {
          var cursor = { session_id: sessionId, offset: file.size - blob.size };
          var commit = { path: path, mode: 'add', autorename: true, mute: false };              
          return dropbox.filesUploadSessionFinish({ cursor: cursor, commit: commit, contents: blob }).then((result) => {
            percentage = (idx * maxBlob) * 100 / file.size;
            console.log("percentage",percentage);
            console.log(result);
            setPercentage(percentage);
            return result;
          })        
        });
      } 
      
    }, Promise.resolve());

    return task
    .then(result => {
      return Axios.post("/add", {
        documentInfo: { ...result, faculty: faculty, title: title, views: 0, year: year, lastSeen: Date.now(), downloads: 0, tags: tags },
        email: email
      })
        .then(result => {
          console.log(result);
        })
    })
    .catch(err => {
      
      console.log(err);
      return err;
    })

  }
  catch (err) {
    return err;
    console.log(err);
  }
}

export {
  upload,
  listDocsByFolder,
  downloadFile,
  temp_link,
  deleteFile,
  editProfilePicture,
  getProfilePicture,
  getThumbnail,
  upload_sessions
};
