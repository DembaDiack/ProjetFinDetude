import React, { useEffect } from "react";
import {Link,useHistory} from "react-router-dom";
import {connect} from "react-redux";
import Auth from "../../Auth/Auth";

const Logout = (props)=>
{
  const auth = new Auth();
  const history = useHistory();



  useEffect(()=>{
    auth.disconnect();
    props.disconnect();
    props.setUserInfo(null);
    history.push("/login");
  })
    return(<div>If youre not redirected click <Link to="/login">here</Link></div>)
}



const mapStateToProps = state => 
{
  return {
    connected : state.connected
  }
}
const mapDispatchToProps = dispatch => 
{
  return{
    connect : () => dispatch({type : "CONNECT"}),
    disconnect : () => dispatch({type : "DISCONNECT"}),
    setUserInfo : (user) => dispatch({type : "UPDATE_USER" , user : user})
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Logout);