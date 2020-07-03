import React from "react"
import {getThumbnail , downloadFile} from "../../Dropbox/Dropbox";
import Card from "./Card"

const getThumbnails = async (docs = []) =>{
    const thumbnails = [];
    const cards = [];

    docs.forEach(elem => {
        thumbnails.push(getThumbnail(elem.info.path_display));
    });
    return Promise.all(thumbnails)
    .then(result => {
        console.log(result);
        result.forEach(elem => {
            if(!elem.error)
            {
                const url = URL.createObjectURL(elem.fileBlob);
                cards.push(<Card src={url} key={elem.id} id={elem.id} title={elem.name} />)
            }
        })
        return cards;
        console.log(cards);
    })
    .catch(err => {
        console.log(err);
    })
}


export 
{
    getThumbnails
}