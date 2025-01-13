import React, { useEffect } from "react";
import socket from "../chat_notification/MySocketIo";
import '../../styles/Chat_style.css';

export default function ChatMessageForm() {
// Вывод новых сообщений
    const doEmitMessage = (ev) => {
        ev.preventDefault();

        const msg = ev.target.message.value;
        console.log(msg);

        socket.emit("new_message", msg);
        ev.target.message.value = "";
    };
//HTML
    return (
        <>
            <form onSubmit={doEmitMessage}>
                <input type="text" class="input_sms" name="message"/>
                <input type="submit"  class="button_sms"/>
        </form>
</>
)
    ;
}

