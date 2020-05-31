import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import { temp_link } from "../../../Dropbox/Dropbox";

const Preview = () => {
    const [link, setLink] = useState(null);
    const id = useParams().id;
    useEffect(() => {
        console.log(link);
        if (link === null) {
            temp_link(id).then(result => {
                setLink(`https://docs.google.com/gview?url=${result.link}&embedded=true`);
                console.log(result);
            })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [link])
    return (
        <div>
            {link ? <iframe src={link} style={{ width: '90%', height: 1000 }} allow={true} >
                &lt;p&gt;Your browser does not support iframes.&lt;/p&gt;
            </iframe> : null}
        </div>
    )
}

export default Preview;