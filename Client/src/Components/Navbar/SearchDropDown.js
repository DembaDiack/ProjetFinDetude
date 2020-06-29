import React, { useState, useEffect } from "react";
import "./spinner.css";
import {Link} from "react-router-dom";
import SearchNavLink from "./SearchNavLink";

const SearchDropdown = props => {

  const [userState,setUserState] = useState([]);
  const [docState,setDocState] = useState([]);

  let users = [];
  let documents = [];

  const initialState = {
    height: 0
  }
  const [state, setState] = useState();

  useEffect(()=>{
    try{
      if(props.searchResult)
    {
      if(props.searchResult.data !== undefined)
      {
        if(props.searchResult.data.users !== [])
        {
          users = props.searchResult.data.users.map((user)=>{
            return <SearchNavLink image={user.avatar} name={`${user.firstName} ${user.lastName}`} matricule={user.matricule} key={user.matricule} style={{marginBottom : 8}}/>
          })
          setUserState(users);
        }
        if(props.searchResult.data.documents !== [])
        {
          documents = props.searchResult.data.Documents.map((doc)=>{
            return <SearchNavLink name={`${doc.name} - ${doc.faculty} - ${doc.userInfo.firstName} ${doc.userInfo.firstName}`}/>
          })
          setDocState(documents)
        }
      }
    }
    }
    catch(err)
    {
      console.log(err);
    }
    console.log("users",users);
  },[props.searchResult]);

  return (
    <div
      className="search-dropdown"
      style={{
        width: "inherit",
        height: props.height,
        background: "rgb(251, 251, 251) none repeat scroll 0% 0%",
        position: "absolute",
        transition: "0.1s",
        boxShadow: "0px 1px 7px -1px #e1e1e1",
        border: props.border,
        zIndex: 1000,
        top: 51,
          /*zIndex: -1, */ borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        overflow: "hidden",
        padding : props.height === "auto" ? 10 : 0
      }}
    >
      <div className="container" style={{display : "initial" , padding : 5}}>
        <p style={{ color: 'rgb(49,49,50)' }}>Users </p>
        <hr/>
        <div style={{ height: "auto" }}>
          <ul style={{ listStyle: 'none' , color : "black" , padding : 0, paddingLeft : 10,paddingRight : 10}}>
            {userState}
          </ul>
        </div>
      </div>

    </div>
  );
}

export default SearchDropdown;