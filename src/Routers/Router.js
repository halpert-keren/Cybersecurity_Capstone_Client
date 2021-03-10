import React from 'react';
import {Route} from 'react-router-dom';
import UserRouter from "./UserRouter";
import Login from "../Components/Login";

const ReactRouter = () => {
    return (
        <>
            <Route exact path='/' component={Login}/>
            <UserRouter path='/home' component={Login}/>
        </>
    )
}

export default ReactRouter