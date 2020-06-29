import React from "react";
import {Link} from "react-router-dom";

const NavLink = props =>
{
    return (
      <li className="nav-item" role="presentation" style={{ opacity: 1 }}>
        <Link className="nav-link active" to={props.to} style={{ color: "white" }}>
          {props.name}
        </Link>
      </li>
    );
}

export default NavLink;