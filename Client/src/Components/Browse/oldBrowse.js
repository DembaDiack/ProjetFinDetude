import React, { useEffect, useState, useRef } from "react"
import Axios from "axios";
import "../Style/global.css";
import "./Browse.css";
import Card from "./Card";
import {getThumbnail} from "../../Dropbox/Dropbox";
import nopreview from "./nopreview.png"

const Browse = (props) => {
  const [documents, setDocuments] = useState([]);
  const [cards, setCards] = useState([]);
  const category = new URLSearchParams(props.location.search).get("category");
  const initialState = {
    age: "asc",
    views: "asc",
    query: ""
  }

  /* search has been disabled by me, theres a terrible glitch where everything gets doubled since i started to push docs instead of loading them allover again */
  
  const [state, setState] = useState(initialState);
  const handleChange = event => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  }
  console.log(category);

  const loadDocuments = () => {
    Axios.get(`/search`)
      .then(result => {
        console.log(result);
        setDocuments(result.data);
      })
      .catch(err => {
        loadDocuments();
      })
  };


  useEffect(() => {
    loadDocuments();
  }, []);


  useEffect(() => {
    document.body.style.backgroundColor = "rgb(36, 41, 46)";

    return () => {
      document.body.style.backgroundColor = "initial";
    }
  });

  useEffect(() => {
    console.log(documents);
    if(documents.length === 0)
    {
      return;
    }
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
    
  }, [documents]);





  return (
    <div>
      <div className="container" style={{ color: "white", marginTop: 15 }}>
        <strong style={{ marginRight: 14 }}>Views</strong>
        <select
          name={"views"}
          defaultValue={"asc"}
          onChange={(e) => handleChange(e)}
          style={{ background: "none", border: "white", marginRight: 23, color: "white", border: "white solquery 1px", padding: 5, borderRadius: 3 }}
        >
          <optgroup label="Order by views" style={{ background: "black" }}>
            <option value={"asc"}>ascending</option>
            <option value={"desc"}>descending</option>
          </optgroup>
        </select>
        <strong style={{ marginRight: 14 }}>Age</strong>
        <select
          name={"age"}
          defaultValue={"asc"}
          onChange={(e) => handleChange(e)}
          style={{ background: "none", border: "white", marginRight: 23, color: "white", border: "white solquery 1px", padding: 5, borderRadius: 3 }}
        >
          <optgroup label="Order By Age" style={{ background: "black" }}>
            <option value={"asc"}>ascending</option>
            <option value={"desc"}>descending</option>
          </optgroup>
        </select>
        <strong style={{ marginRight: 14 }}>Search</strong>
        <input type="text" placeholder={"query , name , email , etc ..."} style={{
          borderRadius: 5,
          padding: 5,
          paddingLeft: 8,
          wqueryth: 350
        }}
          name={"query"}
          onInput={(e) => {
            handleChange(e);
          }}
          value={state.query}
        />
      </div>

      <div className={"container"} style={{paddingTop : 25}}>
      <div className="Mycontainer">
          {cards}
      </div>
      </div>
    </div>
  );
}


export default Browse;