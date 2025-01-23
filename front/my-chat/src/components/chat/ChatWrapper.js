import { useEffect, useState } from "react";
import socket from "../chat_notification/MySocketIo";
import ChatMessagesList from "./ChatMessageList";
import ChatMessageForm from "./ChatMessageForm";
import ChatNameForm from "./ChatNameForm";
import ChatNameColor from "../chat_color/ChatNameColor";
import '../../styles/Chat_style.css';
import ChatMessageItem from "./ChatMessageItem";


export default function ChatWrapper() {
    const [messages, setMessages] = useState([]);
    const [nameColor, setNameColor] = useState("black");

    useEffect(() => {
        socket.on("new_message", (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        socket.on("new_name_user", (data) => {
            const msgToList = {
                name: data.oldNameUser,
                msg: `User ${data.oldNameUser} is now known as ${data.newNameUser}`,
                createdAt: data.createdAt,
            };
            setMessages((prevMessages) => [...prevMessages, msgToList]);
        });

        socket.on("new_user_connection", (data) => {
            const msg = {
                name: data.name,
                createdAt: data.connectedAt,
                msg: "Welcome New User",
            };
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        return () => {
            socket.off("new_message");
            socket.off("new_name_user");
            socket.off("new_user_connection");
        };
    }, []);

    const handleColorChange = (color) => {
        setNameColor(color);
    };

    return (
        <>
            <hr />
            <ChatMessagesList messages={messages} nameColor={nameColor} />
            <hr className="hr_chat" />
            <ChatMessageForm />
            <ChatMessageItem/>
            <p className="New_Color">New Color:</p>
            <ChatNameColor onColorChange={handleColorChange} />
            <p className="New_Name">New Name:</p>
            <ChatNameForm />
        </>
    );
}
