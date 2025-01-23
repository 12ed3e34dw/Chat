import socket from "../chat_notification/MySocketIo"
import '../../styles/Chat_style.css';
import  Img from '../../Img/free-icon-font-paper-plane-3917398.png'

export default function ChatNameForm () {

    const doEmitMessage = (ev) => {
        ev.preventDefault()

        const newName = ev.target.name.value
        console.log(newName)

        socket.emit('new_name_user', newName)
        ev.target.name.value = ''

    }

    return(
        <>
            <form onSubmit={doEmitMessage}>
                <input type="text" class="input_new_name" name="name" />
                <input type="submit" class="button_new_name"/>
            </form>
        </>
    )
}