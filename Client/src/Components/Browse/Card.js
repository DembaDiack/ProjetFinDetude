import React from "react"
import {Link} from "react-router-dom"

const Card = props => {
    return (
        <div className="col-md-3">
            <div className="row">
                <div className="col s12 m7">
                    <div className="card card-scale">
                        <Link to={`/preview/${props.id}`} className="card-image" style={{ width: 252, overflow: "hidden" }}>
                            <img src={props.src} style={{ width: 255 }} />
    <span className="card-title" style={{color : "black"}}>{props.title}</span>
                        </Link>
                        <div className="card-content">
                            <p>Title</p>
                        </div>
                        <div className="card-action">
                            <Link to={`/preview/${props.id}`}>Preview</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Card;