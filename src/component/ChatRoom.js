import SildeBar from "./SildeBar"
import Chat from "./Chat"

function ChatRoom( {setIsAuth , room} ) {

    return(
        <div className="flex">
            <SildeBar setIsAuth = {setIsAuth} room ={room} />
            <Chat room = {room} />
        </div>
    )
}

export default ChatRoom