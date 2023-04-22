import { auth, provider, db } from '../firebase-config'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { cookies } from './Cookies'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'

function SignIn( {setIsAuth} ) {
   const handleSignIn = () => {
        signInWithPopup(auth,provider)
        .then( async (result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result)
            const token = credential.accessToken
            const user = result.user
            setIsAuth(true)
            cookies.set("auth-token", result.user.refreshToken)
            console.log(result)
            // await setDoc(doc(db,"users", auth.currentUser.uid), {
            //     uid: user.uid,
            //     name: auth.currentUser.displayName,
            //     photoUrl: auth.currentUser.photoURL,
            //     room: "myroom"
            // })
        })
        .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            const email = error.customData.email
            const credential = GoogleAuthProvider.credentialFromError(error)
            console.log(errorMessage)
        })
   }
    return(
        <div className="text-center ">
            <h1 className="text-5xl font-bold">WELCOME TO MY CHANEL</h1>
            <button 
                className="p-[10px] mt-[10px] bg-slate-400 rounded"
                onClick={ handleSignIn }
            >
                Sign In
            </button>
        </div>
    )
}

export default SignIn