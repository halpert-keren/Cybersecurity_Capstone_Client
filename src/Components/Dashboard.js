import React, {useEffect, useState} from 'react';
import '../index.css'
import {useCookies} from "react-cookie";
import {useHistory} from "react-router-dom";
import {Button, Card, CardContent, Divider, TextField, Typography} from "@material-ui/core";

const Dashboard = (props) => {
    let history = useHistory();
    const [cookies, setCookie] = useCookies(['user']);
    const [messageList, setMessageList] = useState([]);
    const [updater, setUpdater] = useState(false);
    const [receiver, setReceiver] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch(`http://localhost:3000/api/messages?username=${cookies.user.username}`, {
            credentials: 'include',
            headers: {'Content-Type': 'application/json'}
        })
            .then(response => response.json())
            .then(result => {
                setMessageList(result)
            })
    }, [updater])

    const logout = () => {
        setCookie('user', '')
        history.push('/')
    }

    const sendMessage = () => {
        console.log("sendMessage")
        const body = {
            sender: cookies.user.username,
            receiver: receiver,
            textMessage: message,
        }
        console.log(body)
        fetch(`http://localhost:3000/api/messages`, {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body),
        })
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setMessage('')
                setReceiver('')
                setUpdater(!updater)
            })
    }

    return (
        <>
            <Button variant="contained" color="primary" disableElevation onClick={logout}
                    style={{marginTop: '2%', marginLeft: '2%'}}> Logout </Button>
            <Button variant="contained" color="primary" disableElevation onClick={() => history.push('/new-password')}
                    style={{marginTop: '2%', marginLeft: '1%'}}> Change Password </Button>
            <div className={'dashboard-page'}>
                <div className={'list-area'}>
                    {messageList.map((message, index) => {
                        return (
                            <div key={index} className={'message-card'}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6" color="textSecondary">
                                            {message.receiver === cookies.user.username ? 'Received from:' : "Sent to:"}
                                        </Typography>
                                        <Typography variant="h5" gutterBottom>
                                            {message.receiver === cookies.user.username ? message.sender : message.receiver}
                                        </Typography>
                                        <Divider style={{marginBottom: '2%'}}/>
                                        <Typography variant="h5">
                                            {message.textMessage}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </div>
                        )
                    })}
                </div>
                <div className={'form-area'}>
                    <div className={'form-page'} style={{height: '450px', width: '100%'}}>
                        <Typography variant="h4" style={{alignSelf: 'flex-start'}}>Send a message:</Typography>
                        <TextField label="Username" variant="outlined" value={receiver} fullWidth
                                   onChange={(e) => setReceiver(e.target.value)}/>
                        <TextField label="Message" variant="outlined" value={message} multiline fullWidth rows={10}
                                   onChange={(e) => setMessage(e.target.value)}/>
                        <Button variant="contained" color="primary" disableElevation
                                onClick={sendMessage}> Send </Button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Dashboard