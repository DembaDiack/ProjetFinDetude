import React,{useState, useEffect} from "react";
import axios from "axios";
import Alert from "../../Alert/Alert";
import {ReactComponent as Account} from "../../SVG/account.svg";
const SignUp = ()=>
{
    const initialState = {
        email : "",
        password : "",
        firstName : "",
        lastName : "",
        user_type : "student",
        passwordverif : "",
        faculty : "DI",
        matricule : 0
    }
    const [state,setState] = useState(initialState);
    /*
    code 0 : login succesfull,
    code -1 : user already exists
    */
  const handleSubmit = event => {
      event.preventDefault();
      console.log(state);
      if(state.firstName === "" || state.lastName === "")
      {
        setState({...state,alertMessage : Alert("check empty fields please","warning")});
        return;
      }
      if(state.password.length < 6)
      {
        document.querySelector(".password").scrollIntoView({ behavior: 'smooth', block: 'center' });
        setState({...state,alertMessage : Alert("password must contain 6 characters at least","warning")});
        return;
      }
      if(state.password !== state.passwordverif)
      {
        document.querySelector(".password").scrollIntoView({ behavior: 'smooth', block: 'center' });
        setState({...state,alertMessage : Alert("passwords dont match","warning")});
        return;
      }
      axios.post("/signup",state)
      .then(result => {
        console.log(result.data);
        if(result.data.code === 0 )
        {
          setState({...state,alertMessage : Alert(result.data.message,"success")});
        }
        else
        {
          setState({...state,alertMessage : Alert(result.data.message,"danger")});
        }
      })
      .catch(err => {
          console.log(err);
      })

  };
  const handleChange = event => {
    setState({
      ...state,
      [event.target.name] : event.target.value
    })
  }
  useEffect(()=>{
    document.querySelector(".sign-up-btn").scrollIntoView({ behavior: 'smooth', block: 'center' });
  })
  return (
      <div>
              <div>
        <p className="text-center" style={{margin: 32}}>Join us</p>
        <h1 className="text-center"><Account style={{height: "auto", width: 40,marginRight: 7,}}/> <br/>Create your account </h1>
        <div className="container" style={{/*border: "solid 1px gainsboro" , */padding: "2rem", borderRadius : "13px", margintop: "52px",width:604}}>
          <form onSubmit={(event) => handleSubmit(event)}>
          {state.alertMessage} 
          <p style={{fontSize: 13}}>First Name *<input className="form-control" type="text" name="firstName" style={{backgroundColor: 'rgb(248,248,248)'}} onChange={(e)=>handleChange(e)} value={state.firstName}/></p>
          <p style={{fontSize: 13}}>Last Name *<input className="form-control" type="text" name="lastName" style={{backgroundColor: 'rgb(248,248,248)'}} onChange={(e)=>handleChange(e)} value={state.lastName}/></p>
          <p style={{fontSize: 13}}>Matricule *<input className="form-control" type="text" name="matricule" style={{backgroundColor: 'rgb(248,248,248)'}} onChange={(e)=>handleChange(e)} value={state.matricule}/></p>
            <p style={{fontSize: 13}}>Email *<input className="form-control" type="email" name="email" style={{backgroundColor: 'rgb(248,248,248)'}} onChange={(e)=>handleChange(e)} value={state.email}/></p>
            <p style={{fontSize: 13}}>Password *<br /><input className="form-control password" type="password" name="password" style={{backgroundColor: 'rgb(248,248,248)'}} onChange={(e)=>handleChange(e)} value={state.password}/></p>
            <p style={{fontSize: 13}}>Verify Password *<br /><input className="form-control" type="password" name="passwordverif" style={{backgroundColor: 'rgb(248,248,248)'}} onChange={(e)=>handleChange(e)}  value={state.passwordverif}/></p>
            <p style={{fontSize: 13}} >Account type<br/> <select className="form-control" name="user_type" onChange={(e)=>handleChange(e)} >
            <optgroup label="Choose te type of the account">
            <option value="student" defaultValue>student</option>
            <option value="teacher">teacher</option>
            </optgroup>
          </select></p>
            <p style={{fontSize: 13}} >Faculty<br/> <select className="form-control" name="faculty" onChange={(e)=>handleChange(e)} >
            <optgroup label="Choose the faculty you belong to">
            <option value="DI" defaultValue>DI</option>
            <option value="BA">BA</option>
            <option value="FC">FC</option>
            <option value="GRH">GRH</option>
            <option value="IG">IG</option>
            <option value="RT">RT</option>
            <option value="SAE">SAE</option>
            <option value="TCM">TCM</option>
            </optgroup>
          </select></p>
          <p style={{fontSize: 10}}>By creating an account, you agree to the Terms of Service. For more information about GitHub's privacy practices.</p>
          

            <input className="btn btn-primary sign-up-btn" 
            type="submit" 
            style={{width: '100%', height: 67,cursor : "pointer",background : "none",color : "#0062cc"}}
             value="Sign up"/>
            </form>
        </div>
      </div>
      </div>
  );
}

export default SignUp;