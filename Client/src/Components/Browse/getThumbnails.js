import Axios from "axios"
import {getThumbnail} from "../../Dropbox/Dropbox";

const getThumbnails = async (indexOfFirst,indexOfLast)=>{
    const files = await Axios.get("/all");
    const slicedFiles = files.data.slice(indexOfFirst,indexOfLast); 
    const thumbnailLinks = await slicedFiles.map(async (file) => {
        try
        {
            const url = await getThumbnail(file.info.path_display);
            return url;
        }
        catch(err)
        {
            console.log(err);
            return err;
        }
    });
    console.log("thumbnail links : ",thumbnailLinks);
}


export 
{
    getThumbnails
}