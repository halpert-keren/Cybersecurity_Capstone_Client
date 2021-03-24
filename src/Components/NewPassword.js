import React, {useState} from 'react';
import '../index.css'
import {useCookies} from "react-cookie";
import {Button, TextField} from "@material-ui/core";
import {useHistory} from "react-router-dom";

const NewPassword = (props) => {
    let history = useHistory();
    const [cookies] = useCookies(['user']);
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');

    const changePass = () => {
        const body = {
            username: cookies.user.username,
            password: password2
        }

        fetch(`http://localhost:3000/api/users/${cookies.user._id}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body),
        })
            .then(response => history.push('/dashboard'))
    }

    return (
        <div className={'form-page'} style={{height: '350px'}}>
            <TextField label="Password"
                       helperText="Needs to be 7 to 20 characters (letters only) and contain at least two words (at least one space)."
                       variant="outlined" type="password" fullWidth
                       value={password1} onChange={(e) => setPassword1(e.target.value)}/>
            <TextField label="Password Verification" variant="outlined" type="password" fullWidth
                       value={password2} onChange={(e) => setPassword2(e.target.value)}/>
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