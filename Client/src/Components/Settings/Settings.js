import React, { useEffect, useState } from "react"
import Page from "./Components/Page";
import Profile from "./Components/Profile";
import {Route} from 'react-router-dom';
const Settings = props => {
    
    return (
        <div>
            <Route exact path="/settings/profile" component={Profile}/>
        <Route exact path="/settings" component={Page}/>
        </div>
    )
}


export default Settings;