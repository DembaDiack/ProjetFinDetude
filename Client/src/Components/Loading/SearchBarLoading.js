import React, { useState, useEffect } from "react";


const SearchBarLoading = props =>
{
    const initialState = {
        width: "100%",
        background: "#efefef",
        opacity: 1,
        borderRadius: 11,
        transition : "0.4s"
    }
    const [state,setState] = useState(initialState);

    useEffect(()=>{
        const searchInterval = setInterval(()=>{
            if(state.opacity === 1)
        {
            setState({...state,opacity : 0.7});
        }
        else{
            setState(initialState);
        }
        },500)

        return ()=> {
            clearInterval(searchInterval); //clear interval when component is unmounting
        }
    },[state,initialState])
    return(
    <div className="container mt-4">
        <div style={{height : 50,...state}} className="mt-2"></div>
        <div style={{height : 250,...state}} className="mt-2"></div>
        <div style={{height : 50,...state}} className="mt-2"></div>
        <div style={{height : 250,...state}} className="mt-2"></div>
    </div>
    )
}


export default SearchBarLoading;