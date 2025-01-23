import ChatMessageItem from "./ChatMessageItem";

export default function ChatMessagesList({ messages, nameColor }) {
    return (
        <ul>
            {messages.map((message, index) => (
                <ChatMessageItem message={message} key={index} nameColor={nameColor} />
            ))}
        </ul>
    );
}
