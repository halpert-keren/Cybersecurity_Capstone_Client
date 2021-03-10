import React from 'react';
import '../index.css'
import {useHistory} from "react-router-dom";
import {useCookies} from "react-cookie";

const Login = (props) => {
    let history = useHistory();
    const [cookies, setCookie] = useCookies(['user']);

    return (
        <div className={'login-page'}>
            <div className={'login-btn'}>
                <h1>Login to TriGo</h1>
            </div>
        </div>
    )
}
export default Login