import React, { useEffect, useState, useRef } from "react";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch,faBars } from '@fortawesome/free-solid-svg-icons'
import "./Browse.css"
import Axios from "axios"
import Card from "./Card";
import nopreview from "./nopreview.png"
import {getThumbnail} from "../../Dropbox/Dropbox";

const Browse = props => {
  const [query, setQuery] = useState("");
  const [filter,setFilter] = useState(false);
  const [rawDocs,setRawDocs] = useState([]);
  const [loading,setLoading] = useState(true);
  const [cards,setCards] = useState([]);
  const index = useRef(0);

  useEffect(() => {
    document.body.style.backgroundColor = "rgb(36, 41, 46)";

    return () => {
      document.body.style.backgroundColor = "initial";
    }
  });
  const handleSearch = event => {
    setCards([]);
    setRawDocs([]);
    setLoading(true);
    setQuery(event.target.value);
  }

  const loadDocuments = () => {
    Axios.get(`/search?q=${query}`)
      .then(result => {
        setRawDocs(result.data);
        setLoading(false);
      })
      .catch(err => {
        loadDocuments();
      })
  };
  
  useEffect(() => {
    loadDocuments();
  }, [query]);

  useEffect(()=>{
    const temp = rawDocs.map(doc => {
      return getThumbnail(doc.info.path_display)
    .then(result => {
      console.log(doc.info);
      const url = URL.createObjectURL(result.fileBlob);
      return <Card email={doc.userInfo.email} views={doc.info.views} author={`${doc.userInfo.firstName} ${doc.userInfo.lastName} - ${doc.userInfo.matricule}`} image={url} key={result.rev} id={result.id} title={result.name} />
    })
    .catch(err => {
      try
      {
        const parsed = JSON.parse(err.error);
        console.log(parsed);
        if(parsed.error_summary === "unsupported_extension/.." || parsed.error_summary === "unsupported_extension/..." || parsed.error_summary === "unsupported_extension/." || parsed.error_summary === "unsupported_extension/")
        {
          return <Card email={doc.userInfo.email} views={doc.info.views} author={`${doc.userInfo.firstName} ${doc.userInfo.lastName}`} src={nopreview} key={doc.info.rev} id={doc.info.id} title={doc.info.name} />
        }
      }
      catch(err)
      {
        return err;
      }
    })
    });

    Promise.all(temp)
    .then(result => {
      setCards(result);
      const temp = cards;
      const newCards = temp.concat(result);
      console.log("newCards",newCards);
      setCards(newCards);
    })
  },[rawDocs]);



  const handleLoadmore = event => {
    Axios.get(`/search?index=${cards.length}&q=${query}`)
      .then(result => {
        console.log("loadMore : ",result);
        setRawDocs(result.data);
      })
      .catch(err => {
        loadDocuments();
      })
    
  }
  return (
    <div className={"container"} style={{display : "grid"}}>
      <div className="search-bar-browse">
        <div className="search-icon-browse" style={{ paddingLeft: 5, paddingRight: 5 }}>
          <FontAwesomeIcon icon={faSearch} style={{ color: "black" }} />
        </div>
        <div className="input">
          <input type="text" name id placeholder="search here" onChange={(e) => handleSearch(e)} value={query} />
        </div>
      </div>
      <div className="filter" style={{overflow : "hidden",backgroundColor : "#777777",transition : "0.1s",cursor : "pointer",padding : 16,paddingLeft : 15,width : filter ? "100%" : "50px",height : "auto",backgroundColor : "grey",marginTop : 30,borderRadius : 45,display : "inline-flex"}}>
        <div style={{marginRight : 50,marginTop : 9}}>
          <FontAwesomeIcon icon={faBars} onClick={(e)=>setFilter(!filter)} style={{fontSize : 19}}/>
        </div>
        <div style={{display : "inline-flex"}}>
          <div>
        <select className="form-control" name="faculty" style={{backgroundColor : "#b1b1b1",border : "none"}}>
          <optgroup label="Chose ascending or descending order">
            <option value="ASC" defaultValue>ASC</option>
            <option value="DSC">DSC</option>
          </optgroup>
        </select>
          </div>
          <div style={{marginLeft : 15}}>
        <select className="form-control" name="faculty" style={{backgroundColor : "#b1b1b1",border : "none"}}>
          <optgroup label="Chose ascending or descending order">
            <option value="ASC" defaultValue>ASC</option>
            <option value="DSC">DSC</option>
          </optgroup>
        </select>
          </div>
        </div>
      </div>
      {loading ? 
      <div style={{marginTop : 50}}>
        <SkeletonTheme>
        <Skeleton/>
        <Skeleton/>
        <Skeleton height={"300px"}/>
      </SkeletonTheme>
        </div>
       : 
      <div className="browse" style={{overflow : "hidden",backgroundColor : "#292e33",padding : 50,width : "100%",minHeight : 50,marginTop : 40,borderRadius : 45}}>
      {cards}
      </div>}


      <button onClick={(e)=>handleLoadmore(e)} type="button" class="btn btn-light mt-5 mb-5" style={{width : 150,justifySelf : "center"}}>Load More</button>
    </div>
  )
}



export default Browse;