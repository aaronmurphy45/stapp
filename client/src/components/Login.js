import React from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, signInWithEmailAndPassword, signInWithGoogle, signInWithPopupx } from "../firebase/firebase-config";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { useState } from 'react';
import { useCollectionData } from "react-firebase-hooks/firestore";
import {Link} from 'react-router-dom'


export default function Login({simplified}) {
    
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [user, loading, error] = useAuthState(auth);
    const history = useNavigate();
    useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) history("/homepage");
    }, [user, loading]);

    const handleSubmit = (event) => {
        event.preventDefault()
        
    }

    if (simplified) {
        return (
          <div>
          <h1>Login</h1>
          <input
            type="text"
            className="login__textBox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
          />
          <input
            type="password"
            className="login__textBox"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button
            className="login__btn"
            onClick={() => signInWithEmailAndPassword(email, password)}
          >
            Login
          </button>
          <button className="login__btn login__google" onClick={signInWithGoogle}>
            Login with Google
          </button>
          <button className="login__btn login__google" onClick={signInWithPopupx}>
            Login with Facebook
          </button>
          <div>
            <Link to="/reset">Forgot Password</Link>
          </div>
          <div>
            Don't have an account? <Link to="/register">Register</Link> now.
          </div>
          </div>

        )
    }



    return (
        <div className="login" style ={{backgroundColor: "rgb(65,143,247)"}}>
         
        <div className="login__container">
        <h1>Login</h1>
          <input
            type="text"
            className="login__textBox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
          />
          <input
            type="password"
            className="login__textBox"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button
            className="login__btn"
            onClick={() => signInWithEmailAndPassword(email, password)}
          >
            Login
          </button>
          <button className="login__btn login__google" onClick={signInWithGoogle}>
            Login with Google
          </button>
          <button className="login__btn login__google" onClick={signInWithPopupx}>
            Login with Facebook
          </button>
          <div>
            <Link to="/reset">Forgot Password</Link>
          </div>
          <div>
            Don't have an account? <Link to="/register">Register</Link> now.
          </div>
        </div>
      </div>
    );
}
