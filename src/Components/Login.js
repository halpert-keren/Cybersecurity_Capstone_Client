import React, {useState} from 'react';
import '../index.css'
import {useCookies} from "react-cookie";
import {Button, TextField, Typography} from "@material-ui/core";
import {useHistory} from "react-router-dom";

const Login = (props) => {
    let history = useHistory();
    const [cookies, setCookie] = useCookies(['user']);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [inputError, setInputError] = useState('');

    const login = () => {
        const body = {
            username: username,
            password: password
        }

        fetch(`https://capstone-coursera-project.herokuapp.com/auth/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body),
        })
            .then(response => response.json())
            .then(result => {
                if (result['fail']) {
                    setInputError('Password is incorrect')
                    return
                } else {
                    const cookiePromise = new Promise((resolve) => {
                        setCookie('user', result)
                        resolve()
                    })
                    cookiePromise.then(() => {
                        history.push('/dashboard')
                    })
                }
            })
    }

    return (
        <div className={'form-page'} style={{height: '350px'}}>
            <TextField label="Email or Username" variant="outlined" fullWidth
                       value={username} onChange={(e) => setUsername(e.target.value)}/>
            <TextField label="Password" variant="outlined" type="password" fullWidth
                       value={password} onChange={(e) => setPassword(e.target.value)}/>
            <Typography>{inputError}</Typography>
            <Button variant="contained" color="primary" disableElevation onClick={login}>
                Login
            </Button>
            <div className={'btn-area'}>
                <Button onClick={() => history.push('/forgot-password')}>Forgot your password?</Button>
                <Button onClick={() => history.push('/sign-up')}>Don't have an account? SIGN UP HERE</Button>
            </div>
        </div>
    )
}
export default Login