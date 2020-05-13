import React from "react";
import {Link} from "react-router-dom";

const DropDown = props =>
{
    let links;
    if(props.links)
    {
        links = props.links.map(elem => {
            return (
              <span key={Math.random()}>
                <Link
                to={elem.to}
                className="dropdown-item"
                role="presentation"
                style={elem.section ? {fontWeight : "bold"} : null}
              >
                {elem.name}
              </Link>
              {elem.section ? <hr/> : null}
              </span>
            );
        })
    }

    return (
      <div className="dropdown">
        <button
          className="btn btn-primary dropdown-toggle"
          data-toggle="dropdown"
          aria-expanded="false"
          type="button"
          style={{ backgroundColor: "rgba(0,123,255,0)", border: "none" }}
        >
          {props.title}
        </button>
        <div className="dropdown-menu" role="menu" style={props.css ?{...props.css} : {width : "15rem"}}>
          {links}
        </div>
      </div>
    );
}
export default DropDown;