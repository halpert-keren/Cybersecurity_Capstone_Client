import React, {useState} from 'react';
import '../index.css'
import {useCookies} from "react-cookie";
import {Button, TextField, Typography} from "@material-ui/core";
import {useHistory} from "react-router-dom";

const NewPassword = (props) => {
    let history = useHistory();
    const [cookies] = useCookies(['user']);
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

    const changePass = () => {
        if (password1 !== password2) {
            setInputError("Passwords don't match")
            return
        }
        if (checkPassword()) {
            const body = {
                username: cookies.user.username,
                password: password2
            }

            fetch(`https://capstone-coursera-project.herokuapp.com/api/users/${cookies.user._id}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body),
            })
                .then(() => history.push('/dashboard'))
        } else {
            setInputError("Password doesn't match requirements")
            return
        }
    }

    return (
        <div className={'form-page'} style={{height: '350px'}}>
            <TextField label="Password"
                       helperText="Needs to be 7 to 20 characters and contain at least two words (at least one space)."
                       variant="outlined" type="password" fullWidth
                       value={password1} onChange={(e) => setPassword1(e.target.value)}/>
            <TextField label="Password Verification" variant="outlined" type="password" fullWidth
                       value={password2} onChange={(e) => setPassword2(e.target.value)}/>
            <Typography>{inputError}</Typography>
            <Button variant="contained" color="primary" disableElevation onClick={changePass}>
                Change Password
            </Button>
            <div className={'btn-area'}>
                <Button onClick={() => history.push('/dashboard')}>Cancel</Button>
            </div>
        </div>
    )
}
export default NewPassword