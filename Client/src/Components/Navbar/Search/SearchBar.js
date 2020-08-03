import React, { useState, useEffect } from "react";
import "./SearchBar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch} from '@fortawesome/free-solid-svg-icons'
import Axios from "axios"

const SearchBar = (props) => {

  const [query,setQuery] = useState("");

  const handleSearch = event => {
    setQuery(event.target.value);
  }


  useEffect(()=>{
    props.setLoading(true);
    Axios.post("/search",{
      query : query
    })
    .then(result => {
      console.log(props);
      props.setUsers(result.data.users);
      props.setLoading(false);
    })
    .catch(err => {
      console.log(err);
    })
  },[query]);

  return (
    <div className="search-bar">
      <div className="search-icon" style={{paddingLeft : 5,paddingRight : 5}}>
          <FontAwesomeIcon icon={faSearch}/>
      </div>
      <div className="input">
        <input type="text" name id placeholder="search here" onChange={(e)=>handleSearch(e)} value={query}/>
      </div>
    </div>
  );
};


export default SearchBar;
