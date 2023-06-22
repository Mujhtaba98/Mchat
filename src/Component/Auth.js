import React from 'react'
import { auth, provider } from "../firebase.config";
import { signInWithPopup } from "firebase/auth";
import './Auth.css'


import Cookies from 'universal-cookie';
const cookies =new Cookies();

const Auth = (props) => {
  const {setisauth} =props;
  const signinwithgoogle = async () => {
    try{
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-cookies" , result.user.refreshToken);
      setisauth(true);
    }catch(err){
      console.error(err);
    }
  }

  return (
    <div className="auth">
      <span>sign in with google to continue</span>
      <button onClick={signinwithgoogle}>sign in with google</button>
    </div>
  );
}


export default Auth