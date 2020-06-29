import React from "react";
import {ReactComponent as Book} from "../SVG/book.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

const Home = ()=>
{
    return(
        <div>
  <div className="container d-sm-flex flex-column justify-content-sm-center align-items-sm-center align-items-xl-center">
    <Book className="d-sm-flex align-items-sm-center" style={{width : 150 , height : 150 , marginTop : 25}}/>
    <p className="text-center" style={{fontSize: 38}}>Revise</p><input type="text" style={{width: '100%', paddingLeft: 13, height: 46, borderRadius: 4, border: 'solid rgb(214,214,214) 1px', outline: 'none', maxWidth: 800, boxShadow: '0px 0px 4px 0px grey'}} placeholder="Search for documents" />
    <strong style={{marginTop: 7, fontSize: 26}}>Look for documents in multiple ways , by</strong>
    <ul className="list-inline" style={{marginBottom: 2}}>
      <li className="list-inline-item"><FontAwesomeIcon icon={faCheckCircle} style={{marginRight : 5 , color : "#007eff"}}/>Email</li>
      <li className="list-inline-item"><FontAwesomeIcon icon={faCheckCircle} style={{marginRight : 5 , color : "#007eff"}}/>Name</li>
      <li className="list-inline-item"><FontAwesomeIcon icon={faCheckCircle} style={{marginRight : 5 , color : "#007eff"}}/>Student</li>
      <li className="list-inline-item"><FontAwesomeIcon icon={faCheckCircle} style={{marginRight : 5 , color : "#007eff"}}/>Class</li>
    </ul>
    <p>Or upload your own files by signing up to our awesome website!</p><button className="btn btn-primary" type="button" style={{width: 280, height: 53}}>Sign Up</button></div>
  <div style={{position: 'fixed', bottom: 0, transform: 'translate(0%,50%)', height: '25%', width: '100%', background: 'rgb(36,41,46)' , zIndex : -100}} />
</div>

    )
}

export default Home;