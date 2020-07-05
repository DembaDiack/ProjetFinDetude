import React, { useEffect, useState } from "react";
import { ReactComponent as Book } from "../SVG/book.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import Axios from "axios";
import "../sanfrancisco/stylesheet.css";
import poster from "../Media/poster.jpeg";
import nopreview from "../Media/nopreview.png";
import {getThumbnail} from "../Dropbox/Dropbox";
import Card from "../Components/Browse/Card";

const Home = () => {



  const [cards,setCards] = useState([]);
  const [documents,setDocuments] = useState([]);

  useEffect(() => {
    document.body.style.backgroundColor = "rgb(36, 41, 46)";
    document.body.style.fontFamily = "SF Pro";
    console.log(poster);
    Axios.get("/loadFeatured")
      .then(result => {
        console.log(result);
        setDocuments(result.data);
      })
      .catch(err => {
        console.log(err);
      })

    return () => {
      document.body.style.backgroundColor = "initial";
    }
  }, []);

  const task = ()=> {
    console.log(documents);
    if(documents.length === 0)
    {
      return;
    }
    try
    {
      getThumbnail(documents[0].info.path_display)
    .then(result => {
      const url = URL.createObjectURL(result.fileBlob);
      const temp = cards;
      console.log("rrr",result);
      temp.push(<Card src={url} key={result.rev} id={result.id} title={result.name} />);
      setCards(temp);
      const temp_docs = documents.slice(1);
      setDocuments(temp_docs);
    })
    .catch(err => {
      try
      {
        const parsed = JSON.parse(err.error);
        console.log(parsed);
        if(parsed.error_summary === "unsupported_extension/.." || parsed.error_summary === "unsupported_extension/..." || parsed.error_summary === "unsupported_extension/." || parsed.error_summary === "unsupported_extension/")
        {
          console.log("herererer");
          const temp = cards;
          temp.push(<Card src={nopreview} key={documents[0].info.rev} id={documents[0].info.id} title={documents[0].info.name} />);
          setCards(temp);
        }
      }
      catch(err)
      {

      }
      const temp_docs = documents.slice(1);
      setDocuments(temp_docs);
    })
    }
    catch(err)
    {
      console.log(err);
      task();
    }
  }

  useEffect(() => {
    task();
  }, [documents]);


  return (
    <div>
      <div
        className="poster"
        style={{
          width: "100%",
          height: 500,
          display: "flex",
          color: "white",
          textAlign: "center",
          justifyContent: "center",
          backgroundImage: `url(${poster})`,
          backgroundSize: "cover",
          filter: "grayscale(100%) blur(2px)",
          position: "relative",
        }}
      ></div>
      <div
        className="bg-text"
        style={{
          position: "absolute",
          top: "55%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          color : "white",
          width : "100%",
          textAlign : "center",
          display : "flex",
          flexDirection : "column",
          justifyContent : "center"
        }}
      >
        <h1 style={{ paddingTop: 15 , fontWeight : "bold"}}>
          Download And Read Textbooks from your fellow students
        </h1>
        <h6>Welcome student! here you can browse and download and share documents uploaded <br/> by either you or other students , ask teachers a question. and soon much more!</h6>
        <h6><FontAwesomeIcon icon={faStar} style={{color : "var(--blue)"}}/> Popular Downloads</h6>
        <div style={{display : "flex" , flexDirection : "row" , paddingTop : 35 , height : 427}} className="container">
          {cards}
        </div>
      </div>
      
    </div>
  );
}

export default Home;