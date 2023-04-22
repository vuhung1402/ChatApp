import { cookies } from './Cookies';
import { auth, db } from '../firebase-config'
import { signOut } from 'firebase/auth'
import { useEffect, useState } from 'react';
import { collection, deleteDoc, doc, onSnapshot, query, where } from 'firebase/firestore';

function SildeBar( {setIsAuth,room} ) {
    const [users, setUsers] = useState([])

    useEffect( () =>{
        const q = query(collection(db, 'users'), where("room", "==", `${room}`))
        onSnapshot(q, (snapshot) => {
            let users1 = []
            snapshot.forEach((doc) => {
                users1.push({...doc.data(), id:doc.id})
                console.log(users1)
            })
            setUsers(users1)
        })
    },[] )

    const handleSignOut = async () => {
        await deleteDoc(doc(db, "users", auth.currentUser.uid))
        await signOut(auth);
        cookies.remove("auth-token")
        setIsAuth(false)
    }
    return(
        <div className="h-screen w-1/4 bg-[#3e0e40] text-white">
            <div className="h-[10%] flex items-center justify-between border-b-[0.5px] border-slate-400 px-[10px]">
                <div className='flex items-center'>
                    <img 
                        className = " h-[30px] w-[30] rounded-full "
                        src={auth.currentUser.photoURL}
                    />
                    <div className="ml-[10px]">{auth.currentUser.displayName}</div>
                </div>
                <button 
                    className="border-gray-100	border-[0.05px] rounded p-[5px]"
                    onClick={handleSignOut}
                >
                    Đăng xuất
                </button>
            </div>
            <div className="h-[90%] px-[10px]">
                <div className="pt-[10px]">Thành Viên:</div>
                <ul className="ml-[10px] mt-[10px]">
                    {users.map( (user) => {
                        return(
                            <li className="mt-[5px] block">
                                <div className='flex items-center'>
                                    <img 
                                        className = " h-[30px] w-[30] rounded-full "
                                        src={user.photoUrl}
                                    />
                                    <div className="ml-[10px]">{user.name}</div>
                                </div>
                            </li>
                        )
                    } )}
                </ul>
            </div>
        </div>
    )
}

export default SildeBar