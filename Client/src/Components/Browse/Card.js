import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faBars, faEye, faBookmark } from '@fortawesome/free-solid-svg-icons'
import Axios from "axios";
import Auth from "../../Auth/Auth";

const Card = (props) => {

    const auth = new Auth();

    const addDocToList = event => {
        Axios.post("/list/add", {
            email: auth.getEmail(),
            id: props.id
        })
            .then(result => {
                console.log("adding result : ", result);
            })
            .catch(err => {
                console.log("adding err :", err);
            })
    }

    return (
        <div>
            <div className="card">

                <Link
                    to={`/preview/${props.id}`} style={{ width: "inherit" }}
                    className="image" style={{ backgroundImage: `url(${props.image})` }}>

                </Link>
                <div className="title">
                    {props.title}
                </div>
                <div className="author">
                    {props.author}
                </div>
                <div className="icons" style={{ paddingLeft: 15, color: "white" }}>
                    <ul style={{ listStyle: "none", display: "inline-flex", columnGap: "15px", justifyItems: "center" }}>
                        <li><FontAwesomeIcon icon={faEye} /> : {props.views}</li>
                        <li><FontAwesomeIcon style={{cursor : "pointer"}} icon={faBookmark} onClick={(e) => addDocToList(e)} /></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Card;
