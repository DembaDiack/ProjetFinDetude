import React from "react";
import {Route, Redirect} from "react-router-dom";
import Auth from "../Auth/Auth";

const ProtectedRoute = props => {
    const auth = new Auth();
    if(auth.isConnected()){
        return <Route component={props.component} path={props.path}/>
    }
    else{
        return <Redirect to="/login"/>
    }
    
}
export default ProtectedRoute;