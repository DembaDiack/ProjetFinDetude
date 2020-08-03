import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch,faBars } from '@fortawesome/free-solid-svg-icons'
import "./Browse.css"
import Axios from "axios"

const Browse = props => {
  const [query, setQuery] = useState("");
  const [filter,setFilter] = useState(false);
  const [rawDocs,setRawDocs] = useState([]);
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    document.body.style.backgroundColor = "rgb(36, 41, 46)";

    return () => {
      document.body.style.backgroundColor = "initial";
    }
  });
  const handleSearch = event => {
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
    console.log(rawDocs);
  },[rawDocs]);


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
      <div style={{backgroundColor : "#777777",width : "100%",minHeight : 50,marginTop : 40,borderRadius : 45}}>
        
      </div>}


      <button type="button" class="btn btn-light mt-5" style={{width : 150,justifySelf : "center"}}>Load More</button>
    </div>
  )
}



export default Browse;