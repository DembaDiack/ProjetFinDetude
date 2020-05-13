import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { useEffect } from "react";

const ResetPasswordToken = props =>
{
    const token = useParams().token;
    const initialState = {loading : true,email : "",password : "",token : false,passwordverif : ""}
    const [state,setState] = useState(initialState);

    useEffect(()=>{
        Axios.get(`/reset/find/${token}`)
    .then(result => {
        console.log(result);
        if(result.data.code === 0 )
        {
            setState({...state,loading : false,token : true,email : result.data.email});
        }
        else{
            setState({...state,loading : false,token : false});
        }
    })
    .catch(err => {
        console.log(err);
    })
    },[state,token])
    
    const handleChange = event => {
        setState({
          ...state,
          [event.target.name] : event.target.value
        })
      }
    const handleSubmit = event =>
    {
        event.preventDefault();
        if(state.password === state.passwordverif)
        {
            Axios.post(`http://localhost:2000/reset/${token}`,{
                email : state.email,
                password : state.password
            })
            .then(result =>{
                console.log(result);
            })
        }
        else{
            window.alert("passwords dont match");
        }
    }

    const showForm = ()=>
    {
        const Form = <form onSubmit={(e)=>handleSubmit(e)}><h1>Reset your password for {state.email}</h1><input type="password" name="password" id="password" placeholder="new password" onChange={(e)=>handleChange(e)} /><input type="password" name="passwordverif" id="passwordverif" placeholder="verify password" onChange={(e)=>handleChange(e)} /><input type="submit" value=""/></form>
        if(state.token)
        {
            return Form;
        }
        else{
            return "token not found"
        }
    }



    return(
        <div>
            {state.loading ? "loading..." : showForm()}
        </div>
    )
}

export default ResetPasswordToken;