import React from "react"
import "./Result.css"
import {Link} from "react-router-dom";

const Result = props => {
    return(
        <Link className="userResult" to={`/profile/${props.matricule}`} onClick={(e)=>props.handleModal(e)}>
  <div className="leftResult">
    <div className="profile-image" style={{backgroundImage : `url(${props.url})`,backgroundSize : "cover",backgroundPosition : "50% 50%"}}>
    </div>
    <div className="details">
      <ul style={{padding : 0, listStyle : 'none'}}>
    <li>{props.name}</li>
    <li>{props.faculty}</li>
      </ul>
    </div>
  </div>
  <div className="rightResult">
    <button>
      follow
    </button>
  </div>
</Link>

    )
}

export default Result;