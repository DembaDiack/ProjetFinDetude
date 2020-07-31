import React, { useEffect, useState } from "react";
import { ReactComponent as Book } from "../SVG/book.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import Axios from "axios";
import "../sanfrancisco/stylesheet.css";
import poster from "../Media/poster.jpeg";
import nopreview from "../Media/nopreview.png";
import { getThumbnail } from "../Dropbox/Dropbox";
import Card from "../Components/Browse/Card";
import Skeleton from "react-loading-skeleton";

const Home = () => {



  const [cards, setCards] = useState([]);
  const [documents, setDocuments] = useState([]);

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

  const task = () => {
    console.log(documents);
    if (documents.length === 0) {
      return;
    }
    try {
      getThumbnail(documents[0].info.path_display)
        .then(result => {
          const url = URL.createObjectURL(result.fileBlob);
          const temp = cards;
          console.log("rrr", result);
          temp.push(<Card src={url} key={result.rev} id={result.id} title={result.name} />);
          setCards(temp);
          const temp_docs = documents.slice(1);
          setDocuments(temp_docs);
        })
        .catch(err => {
          try {
            const parsed = JSON.parse(err.error);
            console.log(parsed);
            if (parsed.error_summary === "unsupported_extension/.." || parsed.error_summary === "unsupported_extension/..." || parsed.error_summary === "unsupported_extension/." || parsed.error_summary === "unsupported_extension/") {
              console.log("herererer");
              const temp = cards;
              temp.push(<Card src={nopreview} key={documents[0].info.rev} id={documents[0].info.id} title={documents[0].info.name} />);
              setCards(temp);
            }
          }
          catch (err) {

          }
          const temp_docs = documents.slice(1);
          setDocuments(temp_docs);
        })
    }
    catch (err) {
      console.log(err);
      task();
    }
  }

  useEffect(() => {
    task();
  }, [documents]);


  return (
    <div>
      <Skeleton/>
    </div>
  );
}

export default Home;