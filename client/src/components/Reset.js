import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, sendPasswordResetEmail } from "../firebase/firebase-config";
import logo from './stockmar.jpeg';
import white from './white.png';
import { Button, Input } from "antd";
import zIndex from "@material-ui/core/styles/zIndex";
function Reset() {
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const backgroundStyle = {
      backgroundImage: `url(${logo})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "100vh",
        width: "100vw",
        position: "absolute",
        top: "0",
        left: "0",
        alignItems: "center",
        opacity: "0.5",
        
    }
    const containerStyle = {
        backgroundColor: "white",
        alignItems: "center",
        marginTop: "10px",
        padding: "10px",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "50%",  
        height: "25%",
        borderRadius: "10px",
        opacity: "1",
       
       
    }
    const backgroundStyle2 = {
        backgroundImage: `url(${white})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "100vh",
        width: "100vw",
        opacity: "0.5",
        position: "absolute",
        top: "0",
        left: "0",
        
    }

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading]);
  return (
      <div>
   <div style = {backgroundStyle}></div>
      <div style = {containerStyle}>
        <h1>Reset Password</h1>
        <Input
          type="text"
          className="reset__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <Button
          className="reset__btn"
          onClick={() => sendPasswordResetEmail(email)}
        >
          Send password reset email
        </Button>
        <div>
          Don't have an account? <Link to="/register">Register</Link> now.
        </div>
  
      </div>
      </div>

  );
}
export default Reset;