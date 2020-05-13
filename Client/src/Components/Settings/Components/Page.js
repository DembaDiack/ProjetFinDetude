import React,{useState,useEffect, useRef} from "react";
import Auth from "../../../Auth/Auth";
import { downloadFile, temp_link, deleteFile,editProfilePicture } from "../../../Dropbox/Dropbox";
import Axios from "axios";
import {Link} from "react-router-dom";



const Page = ()=>{
    const style = { backgroundColor: 'rgb(36, 41, 46)', margin: 0, padding: 16, color: 'rgb(255,255,255)', paddingLeft: 50, paddingRight: 50 };
    const [state, setState] = useState(0);
    const [docs, setDocs] = useState("loading...");
    const auth = new Auth();
    useEffect(() => {
        const initial = document.body.style;
        document.body.style.backgroundColor = style.backgroundColor;
        document.body.style.color = style.color;
        document.body.style.padding = style.padding;
        return () => {
            document.body.style = initial;
        }
    })
    const delete_file = id => {
        deleteFile(id)
            .then(result => {
                Axios.get("/docs/delete/id")
                console.log("delete : ", result);
                setDocs("loading...");
            })
            .catch(err => err)
    }
    useEffect(() => {
        if (!state) {
            auth.getUserInfo().then(result => {
                setState(result);
            })
        }

    }, [state])

    useEffect(() => {
        if (docs == "loading...") {
            let temp_docs = [];
            auth.getUserDocs(auth.getEmail()).then(result => {
                if (Array.isArray(result.data)) {
                    temp_docs = result.data.map(elem => {
                        return temp_link(elem.info.id)
                            .then(result => {
                                return <li className="list-inline-item d-md-flex" key={elem._id}>
                                    <div><strong>{elem.info.server_modified}</strong></div>
                                    <div><a href="#" style={{ width: '20%', marginLeft: 12, color: 'rgb(0,178,255)' }}>{elem.info.name}</a></div>
                                    <div><a href={result.link} style={{ width: '20%', marginLeft: 12, color: 'rgb(0,178,255)' }} onClick={() => downloadFile(elem.info.id)}>Download</a></div>
                                    <div><a href="#" style={{ width: '20%', marginLeft: 12, color: 'rgb(0,178,255)' }} onClick={() => delete_file(elem.info.id)}>Delete</a></div>
                                </li>
                            })
                    })
                    Promise.all(temp_docs).then(result => {
                        setDocs(result);
                    })

                }
            });

        }

    }, [docs])

    const [picture,setPicture] = useState(null);

    const inputBtn = useRef();

    const clickBtn = props => {
        inputBtn.current.click();
    }

    const loadPicture = event => {
        console.log(event.target.files);
        if(event.target.files)
        {
            const isImage = event.target.files[0].type.split("/")[0];
            if(isImage === "image")
            {
                setPicture(event.target.files[0]);
            }
            else
            {
                clickBtn();
            }
        }
    }
    useEffect(()=>{
        if(picture)
        {
            const email = auth.getEmail();
            editProfilePicture(picture,email);
            setPicture(null);
        }
    })
    return(
        <form>
            <div>
            <div className="container d-sm-flex justify-content-sm-center align-items-sm-center" style={{ paddingLeft: 0, paddingRight: 0 }}>
                <div className="col"><strong style={{ color: 'rgb(255,255,255)', fontSize: 30 }}>Bienvenue {state.firstName} {state.lastName}</strong></div>
                <div className="col d-sm-flex justify-content-sm-end"><Link to="/settings/profile"><button className="btn btn-primary" type="button">Edit profile</button></Link></div>
            </div>
            <div>
                <div className="container">
                    <hr style={{ backgroundColor: '#393939' }} />
                    <p style={{ fontSize: 22 }}>Info</p>
                </div>
                <div className="container d-sm-flex justify-content-sm-center align-items-sm-center" style={{ paddingLeft: 0, paddingRight: 0 }}>
                    <div className="col">
                        <ul>
                            <li>{state.firstName} {state.lastName}</li>
                            <li>Email : {state.email}</li>
                            <li>Faculty : {state.faculty}</li>
                            <li>Item 4</li>
                        </ul>
                    </div>
                    <div className="col d-sm-flex justify-content-sm-end justify-content-md-center">
                        <img src={state.avatar} style={{width : 120,cursor : "pointer",border : "solid white 4px"}} onClick={()=>clickBtn()}/>
                        <input type="file" hidden={true} ref={inputBtn} onChange={(e)=>loadPicture(e)} multiple={false}/>
                        </div>
                </div>
            </div>
            <div>
                <div className="container">
                    <hr style={{ backgroundColor: '#393939' }} />
                    <p style={{ fontSize: 22 }}>Statistiques</p>
                </div>
                <div className="container d-sm-flex justify-content-sm-center align-items-sm-center" style={{ paddingLeft: 0, paddingRight: 0 }}>
                    <div className="col">
                        <ul>
                            <li>Joined : {state.signUpDate}</li>
                            <li>Item 2</li>
                            <li>Item 3</li>
                            <li>Item 4</li>
                        </ul>
                    </div>
                    <div className="col d-sm-flex justify-content-sm-end justify-content-md-center"><img /></div>
                </div>
            </div>
            <div>
                <div className="container" style={{ padding: 0 }}>
                    <hr style={{ backgroundColor: '#393939' }} />
                    <p style={{ fontSize: 22 }}>Documents de {state.firstName} {state.lastName}</p>
                </div>
                <div className="container d-sm-flex" style={{ paddingLeft: 0, paddingRight: 0 }}>
                    <ul className="list-inline" style={{ width: '100%' }}>
                        {docs.length == 0 ? `${state.firstName} ${state.lastName} didnt upload files yet` : docs}
                    </ul>
                </div>
            </div>
        </div>
        </form>
    )
}

export default Page;