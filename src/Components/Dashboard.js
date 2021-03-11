import React, {useState} from 'react';
import '../index.css'
import {useCookies} from "react-cookie";
import {Button, TextField} from "@material-ui/core";
import {useHistory} from "react-router-dom";

const Dashboard = (props) => {
    let history = useHistory();
    const [cookies, setCookie] = useCookies(['user']);

    return (
        <div className={'dashboard-page'}>

        </div>
    )
}
export default Dashboard