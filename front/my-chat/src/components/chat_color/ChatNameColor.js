import socket from "../chat_notification/MySocketIo";
import { useState } from "react";
import '../../styles/Chat_style.css';
import ChatMessageItem from "../chat/ChatMessageItem";
export default function ChatNameColor({ onColorChange }) {
    const [nameColor, setNameColor] = useState("black");

    const handleColorChange = (ev) => {
        ev.preventDefault();

        const newColor = ev.target.color.value.trim();
        if (!newColor) return;

        setNameColor(newColor); // Обновляем локальное состояние цвета
        onColorChange(newColor); // Передаем цвет родителю
        socket.emit("color_changed", newColor); // Отправляем цвет на сервер
        ev.target.color.value = ""; // Очищаем поле ввода
    };

    return (
        <form onSubmit={handleColorChange}>
            <input type="text" name="color" className="input_color_name"/>
            <input type="submit" className="button_color_name" value="Отправить" />
        </form>
    );
}

