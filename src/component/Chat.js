import { useEffect, useState } from "react"
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy} from 'firebase/firestore'
import { auth, db } from "../firebase-config"

function Chat() {
    const [newMessage, setNewMessage] = useState("")
    const [messages, setMessages] = useState([])

    useEffect(() => {
        const queryMessages = query(collection(db, "message"), where("room", "==", "myroom"), orderBy("createdAt"))
        onSnapshot(queryMessages, (snapshot) => {
            let messages1 = [];
            snapshot.forEach((doc) => {
                messages1.push({...doc.data(), id: doc.id})
            })
            setMessages(messages1)
        })
    }, [])

    const handleSend = async (e) => {
        // if (newMessage === "") return 

        if (e.key === "Enter"){
            await addDoc(collection(db, "message"), {
                text: newMessage,
                createdAt: serverTimestamp(),
                user: auth.currentUser.displayName,
                room: "myroom"
            })
            await setNewMessage("")
        }
    }

    return(
        <div className="w-3/4 max-h-screen">
            <div className="h-[10%] border-b-[0.5px] border-slate-400 px-[10px] py-[5px]">
                <p className="font-bold">My room</p>
                <p className="text-sm">Anh em 76</p>
            </div>
            <div className="h-[90%]">
                <div className="h-[90%] border-b-[0.5px] border-slate-400  px-[10px] overflow-y-scroll overscroll-y-auto">
                    {messages.map((message) => {
                        if( auth.currentUser.displayName === message.user){
                            return(
                                <div className="flex flex-row-reverse mb-[5px]">
                                    <div>
                                        <p className=" bg-slate-400 px-[10px] rounded">{message.text}</p>
                                    </div>
                                </div>
                            )
                        }
                        return(
                            <div className="flex flex-row mb-[5px]">
                               <div>
                                        <h1 className="mb-[5px] text-sm font-bold">{message.user}:</h1>
                                        <p className=" bg-slate-400 px-[10px] rounded">{message.text}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="h-[10%] px-[10px] flex justify-around items-center">
                    <input
                        className="h-full w-[100%] px-[5px] outline-none"
                        placeholder="Type your message here..." 
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown = {handleSend}
                        value = {newMessage}
                    />
                    
                </div>
            </div>
        </div>
    )
}

export default Chat