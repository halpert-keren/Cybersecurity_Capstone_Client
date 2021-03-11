import React from 'react';
import {Route} from 'react-router-dom';
import UserRouter from "./UserRouter";
import Login from "../Components/Login";
import Signup from "../Components/signup";
import Dashboard from "../Components/Dashboard";

const ReactRouter = () => {
    return (
        <>
            <Route exact path='/' component={Login}/>
            <Route exact path='/sign-up' component={Signup}/>
            <UserRouter path='/dashboard' component={Dashboard}/>
        </>
    )
}

export default ReactRouter