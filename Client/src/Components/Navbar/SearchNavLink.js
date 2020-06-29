import React , {useState} from "react";
import { Link } from "react-router-dom";

const SearchNavLink = (props) => {
  const initialStyle = {
    background : "none",
    cursor : "pointer",
    paddingLeft: 5,
    color : "black",
    marginBottom : 5
  }
  const [hoverStyle,setHoverStyle] = useState(initialStyle);

  const hoverEffect = event => {
    console.log("entered");

    setHoverStyle({
      ...hoverStyle,
      background : "#d4d4ff",
      color : "blue"
    })
  }
  return (
    <li
      style={hoverStyle}
      onMouseEnter={(e) => hoverEffect(e)}
      onMouseLeave={(e) => setHoverStyle(initialStyle)}
    >
      <img src={props.image} style={{ width: 50, height: "auto" }} />
      <Link style={{ color: hoverStyle.color, textDecoration: "none" }}>
        <span><Link to={`/profile/${props.matricule}`}>{props.name}</Link></span>-
        <span><Link to={`/profile/${props.matricule}`}>{props.matricule}</Link></span>
      </Link>
      <hr/>
    </li>
  );
};

export default SearchNavLink;
