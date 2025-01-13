import socket from "../chat_notification/MySocketIo"
import {toast} from "react-toastify";
import ChatMessageForm from "./ChatMessageForm";
import {useEffect, useState} from "react";
import ChatMessagesList from "./ChatMessagesList";
import ServerPing from "../chat_notification/ServerPing";
import ChatNameForm from "./ChatNameForm";
import '../../styles/Chat_style.css';
export default function ChatWrapper () {


    const [messages, setMessages ] = useState([]);

    useEffect(() => {
        socket.on('new_message', (data) => {
            console.log(data)
            setMessages(prevMessages => [...prevMessages, data]);
        })

        socket.on('new_name_user', (data) => {
            console.log(data)
            const msgToList = {
                name: data.oldNameUser,
                msg: ' User ' + data.oldNameUser + ' now know as ' + data.newNameUser,
                createdAt: data.createdAt
            }
            setMessages(prevMessages => [...prevMessages, msgToList]);
        })

        socket.on('new_user_connection', (data) => {
            const msg = {
                name: data.name,
                createdAt: data.connectedAt,
                msg: " Welcome New User "
            }
            setMessages(prevMessages => [...prevMessages, msg]);

        })

    },[])


    return(
        <>
            <hr/>
            <ChatMessagesList messages={messages} />
            <hr class="hr_chat" />
            <ChatMessageForm />
            <p class="New_Name">New Name:</p>
            <ChatNameForm />
            <ServerPing />
        </>
    )
}