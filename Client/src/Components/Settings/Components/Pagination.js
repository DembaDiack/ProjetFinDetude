import React, { useState, useEffect,useRef } from "react";
import Auth from "../../../Auth/Auth";
import {Link} from "react-router-dom";


const Pagination = props =>
{
    const [numberOfDocs,setNumberOfDocs] = useState(0);
    const auth = new Auth();
    const [currentPage,setCurrentPage] = useState(0);
    const maxItemsPerPage = 10;
    const [links,setLinks] = useState(null);
    const temp = [];
    let startingPoint = currentPage > 5 ? currentPage - 5 : 1;
    let endingPoint = numberOfDocs - numberOfDocs % props.ITEMSPERPAGE;

    const switchPageTo = number => {
        props.pageNumber.current = number;
        setCurrentPage(number);
    }

    useEffect(()=>{
        auth.getUserDocs(auth.getEmail())
        .then(result => {
            setNumberOfDocs(result.data.length);
            setCurrentPage(1);
        })
        .catch(err => {
            setNumberOfDocs(numberOfDocs - 1);
        })
    },[numberOfDocs]);
    
    console.log("current page : ",currentPage);
    console.log("starting ponts : ",startingPoint);
    console.log("ending",Math.floor(numberOfDocs / props.ITEMSPERPAGE));
    

    useEffect(()=>{
        for(let i = startingPoint; i <= maxItemsPerPage && i<= endingPoint ; i++)
        {
            const link = <Link onClick={()=>switchPageTo(i)} key={i} style={i == currentPage ? {color : "red"} : null}>
                {i}
                </Link>;
            temp.push(link);
        }
        setLinks(temp);
        console.log("temp",temp);
    },[currentPage]);

    return(
        <div>
            {currentPage > 1 ? <Link onClick={()=>setCurrentPage(currentPage - 1)}>Previous</Link> : null}
            <div>
                {links}
            </div>
            <Link onClick={()=>setCurrentPage(currentPage.current + 1)}>Next</Link>
        </div>
    )
}

export default Pagination;