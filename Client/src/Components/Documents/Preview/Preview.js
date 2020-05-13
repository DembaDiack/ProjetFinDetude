import React from "react"
import { useParams } from "react-router-dom";


const Preview = ()=>
{
    const id = useParams().id;

    return(
    <div>
        {id}
    </div>
    )
}

export default Preview;