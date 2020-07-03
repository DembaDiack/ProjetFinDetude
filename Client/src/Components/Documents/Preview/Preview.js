import React, { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom";
import { temp_link } from "../../../Dropbox/Dropbox";
import Axios from "axios";
import { ReactComponent as Download } from "../../../SVG/download.svg"

const Preview = () => {
    const [link, setLink] = useState(undefined);
    const id = useParams().id;
    const [docInfo, setDocInfo] = useState(undefined);
    const [downloadLink, setDownloadLink] = useState("");
    const [tags, setTags] = useState([]);
    const [tagsList, setTagsList] = useState([]);
    const [originalLink,setOriginalLink] = useState("");
    const [error,setError] = useState(false);

    useEffect(() => {
        Axios.post("/docs/views", {
            id: id
        })
    }, [id]);

    useEffect(() => {
        document.body.style.backgroundColor = "rgb(36, 41, 46)";

        return () => {
            document.body.style.backgroundColor = "initial";
        }
    }, [])
    useEffect(() => {
        console.log(link);
        if (link === undefined) {
            temp_link(id).then(result => {
                setLink(`https://docs.google.com/gview?url=${result.link}&embedded=true&key=AIzaSyCOkX_9VDYvxptYipFquAzPtNOuExvDmEk`);
                setOriginalLink(result.link);
                console.log(result);
            })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [link])

    useEffect(() => {
        Axios.post("/docs/info/", {
            id: id
        })
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    useEffect(() => {
        Axios.post("/docs/info", {
            id: id
        })
            .then(result => {
                console.log(result);
                setDocInfo(result.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    useEffect(() => {
        if (docInfo) {
            setTags(docInfo.info.tags);
            temp_link(docInfo.info.id)
                .then(result => {
                    console.log("linkkkkk", result);
                    setDownloadLink(result.link);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }, [docInfo]);

    useEffect(() => {
        try {
            let temp = [];
            console.log("tagsssss", tags);
            temp = tags.map((tag) => {
                return <li><Link to={`/Browse?category=${tag}`}>{tag}</Link>,</li>
            });
            setTagsList(temp);
        }
        catch (err) {
            console.log(err);
        }
    }, [tags]);

    const handleImageDisplay = event => {
        console.log("displayed");
    }
    const handleImageError = event => {
        console.log("display error");
        setError(true);
    }

    
    return (

        <div style={{ color: "white" }}>
            <div className="container" style={{ position: "relative" }}>
                <p style={{ fontSize: 25 }}>{docInfo ? docInfo.info.name : "File Title"}</p>
                <ul className="list-inline text-left">
                    <li className="list-inline-item">Uploaded by  : {docInfo ? <Link to={`/profile/${docInfo.userInfo.matricule}`}>{`${docInfo.userInfo.firstName} ${docInfo.userInfo.lastName}`}</Link> : "File Title"} </li>
                    {tagsList}
                </ul>
                <a href={downloadLink}><Download className="btn btn-primary" type="button" style={{ width: 50, height: 50, marginBottom: 10 }} /></a>
            </div>
            <div className="container d-sm-flex justify-content-sm-center">
                <div style={{ width: "100%" }}>
                    {
                        originalLink ? <img src={originalLink} onLoad={(e)=>handleImageDisplay(e)} onError={(e)=>handleImageError(e)} style={{
                            display : error ? "none" : "block",
                            height : "auto",
                            width : "inherit"
                        }}/>
                        : null
                    }

                    {error && link ? <iframe src={link} style={{ width: '100%', height: 1000 }} allow="true" >
                        &lt;p&gt;Your browser does not support iframes.&lt;/p&gt;
            </iframe> : null }
                    
                </div>
            </div>
        </div>


    )
}

export default Preview;