import React, { useState, useEffect } from "react";


const SearchBar = props =>
{
    const initialState = {
        search : "",
        width : 237
    }
    const [state,setState] = useState(initialState);

    const handleChange = event =>
    {
        setState({
            ...state,
            [event.target.name] : event.target.value
        })
    }
    useEffect(()=>{
        if(state.search === "")
        {
            if(props.loading) props.setLoading(false);

            if(state.width !== initialState.width)
            {
                setState({...state,width : initialState.width})
            }
        }
        else{
            if(props.loading === false) props.setLoading(true);
            if(state.width !== 350)
            {
                setState({...state,width : 350});
            }
        }
    },[state.search,initialState.width,state,props]);

    return(
        <div>
            <input
            name="search"
          type="search"
          className="mr-4"
          style={{
            backgroundColor: "#393f45",
            border: "none",
            height: 37,
            width: state.width,
            paddingLeft: 27,
            color : "white",
            transition : "0.3s"
          }}
          placeholder="rechercher des cours"
          value={state.search}
          onChange={(e) => handleChange(e)}
          autoComplete="off"
        />
        </div>
    )
}

export default SearchBar;