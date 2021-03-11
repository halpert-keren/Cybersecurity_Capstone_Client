import React, {useState} from 'react';
import '../index.css'
import {useCookies} from "react-cookie";
import {Button, ButtonBase, TextField} from "@material-ui/core";
import {useHistory} from "react-router-dom";

const Login = (props) => {
    let history = useHistory();
    const [cookies, setCookie] = useCookies(['user']);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const login = () => {
        console.log("login")
    }

    const forgotPassword = () => {
        console.log("forgotPassword")
    }

    return (
        <div className={'login-page'}>
            <TextField label="Username" variant="outlined"
                       value={username} onChange={(e) => setUsername(e.target.value)}/>
            <TextField label="Password" variant="outlined" type="password"
                       value={password} onChange={(e) => setPassword(e.target.value)}/>
            <Button variant="contained" color="primary" disableElevation onClick={login}>
                Login
            </Button>
            <Button onClick={forgotPassword}>Forgot your password?</Button>
            <a href={'/sign-up'}>Don't have an account? SIGN UP HERE</a>
        </div>
    )
}
export default Login