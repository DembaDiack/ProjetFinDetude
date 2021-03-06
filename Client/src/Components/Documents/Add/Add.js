import React, { useState, useEffect, useRef } from "react";
import Auth from "../../../Auth/Auth";
import Axios from "axios";
import { upload as dropboxUpload, upload_sessions } from "../../../Dropbox/Dropbox";
import { connect } from "react-redux";
import "./Toggle-Switches.css";
import File from "./File";

const Add = props => {
  // const uploadStatus = {
  //   onUploadProgress: function(progressEvent) {
  //     var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
  //     console.log("uploading : ",percentCompleted)
  //   }
  // }

  const auth = new Auth();
  const [percentage, setPercentage] = useState(0);
  const supportedDocuments = ["application/pdf","image/jpeg","image/png","text/plain","image/bmp","text/css","application/vnd.openxmlformats-officedocument.wordprocessingml.document","application/msword","text/html","application/vnd.ms-powerpoint","application/vnd.openxmlformats-officedocument.presentationml.presentation","image/svg+xml"];


  const initialUpload = {
    fileList: [],
    user: null,
    button: "btn btn-secondary",
    faculty: null,
    files: null,
    filetitle: null,
    year: 1,
    tags: ""
  }
  const [upload, setUpload] = useState(initialUpload);
  const [uploadBtn, setUploadBtn] = useState({
    status: "send"
  })
  // const [type,setType] = useState("public");

  // const handleSubmit = event =>
  // {
  //   event.preventDefault();
  //   console.log(type);
  //   upload(props.user,file,type)
  //   .then(result => {
  //     console.log(result);
  //     Axios.post("/add",{
  //       documentInfo : result,
  //       email : auth.getEmail()
  //     })
  //     .then(result => {
  //       console.log(result);
  //     })
  //   })
  // }
  // const handleChange = event =>
  // {
  //   event.preventDefault();
  //   setFile(event.target.files[0]);
  // }
  // const switchType = event => {
  //   event.preventDefault();
  //   setType(event.target.value);
  // }
  const dragAreaInitState = { border: 'dashed 2px rgb(167,167,167)', padding: 13, marginTop: 23, borderRadius: 8 };
  const [dragAreaState, setDragAreaState] = useState(dragAreaInitState);
  const dragStart = event => {

  }
  const dragEnd = event => {
    console.log("left");
    setDragAreaState(dragAreaInitState);
  }
  const dragExit = event => {
    event.preventDefault();
    console.log("left");
    setDragAreaState(dragAreaInitState);
  }
  const dragEnter = event => {
    event.preventDefault();
    console.log(event);
    setDragAreaState({
      ...dragAreaState,
      border: "dashed 2px red"
    })
  }
  const dragOver = event => {
    event.preventDefault();
  }
  const drop = event => {
    event.preventDefault();
    event.stopPropagation();
    console.log(event.dataTransfer.files);
    if(!supportedDocuments.includes(event.dataTransfer.files[0].type))
    {
      window.alert(`file type not supported! => ${event.dataTransfer.files[0].type}`);
      setDragAreaState(dragAreaInitState);
      return;
    }
    // setUpload(event.dataTransfer.files);
    setUpload({
      ...upload,
      button: "btn btn-success",
      files: event.dataTransfer.files
    });
    setDragAreaState(dragAreaInitState);
  }

  const fileInputBtn = useRef();

  const clickInput = event => {
    fileInputBtn.current.click();
  }

  const loadFile = event => {
    if(!supportedDocuments.includes(event.target.files[0].type))
    {
      window.alert(`file type not supported! => ${event.target.files[0].type}`);
      return;
    }
    setUpload({
      ...upload,
      button: "btn btn-success",
      files: event.target.files
    });
  }

  const handleSubmit = event => {
    let fileList = [];
    event.preventDefault();
    if (upload.files !== null) {
      for (let i = 0; i <= upload.files.length - 1; i++) {
        const filter = upload.files[i].name.split(".");
        const extension = filter[filter.length - 1];
        fileList.push(<File fileName={upload.files[i].name} key={i} />)
        console.log(extension);
      }
      setUpload({
        ...upload,
        fileList: fileList,
        tags: upload.tags
      })
      startUpload();
    }
  }


  const startUpload = () => {
    console.log(upload.files);
    const email = auth.getEmail();
    console.log("email", email);
    if (email) {
      for (let i = 0; i <= upload.files.length - 1; i++) {
        const result = upload_sessions(email, upload.files[i], upload.faculty, upload.filetitle, upload.year, upload.tags, setPercentage)
          .then(result => {
            setPercentage(100);
            setUpload(initialUpload);
            setUploadBtn({
              status: "send"
            })
          })
        setUploadBtn({
          status: "uploading..."
        })

      }
    }

  }

  const handleChange = event => {
    setUpload({
      ...upload,
      [event.target.name]: event.target.value
    })
  }

  useEffect(() => {

    if (upload.files === null) {
      setUpload({
        ...upload,
        button: initialUpload.button
      })
    }
    else {
      setUpload({
        ...upload,
        filetitle: upload.files[0].name
      })
    }
  }, [upload.button, upload.files])

  useEffect(() => {
    if (props.user) {
      setUpload({
        ...upload,
        faculty: props.user.faculty
      })
    }
  }, [props.user])

  const cancelUpload = event => {
    setUpload(initialUpload);
  }


  useEffect(() => {
    console.log("upload updated", upload);
  }, [upload])




  return (
    <form
      className="drop-area"
      method="post"
      enctype="multipart/form-data"
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="container d-sm-flex flex-column justify-content-sm-center align-items-sm-center"
        style={dragAreaState}
        onDragEnter={(e) => dragEnter(e)}
      onDragLeave={(e) => dragExit(e)}
      onDrop={(e) => drop(e)}
      onDragOver={(e) => dragOver(e)}
        >
        <p className="text-center"><strong>Upload File</strong></p><img />
        <p>Drag and drop or&nbsp;<strong style={{ color: "#4B9DEA", cursor: "pointer" }} onClick={(e) => clickInput(e)}>Browse</strong> for a file</p>
        <input type="file" name="file" multiple={false} hidden={true} ref={fileInputBtn} onChange={(e) => loadFile(e)} />
        <div className="options" style={{display : "flex"}}>
        <p style={{ fontSize: 13 , marginLeft : 5 }} >Faculty<br /> <select className="form-control" name="faculty" onChange={(e) => handleChange(e)} >
          <optgroup label="Choose the faculty you belong to">
            <option value="DI" defaultValue>DI</option>
            <option value="BA">BA</option>
            <option value="FC">FC</option>
            <option value="GRH">GRH</option>
            <option value="IG">IG</option>
            <option value="RT">RT</option>
            <option value="SAE">SAE</option>
            <option value="TCM">TCM</option>
          </optgroup>
        </select></p>
        <p style={{ fontSize: 13 , marginLeft : 5 }} >Year<br /> <select className="form-control" name="year" onChange={(e) => handleChange(e)} >
          <optgroup label="Faculty year">
            <option value={1} defaultValue>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </optgroup>
        </select></p>
        </div>
        <input onChange={(e) => handleChange(e)} type="text" name="tags" className="form-control mb-3" id="tags" aria-describedby="tagshelp" placeholder="Enter Tags , seperated by commas" />
        <div className="progress" style={{ height: 30, width: "100%", marginBottom: 10 }}>
              <div className="progress-bar" role="progressbar" style={{ width: `${Math.floor(percentage)}%` }} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100} />
        </div>
        <input type="submit" value={uploadBtn.status} className={upload.button} style={{ width: "35%" }} />
        {upload.files ? <button className="btn btn-danger" onClick={() => cancelUpload()} style={{ margin: 10, width: "35%" }}>Cancel</button>
          : null}
      </div>

    </form>

  );
};


const mapStateToProps = state => {
  return {
    connected: state.connected,
    user: state.user
  }
}


export default connect(mapStateToProps)(Add);
