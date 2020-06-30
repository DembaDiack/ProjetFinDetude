import React, { useEffect, useState, useRef } from "react"
import Axios from "axios";
import {getThumbnails} from "./getThumbnails";
import "../Style/global.css";

const Browse = ()=>
{
    const [documents,setDocuments] = useState([]);
    const [cards,setCards] = useState([]);
    const initialState = {
        age : "asc",
        views : "asc",
        query : ""
    }
    const [state,setState] = useState(initialState);

    const handleChange = event => {
        setState({
            ...state,
            [event.target.name] : event.target.value
        });
    }

    const loadDocuments = ()=> {
        Axios.get(`/search?age=${state.age}&views=${state.views}&q=${state.query}`)
        .then(result => {
            console.log(result);
            setDocuments(result);
        })
        .catch(err => {
            loadDocuments();
        })
    };


    useEffect(()=>{
        loadDocuments();
    },[state]);

    useEffect(()=>{
        document.body.style.backgroundColor = "rgb(36, 41, 46)";

        return ()=>{
            document.body.style.backgroundColor = "initial";
        }
    },[]);

    useEffect(()=>{
        getThumbnails(documents.data)
        .then(result => {
            console.log(result);
            setCards(result);
        })
    },[documents]);


    

    return (
      <div>
        <div className="container" style={{color : "white" , marginTop : 15}}>
          <strong style={{ marginRight: 14 }}>Views</strong>
          <select
          name={"views"}
          defaultValue={"asc"}
          onChange={(e)=>handleChange(e)}
            style={{ background: "none", border: "white", marginRight: 23 , color : "white" , border : "white solquery 1px" , padding : 5 , borderRadius : 3}}
          >
            <optgroup label="Order by views" style={{background : "black"}}>
              <option value={"asc"}>ascending</option>
              <option value={"desc"}>descending</option>
            </optgroup>
          </select>
          <strong style={{ marginRight: 14 }}>Age</strong>
          <select
          name={"age"}
          defaultValue={"asc"}
          onChange={(e)=>handleChange(e)}
            style={{ background: "none", border: "white", marginRight: 23 , color : "white" , border : "white solquery 1px" , padding : 5 , borderRadius : 3}}
          >
            <optgroup label="Order By Age" style={{background : "black"}}>
              <option value={"asc"}>ascending</option>
              <option value={"desc"}>descending</option>
            </optgroup>
          </select>
          <strong style={{ marginRight: 14 }}>Search</strong>
          <input type="text" placeholder={"query , name , email , etc ..."} style={{
              borderRadius : 5,
              padding : 5,
              paddingLeft : 8,
              wqueryth : 350
          }}
          name={"query"}
          onInput={(e)=>handleChange(e)}
          />
        </div>
            <div className="container mt-5">
                <div className="row">
                    {cards}
                </div>
            </div>


      </div>
    );
}


export default Browse;