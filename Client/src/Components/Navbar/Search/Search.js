import React,{useEffect,useRef,useState} from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faSignInAlt,faTimes } from '@fortawesome/free-solid-svg-icons'
import SearchBar from "./SearchBar";
import Result from "./Result";
import Placeholder from "./SearchPlaceHolder"

const Search = props => {

    const formRef = useRef();
    const modalRef = useRef();
    const [users,setUsers] = useState([]);
    const [usersResult,setUsersResult] = useState([]);
    const [loading,setLoading] = useState(false);

    useEffect(()=>{
        document.addEventListener("click",event => {
            if(event.target === modalRef.current)
            {
                props.handleModal(event);
            }
        })
    })

    useEffect(()=>{
        try{
          if(users)
        {
            const ResultArray = users.map(user => {
                console.log(user)
                return <Result handleModal={props.handleModal} matricule={user.matricule} url={user.avatar} faculty={`${user.faculty}-${user.matricule}`} name={`${user.firstName} ${user.lastName}`} />
            })
            setUsersResult(ResultArray);
        }
        }
        catch(err)
        {

        }
    },[users]);

    return (
      <div className={`search-modal ${props.modal.className}`} style={{ ...props.modal }} ref={modalRef}>
        <div className="form" style={{ padding: 25, gridTemplateRows: "0.5fr 2fr" }} ref={formRef}>
          <FontAwesomeIcon
            icon={faTimes}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              margin: 10,
              cursor: "pointer",
            }}
            onClick={(e) => props.handleModal(e)}
          />
          <SearchBar setUsers={setUsers} setLoading={setLoading}/>
          <div className="results" style={{paddingTop : 15,overflow : "hidden",borderRadius : 15,width : "100%",height : "100%",backgroundColor : "rgb(224, 224, 224)"}}>
              <div style={{marginBottom : 5,paddingLeft : 15,paddingBottom : 15,width : "100%",fontSize : 20,borderBottom : "solid 1px #d2d2d2",height : 30,fontWeight : "bold"}}>
                  Results
              </div>
              {loading ? <Placeholder/>
                 : usersResult}
          </div>
        </div>
      </div>
    );
}

export default Search;