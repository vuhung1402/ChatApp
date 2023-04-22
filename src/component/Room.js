//hooks
import { useEffect, useRef, useState } from "react"

//component
import ChatRoom from "./ChatRoom"
import CreateNewRoom from "./CreateNewRoom"

//firebase
import { collection, addDoc, doc, setDoc, query, where, getDocs, onSnapshot } from 'firebase/firestore'
import { db, auth } from "../firebase-config"


function Room({ setIsAuth }) {
    const [room, setRoom] = useState()
    const [createNewRoom, setCreateNewRoom ] = useState(false)
    const [rooms, setRooms] = useState()
    const [password, setPassword] = useState("")

    const roomNameRef = useRef()

    useEffect(() => {
        const q = query(collection(db,'rooms'))
        onSnapshot(q, (snapshot) => {
            let rooms = []
            snapshot.forEach((doc) => {
                rooms.push(doc.data())
            })
            setRooms(rooms)
        })
    },[])

    console.log("Rooms:", rooms)

    const handleCreateNewRoom = () => {
        setCreateNewRoom(!createNewRoom)
    }

    const handleSearch = async () => {
        if(checkRoom()){
            await setDoc(doc(db,"users", auth.currentUser.uid), {
                uid: auth.currentUser.uid,
                name: auth.currentUser.displayName,
                photoUrl: auth.currentUser.photoURL,
                room: roomNameRef.current.value
            })
            setRoom(roomNameRef.current.value)
        }
        else{
            alert("Check your room's information")
        }
    }
    const checkRoom = () => {
        for(let i = 0; i < rooms?.length; i++){
            if(rooms[i].password === password && rooms[i].roomName === roomNameRef.current.value){
                return true
            }
        }
        return false
    }


    return(
        <>
            {room ? 
                ( <ChatRoom setIsAuth={setIsAuth} room = {room} /> ):

                (
                    <div className="flex flex-col justify-center items-center">
                        <input ref={roomNameRef} className=" border-[1px] w-[300px] outline-none border-blue-300 rounded-xl mt-[5px] p-2" placeholder="Room name"/>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} className=" border-[1px] w-[300px] outline-none border-blue-300 rounded-xl mt-[5px] p-2" placeholder="Password" type="password"/>
                        <div className="flex mt-[10px]">
                            <button className=" w-fit h-fit bg-orange-400 rounded-2xl p-2 mr-[50px]" onClick={handleSearch}>Search</button>
                            <button onClick={handleCreateNewRoom} className=" w-fit h-fit bg-orange-400 rounded-2xl p-2">Create new room</button>
                        </div>
                        <div className={createNewRoom ? "block" : "hidden"}>
                            <CreateNewRoom setRoom = {setRoom} handleCreateNewRoom = {handleCreateNewRoom} />
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default Room