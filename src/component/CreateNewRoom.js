import { useRef, useState } from "react"

//firebase
import { collection, addDoc, doc, setDoc } from 'firebase/firestore'
import { db, auth } from "../firebase-config"


function CreateNewRoom({ setRoom, handleCreateNewRoom }) {
    const [roomName, setRoomName] = useState("")
    const [password, setPassword] = useState("")
    const [rePassword, setRePassword] = useState("")

    const handleCreateRoom = async () => {
        if(password === rePassword){
            await addDoc(collection(db, "rooms"), {
                roomName: roomName,
                password: password
            })
            await setDoc(doc(db,"users", auth.currentUser.uid), {
                uid: auth.currentUser.uid,
                name: auth.currentUser.displayName,
                photoUrl: auth.currentUser.photoURL,
                room: roomName
            })
            setRoom(roomName)
        }
        else{
            alert("password doesn't match")
        }
    }

    return(
        <div className="fixed flex items-center justify-center top-0 bottom-0 right-0 left-0 bg-[rgba(19,18,18,0.71)]">

            <div className="bg-white flex flex-col items-center p-6 gap-5 rounded-2xl relative">
                <div className=" absolute top-1 right-1 cursor-pointer" onClick={handleCreateNewRoom}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
                <input value={roomName} onChange={(e) => setRoomName(e.target.value)} className=" border-[1px] w-[300px] outline-none border-blue-300 rounded-xl mt-[5px] p-2" placeholder="Room name"/>
                <input value={password} onChange={(e) => setPassword(e.target.value)} className=" border-[1px] w-[300px] outline-none border-blue-300 rounded-xl mt-[5px] p-2" placeholder="Password" type="password"/>
                <input value={rePassword} onChange={(e) => setRePassword(e.target.value)} className=" border-[1px] w-[300px] outline-none border-blue-300 rounded-xl mt-[5px] p-2" placeholder="Rewrite Password" type="password"/>
                <button onClick={handleCreateRoom} className=" w-fit h-fit bg-orange-400 rounded-2xl p-2">Create new room</button>
            </div>
        </div>
    )
}

export default CreateNewRoom