import { useState, useRef } from "react";
import Auth from "./Component/Auth";

import Cookies from 'universal-cookie';
import Chats from "./Component/Chats";

import { signOut } from "firebase/auth";
import { auth } from "./firebase.config";
import './App.css'
import Footer from "./Component/Footer";


const cookies = new Cookies();

function App() {
  //authentication
  const [isauth, setisauth] = useState(cookies.get("auth-cookies"));
  //room
  const [room, setroom] = useState(null);

  const roominputref = useRef(null);

  const signusrout = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setisauth(false);
    setroom(null);
  }

  if (!isauth) {
    return (
      <div className="homepage">
        <div className="l">
          <h1>M-Chat</h1>
          <p>Welcome to M-chat app</p>
          <p>The world is filled with nice people, </p>
          <p>if you can't find one be one</p>

        </div>
        <div className="r">
          <Auth setisauth={setisauth} />
        </div>
      </div>
      
    );

  }
  
  //ternary operator
  return <div>{room ? (<Chats room={room} />) :
    (<div className="room">
      <label>Enter room name</label>
      <input ref={roominputref} />
      <button onClick={() => setroom(roominputref.current.value)}>enter chat</button>
    </div>)}

    <div className="sign-out">
      <button onClick={signusrout}>signout</button></div>
  </div>

}

export default App;
