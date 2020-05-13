import React,{useState,useEffect} from "react";
import axios from "axios";
import Auth from "../../Auth/Auth";
import {Link,withRouter, useHistory} from "react-router-dom";
import {connect} from "react-redux";
import Alert from "../../Alert/Alert";
import {ReactComponent as Google} from "../../SVG/google.svg";
import {ReactComponent as CapsLock} from "../../SVG/lock.svg";
const Login = props => {
  const auth = new Auth();
  const history = useHistory();

    const initialState = {
        email : "",
        password : "",
        alertMessage : null
    }
    const [state,setState] = useState(initialState);
/* login on server side requires json like 
{
  email : email@email.com,
  password : password
} 
if login is succesfull you get code 0 , 1 if password is incorrect, -1 if user doest exist
you can implement an alerting system for those three cases if you want
*/
  const handleSubmit = event => {
      event.preventDefault();

      if(auth.isConnected())
      {
        setState({...state,alertMessage : Alert(`you are already logged in as  ${auth.getEmail()} logout first please`,"warning")});
        return;
      }
      const {alertMessage,...postData} = state;
      axios.post("/login",postData)
      .then(result => {
        console.log(result.data);
          if(result.data.code === 0)
          {
            auth.connect(state.email);
            props.connect();
            auth.getUserInfo().then(result => {
              props.setUserInfo(result);
            })
            setState({...state,alertMessage : Alert(result.data.message,"success")});
            setTimeout(()=>{
              history.push("/");
            },300)
          }
          else
          {
            setState({...state,alertMessage : Alert(result.data.message,"danger")});
          }
      })
      .catch(err => {
        setState({...state,alertMessage : Alert("une erreur est survenu","danger")});
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
      [event.target.name] : event.target.value
    })
  }
  return (
    <div>
  <div className="container d-xl-flex justify-content-xl-center" style={{marginTop: 70}}><img className="d-xl-flex" alt=""/></div>
  <p className="text-center"><CapsLock style={{height: "auto", width: 27,marginRight: 7,}} /> Sign in to your account</p>
  <div className="container" style={{width: 329, backgroundColor: '#ffffff', padding: 25, border: 'solid rgb(207,207,207) 1px', borderRadius: 5}}>
    <form onSubmit={(e)=> handleSubmit(e)}>
      <p style={{fontSize: 13}}><strong>Email</strong><input className="form-control" type="email" name="email" onChange={(e)=>handleChange(e)} placeholder="email"  value={state.email}/></p>
      <p style={{fontSize: 13}}><strong>password</strong><input className="form-control" type="password" name="password" onChange={(e)=>handleChange(e)} placeholder="password" value={state.password}/></p>
      <input value="Sign in" className="btn btn-primary" style={{width: '100%', height: 35, marginBottom: 8}} type="submit"/>
    </form><Link to="/reset" style={{marginTop: 10}}>Forgot password ?</Link>
    <hr />
    <button className="btn btn-primary" type="button" style={{width: '100%', backgroundColor: 'rgb(255,255,255)', color: 'rgb(54,81,135)'}}>
    <Google style={{height: "auto", width: 21,marginRight: 7,}}/> Sign in with Google 
      </button>
      {state.alertMessage}
      </div>
  <div className="container" style={{width: 329, backgroundColor: '#ffffff', padding: 25, border: 'solid rgb(207,207,207) 1px', borderRadius: 5, marginTop: 31, height: 72}}>
    <form>
      <p style={{fontSize: 13}}><strong>New around here ?&nbsp;</strong><Link to="/signup">Create an account here</Link></p>
    </form>
  </div>
</div>

  );
};


const mapDispatchToProps = dispatch => 
{
  return{
    connect : () => dispatch({type : "CONNECT"}),
    disconnect : () => dispatch({type : "DISCONNECT"}),
    setUserInfo : (user) => dispatch({type : "UPDATE_USER" , user : user})
  }
}

export default connect(null,mapDispatchToProps)(withRouter(Login));