import React, { useState } from "react";
import "./bootstrap/css/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import "./Fonts/stylesheet.css";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home";
import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";
import ResetPassword from "./Components/Reset/ResetPassword";
import ResetPasswordToken from "./Components/Reset/ResetPasswordToken";
import Add from "./Components/Documents/Add/Add";
import List from "./Components/Documents/List/list";
import SearchBarLoading from "./Components/Loading/SearchBarLoading";
import "./App.css";
import Auth from "./Auth/Auth";
import {connect} from "react-redux";
import Settings from "./Components/Settings/Settings";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import Logout from "./Components/Login/Logout";
import Preview from "./Components/Documents/Preview/Preview";
import Profile from "./Components/Profile/Profile";

const App = (props) =>
{
    const auth = new Auth();
    
    const initialState = {
        loading : false
    }
    const [state,setState] = useState(initialState);

    const setLoading = value =>
    {
        setState({...state,loading : value});
    }

    
    const fetchUser = () => {if(auth.isConnected() && props.user === null)
    {
      console.log("getting user info");
      auth.getUserInfo().then(result => {
        console.log("getting user info...",result);
        if(result)
        {
          props.setUserInfo(result);
        }
        else{
          fetchUser();
        }
      })
      .catch(err => {
        console.log(err);
      })
    }
  }
  fetchUser();
    return (

        <Router>
            <Navbar setLoading={setLoading} loading={state.loading}/>
            {
            state.loading ? <SearchBarLoading/> : <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/login" component={Login}/>
                <Route path="/signup" component={SignUp}/>
                <Route path="/reset" component={ResetPassword}/>
                <Route path="/reset/:token" component={ResetPasswordToken}/>
                <Route path="/logout" component={Logout}/>
                <Route path="/preview/:id" component={Preview}/>
                <Route path="/profile/:id" component={Profile} />
                <ProtectedRoute path="/add" component={Add} />
                <ProtectedRoute path="/settings" component={Settings}/>
                <Route component={Home}/>
            </Switch>
            }
            
        </Router>
    )
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
    disconnect : () => dispatch({type : "DISCONNECT"}),
    setUserInfo : (user) => dispatch({type : "UPDATE_USER" , user : user})
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
