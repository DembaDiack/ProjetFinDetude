import React from "react";
import { Link } from "react-router-dom";

const Card = (props) => {
    return (
        <div className="supra-container">
            <div className="card-container">
                <div className="card">
                    <div className="image" style={{
                        backgroundImage: `url(${props.src})`, height: 332, zIndex: 1,
                        height: 330,
                        width: "100%",
                        backgroundSize: "cover",
                        backgroundPositionX: "20%"
                    }}></div>
                    <Link to={`/preview/${props.id}`}>
                    <div className="content" style={{ textAlign: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                        <h2>this is some text</h2>
                        <Link to={`/preview/${props.id}`}><button className="button">view</button></Link>
                    </div>
                    </Link>
                </div>
            </div>
            <div className="caption" style={{ marginLeft: 5, fontWeight: "bold" }}>
                {props.title}
            </div>
            <div className="year" style={{ marginLeft: 5, fontSize: 15, color: "whitesmoke", opacity: 0.7 }}>
                2020
      </div>
        </div>
    );
};

export default Card;
