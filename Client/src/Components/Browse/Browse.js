import React, { useEffect, useState, useRef } from "react"
import {getThumbnail} from "../../Dropbox/Dropbox";
import Axios from "axios";
import {getThumbnails} from "./getThumbnails";

const Browse = ()=>
{
    const [thumbnails,setThumbnails] = useState([]);
    const pageNumber = useRef(1);
    const ITEMSPERPAGE = 4;
    const indexOfLast = pageNumber.current * ITEMSPERPAGE;
    const indexOfFirst = indexOfLast -ITEMSPERPAGE;

    

    return(
        <div>
            Browse
        </div>
    )
}


export default Browse;