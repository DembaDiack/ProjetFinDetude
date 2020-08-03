import React from "react";
import { Link } from "react-router-dom";

const Card = (props) => {
    return (
        <div>
            <Link to={`/preview/${props.id}`} style={{width : "inherit"}}>
            <div className="card">
                <div className="image" style={{backgroundImage : `url(${props.image})`}}>

                </div>
                <div className="title">
                    {props.title}
                </div>
                <div className="author">
                    Demba Diack
                </div>
                <div className="icons">

                </div>
    </div>
        </Link>
        </div>
    );
};

export default Card;
