import React, {useState} from 'react';
import '../index.css'
import {useCookies} from "react-cookie";
import {Button, TextField, Typography} from "@material-ui/core";
import {useHistory} from "react-router-dom";

const Signup = (props) => {
    let history = useHistory();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [inputError, setInputError] = useState('');

    const checkPassword = () => {
        if (password1 !== password2) {
            setInputError("Passwords don't match")
            return false
        }
        if(password2.trim() !== password2) {
            setInputError("Password can't have spaces at the start or end")
            return false
        }
        if(password2.length < 7) {
            setInputError("Password is too short")
            return false
        }
        if(password2.length > 20) {
            setInputError("Password is too long")
            return false
        }
        if(password2.split(" ").length < 2) {
            setInputError("Password doesn't match requirements")
            return false
        }
        return true
    }

    const signup = () => {

        if (checkPassword()) {
            const body = {
                username: username,
                email: email,
                password: password2
            }

            fetch(`https://capstone-coursera-project.herokuapp.com/auth/signup`, {
                method: 'POST',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body),
            })
                .then(response => response.json())
                .then(result => {
                    if (result['fail']) {
                        setInputError('Email exists already in system')
                    } else {
                        history.push('/')
                    }
                })
        } else {
            setInputError("Password doesn't match requirements")
            return
        }
    }

    return (
        <div className={'form-page'} style={{height: '450px'}}>
            <TextField label="Username" variant="outlined" fullWidth
                       value={username} onChange={(e) => setUsername(e.target.value)}/>
            <TextField label="Email" variant="outlined" fullWidth
                       value={email} onChange={(e) => setEmail(e.target.value)}/>
            <TextField label="Password"
                       helperText="Needs to be 7 to 20 characters and contain at least two words (at least one space)."
                       variant="outlined" type="password" fullWidth
                       value={password1} onChange={(e) => setPassword1(e.target.value)}/>
            <TextField label="Password Verification" variant="outlined" type="password" fullWidth
                       value={password2} onChange={(e) => setPassword2(e.target.value)}/>
            <Typography>{inputError}</Typography>
            <Button variant="contained" color="primary" disableElevation onClick={signup}>
                Sign Up
            </Button>
            <div className={'btn-area'}>
                <Button onClick={() => history.push('/')}>Already have an account? LOGIN HERE</Button>
            </div>
        </div>
    )
}
export default Signup