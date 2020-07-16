import React, { useEffect } from "react";
import NavLink from "./NavLink";
import {Link} from "react-router-dom";
import SearchBar from "./SearchBar";
import DropDown from "./DropDown";
import Auth from "../../Auth/Auth";
import {connect} from "react-redux";
import {ReactComponent as Account} from "../../SVG/account.svg";

const Navbar = props =>
{
  
  const auth = new Auth();
  const logout = ()=>
  {
    auth.disconnect();
    props.disconnect();
  }
  

  useEffect(()=>{
    console.log("user props.user from redux : ",props.user);
  },[props.user])

  return (
    <nav className="navbar navbar-light navbar-expand-md" style={{color: "rgb(255,255,255)",backgroundColor: "#24292e",padding: 14}}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" style={{color : "white"}}>
          Revise
        </Link>
        <button data-toggle="collapse" className="navbar-toggler" data-target="#navcol-1">
          <span className="sr-only">Toggle navigation</span>
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navcol-1">
          <ul className="nav navbar-nav">
            {props.connected ? <NavLink name="Add Documents" to="/add" /> : null}
            <NavLink name="Browse" to="/browse" />
          </ul>
          {/* <DropDown title="Dropdown" links={[{to : "/" , name : "link1",section : true},{to : "/" , name : "link2"},{to : "/" , name : "link3"}]}/> */}
        </div>
        <SearchBar setLoading={props.setLoading} loading={props.loading}/>
        {props.connected ? null :<Link className="mr-4" to="/login" style={{ color: "rgb(255,255,255)" }}>
          Log in
        </Link>}
        {props.connected ? <Link className="mr-2" to="/login" style={{ color: "rgb(255,255,255)" }} onClick={(e)=>logout(e)}>
          Log out
        </Link> : null}
        {props.connected ? null :<Link to="/signup"><button className="btn btn-primary" type="button" style={{ backgroundColor: "rgba(0,123,255,0)", border: "white solid 1px"}}>Sign up</button></Link>}
        
        {props.connected ? <DropDown 
        css={{top : "119%",left : "-55px"}} 
        title={props.user ? <img src={props.user.avatar} style={{height: "auto", width: 27,marginRight: 27,fill : "white"}}/> :
        <Account style={{height: "auto", width: 27,marginRight: 27,fill : "white"}}/>
        } 
        links={[
        {to : "/" , name : "link1",section : true},
        {to : "/settings" , name : "settings"},
        {to : "/logout" , name : "logout"}
         ]}
        /> : null}
      </div>
    </nav>
  );
}

const mapStateToProps = state => 
{
  return {
    connected : state.connected,
    user : state.user
  }
}
const mapDispatchToProps = dispatch => 
{
  return{
    connect : () => dispatch({type : "CONNECT"}),
    disconnect : () => dispatch({type : "DISCONNECT"})
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Navbar);

// will add media queries later for mobile friendly view