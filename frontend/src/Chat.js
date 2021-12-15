import { Avatar } from '@mui/material'
import React, { useState } from 'react'
import './Chat.css'
import axios from './axios'
import Login from './Login';
import Logout from './Logout'

function Chat(props) {
    const {messages} = props;

    const [input, setInput] = useState("")

    const sendMessage = async (e) => {
        e.preventDefault();
        var today = new Date();
        var date = today.getFullYear () + "-" + (today.getMonth()+1) + "-" + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;
        const saved = localStorage.getItem("name");
        const name = saved || "Anonymous";
       
        await axios.post("/messages/new", {
            message: input,
            name: name,
            timestamp: dateTime,
            recieved: false,
        });

        setInput("");
    };

    return (
        <div className="chat"> 
            <div className="chat_header">
                <Avatar src={localStorage.getItem("url") || ""}/>
                <div className="chat_headerInfo">
                    <h3>Chatting room </h3>
                </div>

                <div className="chat_headerRight">
                    <Login />
                    <Logout />
                </div>
            </div>

            <div className="chat_body">
                {messages.map((message) => (
                    <p className={`chat_message ${message.name === localStorage.getItem("name")&& "chat_reciever"}`}>
                        <span className="chat_name">{message.name}</span>
                            {message.message}
                        <span className="chat_timestamp">{message.timestamp}</span>
                    </p>
                ))}
            </div>
                  
            <div className="chat_footer">
                <form>
                    <input value={input} 
                        onChange={e => setInput(e.target.value)}
                        placeholder="Type a message" 
                        type="text" 
                    />
                    <button onClick={sendMessage}
                        type="submit">Send a message
                    </button>    
                </form>
            </div>
        </div>
    )
}

export default Chat