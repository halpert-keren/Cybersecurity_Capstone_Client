import React, {useState} from 'react';
import '../index.css'
import {useCookies} from "react-cookie";
import {Button, TextField} from "@material-ui/core";
import {useHistory} from "react-router-dom";

const Signup = (props) => {
    let history = useHistory();
    const [cookies, setCookie] = useCookies(['user']);
    const [Username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');

    const signup = () => {
        console.log("signup")
    }

    return (
        <div className={'signup-page'}>
            <TextField label="Username" variant="outlined"
                       value={Username} onChange={(e) => setUsername(e.target.value)}/>
            <TextField label="Email" variant="outlined"
                       value={email} onChange={(e) => setEmail(e.target.value)}/>
            <TextField label="Password" variant="outlined" type="password"
                       value={password1} onChange={(e) => setPassword1(e.target.value)}/>
            <TextField label="Password Verification" variant="outlined" type="password"
                       value={password2} onChange={(e) => setPassword2(e.target.value)}/>
            <Button variant="contained" color="primary" disableElevation onClick={signup}>
                Sign Up
            </Button>
            <a href={'/'}>Already have an account? LOGIN HERE</a>
        </div>
    )
}
export default Signup