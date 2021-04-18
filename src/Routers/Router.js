import React from 'react';
import {Route} from 'react-router-dom';
import UserRouter from "./UserRouter";
import Login from "../Components/Login";
import Signup from "../Components/Signup";
import Dashboard from "../Components/Dashboard";
import NewPassword from "../Components/NewPassword";
import ForgotPassword from "../Components/ForgotPassword";
import DBdump from "../Components/DBdump";

const ReactRouter = () => {
    return (
        <>
            <Route exact path='/' component={Login}/>
            <Route path='/sign-up' component={Signup}/>
            <Route path='/forgot-password' component={ForgotPassword}/>
            <Route path='/dbdump' component={DBdump}/>
            <UserRouter path='/dashboard' component={Dashboard}/>
            <UserRouter path='/new-password' component={NewPassword}/>
        </>
    )
}

export default ReactRouter