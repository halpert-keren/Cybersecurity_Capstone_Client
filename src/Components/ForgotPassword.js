import React, {useState} from 'react';
import '../index.css'
import {useCookies} from "react-cookie";
import {Button, TextField, Typography} from "@material-ui/core";
import {useHistory} from "react-router-dom";

const ForgotPassword = (props) => {
    let history = useHistory();
    const [cookies, setCookie] = useCookies(['user']);
    const [passCode, setPassCode] = useState('');
    const [passCodeInput, setPassCodeInput] = useState(false);
    const [email, setEmail] = useState('');
    const [inputError, setInputError] = useState('');

    const getPassCode = () => {
        const body = {
            email: email
        }
        setPassCodeInput(true)
        fetch(`https://capstone-coursera-project.herokuapp.com/auth/get-passcode`, {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body),
        })
            .then(() => {})
    }

    const login = () => {
        const body = {
            email: email,
            passCode: passCode
        }

        fetch(`https://capstone-coursera-project.herokuapp.com/auth/login-passcode`, {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body),
        })
            .then(response => response.json())
            .then(result => {
                if(result['fail']) {
                    setInputError('The pass code is incorrect')
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
            <TextField label="Email" variant="outlined" fullWidth value={email}
                       onChange={(e) => setEmail(e.target.value)}/>
            {
                passCodeInput ? (
                    <>
                        <TextField label="Pass Code" helperText="From the email we have sent you."
                                   variant="outlined" fullWidth value={passCode}
                                   onChange={(e) => setPassCode(e.target.value)}/>
                        <Typography>{inputError}</Typography>
                        <Button variant="contained" color="primary" disableElevation onClick={login}>
                            Login
                        </Button>
                    </>
                ) : (
                    <Button className={passCodeInput ? 'hidden-input' : ''} variant="contained" color="primary"
                            disableElevation onClick={getPassCode}>
                        Send One-time Code
                    </Button>
                )
            }
        </div>
    )
}
export default ForgotPassword