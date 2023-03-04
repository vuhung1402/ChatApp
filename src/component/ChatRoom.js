import SildeBar from "./SildeBar"
import Chat from "./Chat"

function ChatRoom( {setIsAuth} ) {

    return(
        <div className="flex">
            <SildeBar setIsAuth = {setIsAuth}/>
            <Chat/>
            {/* <div> 
                {messages.map((message) => {
                    return(
                        <div>
                            <h1>{message.user}:</h1>
                            <p>{message.text}</p>
                        </div>
                    )
                })} 
            </div> */}
            {/* <form onSubmit={handleSubmit}>
                <input
                    className="border-slate-400	rounded	border-2 outline-none p-[10px]"
                    placeholder="Type your message here...."
                    onChange={(e) => {setNewMessage(e.target.value)}}
                />
                <br/>
                <button type="submit" className="mt-[5px] bg-slate-300 rounded p-[10px]">
                    Send
                </button>
            </form> */}
        </div>
    )
}

export default ChatRoom