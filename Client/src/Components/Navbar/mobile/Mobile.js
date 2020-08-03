import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTimes } from '@fortawesome/free-solid-svg-icons'
import "./Mobile.css"
import {Link} from "react-router-dom"

const Mobile = (props) => {

    useEffect(()=>{
        window.addEventListener("resize",event => {
            console.log(event);
            if(window.innerWidth > 800)
            {
                props.setMobileState(false);
            }
        })
    },[]);

  return (
    <div
    className="mobile-dropdown"
      style={{
        width: "100%",
        height: props.mobileState ? "100%" : "0%",
        position: "fixed",
        left: 0,
        top: 0,
        backgroundColor: "black",
        zIndex: 1000,
        transition : "0.2s",
        overflow : "hidden"
      }}
    >
      <div style={{ width: "100%", height: "100%", position: "relative" ,display : "grid", padding : "5%",paddingTop : "15%"}}>
        <FontAwesomeIcon
        className="mobileClose"
          icon={faTimes}
          style={{
            position: "absolute",
            left: 30,
            top: 30,
            fontSize: 25,
            cursor : "pointer"
          }}
          onClick={(e)=>props.setMobileState(false)}
        />

        <div className="container" style={{gridTemplateRows : "repeat(10,1fr)",display : "grid" , color : "white",fontSize : 15}}>
            <div style={{borderBottom : "solid grey 1px",height : 30,marginBottom : 8}}>
            <Link to="/" onClick={(e)=>props.setMobileState(false)}>revise</Link>
            </div>
            <div style={{borderBottom : "solid grey 1px",height : 30,marginBottom : 8}}>
            <Link to="/add" onClick={(e)=>props.setMobileState(false)}>add documents</Link>
            </div>
            <div style={{borderBottom : "solid grey 1px",height : 30,marginBottom : 8}}>
            <Link to="/browse" onClick={(e)=>props.setMobileState(false)}>Browse</Link>
            </div>
            <div style={{borderBottom : "solid grey 1px",height : 30,marginBottom : 8}}>
            <Link to="/list" onClick={(e)=>props.setMobileState(false)}>my list</Link>
            </div>
            <div style={{borderBottom : "solid grey 1px",height : 30,marginBottom : 8}}>
            <Link to="/login" onClick={(e)=>props.setMobileState(false)}>Sign in</Link>
            </div>
            <div style={{borderBottom : "solid grey 1px",height : 30,marginBottom : 8}}>
            <Link to="/logout" onClick={(e)=>props.setMobileState(false)}>Sign out</Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Mobile;
