import React, {useEffect, useState} from 'react';
import '../index.css'
import {useCookies} from "react-cookie";
import {useHistory} from "react-router-dom";
import {Card, CardContent, Divider, Typography} from "@material-ui/core";

const DBdump = (props) => {
    let history = useHistory();
    const [cookies, setCookie] = useCookies(['user']);
    const [DBList, setDBList] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/dbdump`, {
            credentials: 'include',
            headers: {'Content-Type': 'application/json'}
        })
            .then(response => response.json())
            .then(result => {
                setDBList(result)
            })
    }, [])

    return (
        <>
            <div className={'db-area'}>
                {DBList.map((item, index) => {
                    console.log(item)
                    return (
                        <div key={index} className={'db-card'}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" style={{fontWeight:'bold'}}> {item['sender'] ? 'Message' : 'User'} </Typography>
                                    <Typography variant="body2" component="p">
                                        <span className={'title-span'}>{item['sender'] ? 'Sender: ' : 'Username: '}</span>
                                        {item['sender'] ? item['sender'] : item['username']}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        <span className={'title-span'}>{item['sender'] ? 'Receiver: ' : 'Email: '}</span>
                                        {item['sender'] ? item['receiver'] : item['email']}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        <span className={'title-span'}>{item['sender'] ? 'Message: ' : 'Password: '}</span>
                                        {item['sender'] ? item['textMessage'] : item['password']}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </div>
                    )
                })}

            </div>
        </>
    )
}
export default DBdump