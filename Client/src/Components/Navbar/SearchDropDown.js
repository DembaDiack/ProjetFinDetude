import React, { useState } from "react";
import "./spinner.css";

const SearchDropdown = props => {
    const initialState = {
        height : 0
    }
    const [state,setState] = useState();
    return (
      <div
      className="search-dropdown"
        style={{
          width: "inherit",
          height: props.height,
          background: "rgb(251, 251, 251) none repeat scroll 0% 0%",
          position: "absolute",
          transition : "0.1s",
          boxShadow : "0px 1px 7px -1px #e1e1e1",
          border : props.border,
          zIndex : 1000,
          top: 51,
          /*zIndex: -1, */ borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
          overflow : "hidden"
        }}
      >
        <div className="loader"/>
      </div>
    );
}

export default SearchDropdown;