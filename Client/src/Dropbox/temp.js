const upload = (email,file,faculty,title,year,tags)=>
{
  //dropbox
  const path = `/iscae/${email}/${file.name}`;
  return dropbox.filesUpload({
    contents : file,
    path : path
  })
  .then(result => {
    console.log(result);
    console.log("received tags : ",tags);
    tags = tags.split(",");
    return Axios.post("/add", {
      documentInfo: {...result,faculty : faculty,title : title , views : 0 , year : year , lastSeen : Date.now() , downloads : 0 , tags : tags},
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