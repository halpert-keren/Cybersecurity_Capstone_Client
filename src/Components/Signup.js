import React, {useState} from 'react';
import '../index.css'
import {useCookies} from "react-cookie";
import {Button, TextField} from "@material-ui/core";
import {useHistory} from "react-router-dom";

const Signup = (props) => {
    let history = useHistory();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [inputError, setInputError] = useState('');

    const checkPassword = () => {
        console.log(password2)
        console.log(password2.matches("[a-zA-Z\\s\'\"]+"))
        return /^[A-Za-z\s]\w{7,20}$/.test(password2) && password2.split(" ").length - 1 >= 1;
    }

    const signup = () => {
        console.log("signup")
        //
        // if(password1 !== password2) {
        //     setInputError("Passwords don't match")
        //     return
        // }
        //
        // if( password1 !== password2.trim()) {
        //     setInputError("Passwords can't start or end with spaces")
        //     return
        // }

        // if(checkPassword()) {
            const body = {
                username: username,
                email: email,
                password: password2
            }
            console.log(body)
            fetch(`http://localhost:3000/auth/signup`, {
                method: 'POST',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body),
            })
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                    history.push('/')
                })
        // }
        // else {
        //     setInputError("Password don't match requirements")
        //     return
        // }
    }

    return (
        <div className={'form-page'}  style={{height: '450px'}}>
            <TextField label="Username" variant="outlined" fullWidth
                       value={username} onChange={(e) => setUsername(e.target.value)}/>
            <TextField label="Email" variant="outlined" fullWidth
                       value={email} onChange={(e) => setEmail(e.target.value)}/>
            <TextField label="Password" helperText="Needs to be 7 to 20 characters (letters only) and contain at least two words (at least one space)."
                       variant="outlined" type="password" fullWidth
                       value={password1} onChange={(e) => setPassword1(e.target.value)}/>
            <TextField label="Password Verification" variant="outlined" type="password" fullWidth
                       value={password2} onChange={(e) => setPassword2(e.target.value)}/>
            <p>{inputError}</p>
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