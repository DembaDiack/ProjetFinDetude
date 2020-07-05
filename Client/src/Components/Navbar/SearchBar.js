import React, { useState, useEffect, useRef } from "react";
import SearchDropdown from "./SearchDropDown";
import Axios from "axios";

const SearchBar = props => {

    const inputRef = useRef();

    const intialState = {
        dropdownHeight: 0,
        dropdownBorder: "none",
        backgroundColor: 'rgb(57,63,69)',
        color: 'white',
        width: 'inherit',
        height: 39,
    }
    const [state, setState] = useState(intialState);
    const [active, setActive] = useState(false);
    const [searchResult,setSearchResult] = useState();

    const search = async query => {
        let result = null;
        try
        {
            result = await Axios.post("/search",{
                query : query
            });
            return result;
        }
        catch(err)
        {
            search(query);
        }
    }

    const handleInput = event => {
        const query = event.target.value;

        if (query === "") {
            setActive(false);
            setState({ ...state, ...intialState });
        }
        else {
            search(query)
            .then(result => {
                console.log(result);
                setSearchResult(result);
            })
            setActive(true);
            setState({ ...state, dropdownHeight: "auto", backgroundColor: "rgb(232, 232, 232)", color: "rgb(57,63,69)", dropdownBorder: "solid 1px #d0d0d0" });
        }
    }
    useEffect(() => {
        const ref = document.querySelector(".search-dropdown");

        const event = event => {
            if ((event.target != ref && event.target != inputRef.current) && active == true) {
                setActive(false);
                setState({ ...state, ...intialState });
            }
        }
        document.body.addEventListener("click", event);

        return () => {
            document.body.removeEventListener("click", event);
        }
    }, [active]);


    return (
        <div style={{ width: active ? 600 : 294, marginRight: 13, transition: "0.1s" }}>
            <input type="text"
                ref={inputRef}
                onInput={(e) => handleInput(e)}
                style={{
                    backgroundColor: state.backgroundColor,
                    paddingLeft: 13,
                    position: 'relative',
                    borderRadius: 3,
                    border: 'none',
                    color: state.color,
                    width: state.width,
                    height: state.height,
                    outline : "none",
                    paddingTop : 0
                }} placeholder="Search here" />
            <SearchDropdown height={state.dropdownHeight} border={state.dropdownBorder} searchResult={searchResult}/>
        </div>
    )
}

export default SearchBar;