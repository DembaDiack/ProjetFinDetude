import React, { useState, useEffect } from "react";
import axios from "axios";
import Alert from "../../Alert/Alert";
import { Link } from "react-router-dom";
import {ReactComponent as Reset} from "../../SVG/reset.svg";

const ResetPassword = () => {
  const initialState = {
    email: ""
  }
  const [state, setState] = useState(initialState);

  const handleSubmit = event => {
    event.preventDefault();
    setState({...state,alertMessage : Alert("sending...","info")});
    axios.post("/reset", state)
      .then(result => {
        console.log(result);
        if(result.data.code === 0)
        {
          setState({...state,alertMessage : Alert(result.data.message,"success")});
        }
        if(result.data.code === -1)
        {
          setState({...state,alertMessage : Alert(result.data.message,"danger")});
        }

        // setState({...state,alertMessage : Alert("link sent","success")});
      })
      .catch(err => {
        setState({...state,alertMessage : Alert("error sending link","danger")});
        console.log(err);
      })

  };
  useEffect(()=>{
    document.body.style.backgroundColor = "#f9f9f9";
    return ()=> {
      document.body.style.backgroundColor = "white";
    }
  },[])

  const handleChange = event => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }
  return (
    <form onSubmit={(e)=> handleSubmit(e)}>
      <div className="container d-sm-flex justify-content-sm-center"><img alt="logo" className="d-sm-flex justify-content-sm-center" style={{ marginTop: 27 }} /></div>
      <p className="d-sm-flex justify-content-sm-center">
      <Reset style={{height: "auto", width: 37,marginRight: 7}}/>
        Reset your password
        </p>
      <div className="container" style={{ width: 313, height: 'auto', borderRadius: 7, border: 'solid rgb(228,228,228) 1px', padding: 30, backgroundColor: '#ffffff', paddingBottom: 21, paddingTop: 21 }}>
        <p style={{ fontSize: 15, color: 'rgb(44,45,45)' }}>Enter your user account's verified email address and we will send you a password reset link, if your email has an account.<br /></p>
        <input type="email" style={{ width: '100%', paddingLeft: 14, borderRadius: 3, border: 'solid rgb(187,187,187) 1px', paddingTop: 5, paddingBottom: 5 }} placeholder="Enter your email adress" name="email" onChange={(e)=>handleChange(e)}/>
        <input className="btn btn-primary shadow-sm" type="submit" style={{ width: '100%', marginTop: 12 }} value="Send recovery link"/>
        {state.alertMessage}
        </div>
      <div className="container d-xl-flex align-items-xl-center" style={{ width: 313, height: 36, borderRadius: 7, border: 'solid rgb(228,228,228) 1px', padding: 30, backgroundColor: '#ffffff', paddingBottom: 21, paddingTop: 21, marginTop: 18 }}>
        <Link to="/" style={{ marginLeft: 0 }}>Link</Link>
      </div>
    </form>

  );
}

export default ResetPassword;