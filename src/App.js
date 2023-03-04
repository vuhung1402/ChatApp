import { useState } from "react";
import SignIn from "./component/SignIn";
import ChatRoom from "./component/ChatRoom";
import { cookies } from "./component/Cookies";


function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"))
  if(!isAuth){
    return (
      <div>
          <SignIn setIsAuth = {setIsAuth}/>
      </div>
    );
  }
  return (
    <div>
        <ChatRoom setIsAuth = {setIsAuth}/>
    </div>
  )
  
}

export default App;
