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
import { StockOutlined } from '@ant-design/icons';




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
        marginLeft: "10%",
        color: "white",
        fontSize: "80px",
        fontWeight: "bold",
    }
    const headerst2 = {
        marginLeft: "10%",
        color: "white",
        fontSize: "30px",
        fontWeight: "bold",
    }
    const containerStyle = {
        backgroundColor: "rgb(65,143,247)",
        width: "100%",
        height: "5%",
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
        fontSize: "20px",
        border: "none",
        width: "100%",
        height: "30%",
        borderRadius: "3px",
        cursor: "pointer",
        float: "right",
    }
    const fr = {
        marginTop: "10%",
        alignItems: "center",
        float: "right",
        width: "50%",
        height: "100%"
    }
    const fl = {
        marginLeft: "10px",
        float: "left",
    }
    
    const smalltextstyle={
        color: "black",
        fontSize: "20px",
        fontWeight: "bold",
        margin: "auto"
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

    const listStyle = {
        color : "black",
        fontSize: "10px",
        fontWeight: "italic",
        borderBottom: "1px solid rgb(65,143,247)"
    }
    
    

    return (
        <div style = {containerStyle} >

            <h1 style = {headerst}>STAPP</h1>
            <h2 style={headerst2}>Stock Market Analysis and Prediction Application</h2>
           
            <button onClick={showLModal} style = {buttonStyle}>Login</button>
            
            
            <button onClick={showLModal} style = {buttonStyle}>Register</button>
          
            <img style = {imageStyle} src = {stockmar}></img>
            <div style = {imageButtonContainerStyle}>
                
                <h1> Start Learning about the Stock Market Today</h1>
                <div style = {fl}>
                <p>Learn about </p> <StockOutlined ></StockOutlined>
                
               <p style = {listStyle}>Stock Market</p>
                    <p style = {listStyle}>Cryptocurrency</p>
                    <p style = {listStyle}>Stock Market Trends</p>
                    <p style = {listStyle}>Stock Market Analysis</p>
                    <p style = {listStyle}>Stock Market Prediction</p>
                    <p style = {listStyle}>Forex</p>
                    <p style = {listStyle}>Futures</p>
                    <p style = {listStyle}>Options</p>
                    <p style = {listStyle}>Commodities</p>
                    <p style = {listStyle}>Bonds</p>


               
                </div>
                <div style = {fr}>
                <Button style = {bigButtonStyle} type="primary" onClick={showLModal}>
                        Login Now
                </Button>
                <br/> <br/>
                <h2>or</h2>
                <Button style = {bigButtonStyle} type="primary" onClick={showRModal}>
                        Register Now
                </Button>
                <br/>
                </div>

            </div>
             
            <Modal title="Stapp" visible={isLModalVisible} onOk={handleLOk} onCancel={handleLCancel} okButtonProps={{ style: { display: 'none'} }}
          cancelButtonProps={{ style: { display: 'none'} }}>
                    <Login simplified ></Login>
            </Modal>
            <Modal title="Stapp" visible={isRModalVisible} onOk={handleROk} onCancel={handleRCancel} okButtonProps={{ style: { display: 'none'} }}
          cancelButtonProps={{ style: { display: 'none'}}}>
                    <Register simplified ></Register>
            </Modal>
        </div>
        
    )
}
