import {useState} from "react";
import ChatMessageForm from "../chat/ChatMessageForm";

export default function ChatMessageItem({ message, nameColor }) {

    if (!message || !message.createdAt || !message.name || !message.msg) {
        return null; // Если данные некорректны то ничего не принимаем
    }

    return (
        <li>
            <small>{new Date(message.createdAt).toLocaleString()} </small>
            <strong style={{ color: nameColor }}>{message.name} :</strong>
            {message.msg}
        </li>
    );
}

