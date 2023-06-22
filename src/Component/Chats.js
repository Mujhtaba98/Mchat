import React, { useEffect, useState } from 'react'
import {collection,  addDoc, serverTimestamp, onSnapshot, query , where, orderBy } from 'firebase/firestore';
import { auth, db } from '../firebase.config';
import './Chats.css'

const Chats = (props) => {
    const { room } = props;
    // msg
    const [Nmsg, setNmsg] = useState("");
    const [messages,setmessages]=useState([]);
    const msgref = collection(db, "messages");

    useEffect(() => {
        const querymessages = query(msgref, where("room","==", room),orderBy("createdAt"));
        const unsuscribe = onSnapshot(querymessages, (snapshot) => {
            let messages = [];
            snapshot.forEach((doc) => {
                messages.push({...doc.data(), id: doc.id });
            });
            setmessages(messages);
        });
        return () =>unsuscribe();
    }, []);

    const handlesubmit = async (e) => {
        e.preventDefault();
        //  to ctrl blank msg..
        if (Nmsg === "") return;
        await addDoc(msgref, {
            text: Nmsg,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room,
        });
        setNmsg("");
    }
    return (
        <div className="chat-app">
        <div className="header">
        <h1>Welcome to : {room}</h1>
        </div>
           <div className='messages'>
           {messages.map((message)=>(
            <div className="message" key={message.id}>
            <span className='user'> {message.user}</span>
            {message.text}
            </div>
          
            ))}
            </div>
        <form onSubmit={handlesubmit} className='new-message-form'>
                <input
                    className='new-message-input'
                    placeholder='enter new message'
                    onChange={(e) => setNmsg(e.target.value)}
                    value={Nmsg}
                />
                <button type="submit">send message</button>
            </form>
        </div>
    );
}

export default Chats