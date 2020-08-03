import React, { useEffect, useState } from "react";
import Auth from "../../Auth/Auth";
import { connect } from "react-redux";
import "./Navbar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faSignInAlt,faTimes,faBell, faBars } from '@fortawesome/free-solid-svg-icons'
import { Link, useLocation } from "react-router-dom";
import Search from "./Search/Search";
import Mobile from "./mobile/Mobile";

const Navbar = props => {

  const location = useLocation();

  const [mobileState,setMobileState] = useState(false);

  useEffect(()=>{
    const backevent = document.addEventListener("backbutton",event => {
      console.log(event);
      if(mobileState)
      {
        setMobileState(false);
        event.preventDefault();
      }
    },false);
    if(mobileState)
    {
      document.body.style.overflow = "hidden";

    }
    else{
      document.body.style.overflow = "initial";
    }

    return ()=>{
      document.removeEventListener("backbutton",backevent);
      
    }
  },[mobileState])

  const [modal, setModal] = useState({
    className: "default"
  })

  const initialNav = {
    position: "initial"
  }
  const stickyNav = {
    position: "fixed",
    top: 0,
    width: "100%"
  }
  const [navStyle, setNavStyle] = useState(initialNav);
  const auth = new Auth();
  const logout = () => {
    auth.disconnect();
    props.disconnect();
  }
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (props.user) {
      setAvatar(props.user.avatar);
    }
  }, [props.user])


  useEffect(() => {
    console.log("user props.user from redux : ", props.user);
  }, [props.user])

  useEffect(() => {
    document.addEventListener("scroll", (event) => {
      console.log(window.scrollY);
      if (window.scrollY !== 0) {
        setNavStyle(stickyNav)
      }
      else {
        setNavStyle(initialNav)
      }
    })
  }, []);

  const handleModal = event => {
    if (modal.className === "swing-in-top-fwd") {
      setModal({
        ...modal,
        className : "default"
      })
      document.body.style.overflowY = "initial";
    }
    else{
      setModal({
        ...modal,
        className : "swing-in-top-fwd"
      })
      document.body.style.overflowY = "hidden";
    }
  }


  
  return (
    <div>
      <nav style={{ alignItems: "center", ...navStyle }}>
        <div className="left">
          <ul className="desktop" style={{ padding: 0, margin: 0 }}>
            <li style={{ marginLeft: 25 }}><Link to="/">revise</Link></li>
            <li><Link to="/add">add documents</Link></li>
            <li><Link to="/browse">Browse</Link></li>
            <li><Link to="/list">my list</Link></li>
          </ul>
          <ul className="mobile">
          <li><FontAwesomeIcon icon={faBars} style={{marginLeft : 30}} onClick={(e)=>setMobileState(true)}/></li>
          </ul>
        </div>
        <div className="right" style={{ justifySelf: "end", paddingRight: 55 }}>
          <ul style={{ padding: 0, margin: 0 }}>
            <li style={{ lineHeight: 3 }}><FontAwesomeIcon icon={faSearch} onClick={(e) => handleModal(e)} /></li>
            <li style={{ lineHeight: 3 }}><FontAwesomeIcon icon={faBell} onClick={(e) => handleModal(e)} /></li>
            <li className="profile" style={{ lineHeight: 3 }}>
              {props.user ? <div style={{
                height: 40, width: 40, background: "white", marginTop: 5, borderRadius: "50%",
                backgroundImage: `url(${avatar})`,margin : 5,backgroundSize : "cover",backgroundPosition : "50% 50%"
              }}>
              </div> : "profile"}
              <div className="profile-dropdown-container">
                <div className="profile-dropdown-content">
                </div>
              </div>
            </li>
            {auth.isConnected() ? <li className="authButtons" style={{ lineHeight: 3 }}><Link to="/logout">sign out</Link></li> : <li className="authButtons" style={{ lineHeight: 3 }}><Link to="/login">sign in</Link></li>}
            {auth.isConnected() ? null : <li className="authButtons" style={{ lineHeight: 3 }}><Link to="/signup"><button type="button" className="btn btn-light">
              Sign up</button></Link></li>}
          </ul>
        </div>
      </nav>
      <Search modal={modal} handleModal={handleModal}/>

      <Mobile mobileState={mobileState} setMobileState={setMobileState}/>
    </div>


  );
}

const mapStateToProps = state => {
  return {
    connected: state.connected,
    user: state.user
  }
}
const mapDispatchToProps = dispatch => {
  return {
    connect: () => dispatch({ type: "CONNECT" }),
    disconnect: () => dispatch({ type: "DISCONNECT" })
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

// will add media queries later for mobile friendly view