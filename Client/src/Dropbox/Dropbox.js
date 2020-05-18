import {Dropbox} from "dropbox";
import Axios from "axios";
import Auth from "../Auth/Auth";
const ACCESS_TOKEN = "private_key";
const dropbox = new Dropbox({accessToken: ACCESS_TOKEN});
const auth = new Auth();

const upload = (email,file,faculty,title)=>
{
  //dropbox
  const path = `/iscae/${email}/${file.name}`;
  return dropbox.filesUpload({
    contents : file,
    path : path
  })
  .then(result => {
    console.log(result);
    return Axios.post("/add", {
      documentInfo: {...result,faculty : faculty,title : title},
      email: email
    })
      .then(result => {
        console.log(result);
      })
  })
  .catch(err => {
    return err
    console.log(err);
  })
}

const listDocsByFolder = email => {
  return dropbox.filesListFolder({
    path : `/iscae/${email}/`
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
    path : id
  })
  .then(result => {
    const url = window.URL.createObjectURL(result.fileBlob);
    window.open(url,"_blank");
    return url;
  })
  .catch(err => err)
}

const temp_link = id => {
  return dropbox.filesGetTemporaryLink({
    path : id
  })
  .then(result => result)
  .catch(err => err)
}
const preview = id =>{
  dropbox.filesGetPreview({
    path:`id:${id}`
  })
}

const deleteFile = id => {
  return dropbox.filesDelete({
    path : id
  })
  .then(result => result)
  .catch(err => err)
}

const editProfilePicture = (image,email) => {
  if(email)
  {
    console.log("uploading to ...", `/iscae/${email}/profile`);
  return dropbox.filesUpload({
    path : `/iscae/${email}/profile`,
    contents : image
  })
  .then(imageResult => {
    console.log(imageResult);
    dropbox.sharingCreateSharedLink({
      path : imageResult.id
    })
    .then(link => {
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
  else{
    throw "bad path";
  }
}

export {
  upload,
  listDocsByFolder,
  downloadFile,
  temp_link,
  deleteFile,
  editProfilePicture
};
