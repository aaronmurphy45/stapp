import React from 'react'
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, signInWithGoogle } from '../firebase/firebase-config';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import stockmar from './stockmar.jpeg'
import white from './white.png'
import { Modal, Button } from 'antd'
import { useState } from 'react';
import Login from './Login';
import Register from './Register';




export default function Root() {
    const [user,loading] = useAuthState(auth);
    const history = useNavigate();
    const [isLModalVisible, setIsLModalVisible] = useState(false);
    const [isRModalVisible, setIsRModalVisible] = useState(false);

    const LoginPage = () => {
        window.location = "/cryptonews/login/";
        //window.location = "/cryptonews/login/";
    }
    const RegisterPage = () => {
        //window.location = "/cryptonews/register";
        window.location = "register";
    }
    useEffect(() => {
        if (loading) {
          // maybe trigger a loading screen
          return;
        }
        if (user){
            history("/homepage");
            console.log("user is logged in")
        }
        }, []);
    
    const buttonStyle = {
        backgroundColor: "white",
        color: "rgb(65,143,247)",
        border: "none",
        padding: "10px 15px",
        borderRadius: "3px",
        cursor: "pointer",
        float: "right",
        margin: "10px"
    }

    const headerst = {
        color: "white",
        fontSize: "30px",
        fontWeight: "bold",
    }
    const containerStyle = {
        backgroundColor: "rgb(65,143,247)",
        width: "100%",
        height: "10%",

       
    }
    const imageStyle = {
        width: "105%",
        height: "80vh",
        opacity: 0.5

    }
    const imageButtonContainerStyle = {
        backgroundColor: "white",
        borderRadius : "5px",
        position: "absolute",
        right: "50%",
        top: "30%",
        padding: "10px 15px",
        alignItems: "center",
    }
    const bigButtonStyle = {
        backgroundColor: "rgb(65,143,247)",
        color: "white",
        border: "none",
        padding: "10px 15px",
        borderRadius: "3px",
        cursor: "pointer",
        float: "right",
    }
    const fr = {
        float: "right",
    }
    const fl = {
        float: "left",
    }

    const showLModal = () => {
        setIsLModalVisible(true);
    };

    const handleLOk = () => {
        setIsLModalVisible(false);
    };

    const handleLCancel = () => {
        setIsLModalVisible(false);
    };

    const showRModal = () => {
        setIsRModalVisible(true);
    };

    const handleROk = () => {
        setIsRModalVisible(false);
    };

    const handleRCancel = () => {
        setIsRModalVisible(false);
    };
    
    

    return (
        <div style = {containerStyle} >

            <h1 style = {headerst}>WELCOME TO STAPP</h1>
            <p>Stock Market Analysis and Prediction Application</p>
            <Link to = "/login">
                <button style = {buttonStyle}>Login</button>
            </Link>
            <Link to = "/register">
                <button style = {buttonStyle}>Register</button>
            </Link>
            <img style = {imageStyle} src = {stockmar}></img>
            <div style = {imageButtonContainerStyle}>
                
                <h1> Start Learning about the Stock Market Today</h1>
                <div style = {fl}>
                <p>Learn about</p>
                <ul>
                    <li>Stock Market</li>
                    <li>Stock Market Trends</li>
                    <li>Stock Market Analysis</li>
                    <li>Stock Market Prediction</li>
                    <li>Cryptocurrencies</li>
                    <li>NFT's</li>
                    <li>Commodities</li>
                    <li>Forex</li>
                </ul>
                </div>
                <div style = {fr}>
                <Button type="primary" onClick={showLModal}>
                        Login Now
                </Button>
                <h2>or</h2>
                <Button type="primary" onClick={showRModal}>
                        Register Now
                </Button>
                </div>

            </div>
             
            <Modal title="Login" visible={isLModalVisible} onOk={handleLOk} onCancel={handleLCancel}>
                    <Login simplified ></Login>
            </Modal>
            <Modal title="Register" visible={isRModalVisible} onOk={handleROk} onCancel={handleRCancel}>
                    <Register simplified ></Register>
            </Modal>
        </div>
        
    )
}
