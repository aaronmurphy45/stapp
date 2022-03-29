import { Button } from 'antd';
import { use } from 'express/lib/router';
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth} from '../firebase/firebase-config';
import { logout } from '../firebase/firebase-config';
import { Input, Timeline } from 'antd';

import { RecentlyViewed } from './RecentlyViewed';


export default function User() {

    const [user, loading] = useAuthState(auth);
    console.log(user);


    const userSince = ()=>{
        if(user){
            const timenow = new Date();
            const timecreated = new Date(user.metadata.creationTime);
            var time = (Math.abs(timenow - timecreated));
            var months = Math.floor(time/(1000*60*60*24*30));
            var days = Math.floor(time / (1000 * 60 * 60 * 24));
            var hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((time % (1000 * 60)) / 1000);
            return months = "months, ", days + " days, " + hours + " hours, " + minutes + " minutes, " + seconds + " seconds";
        }
    }
    const containerStyle = {
        backgroundColor: "white",
        width: "100%",
        height: "100%",
        marginTop: "10px",
        padding: "10px"
    }

    const LogoutStyle = {
       

        padding: "10px",
        height: "100%",
        width :"30%",
        margin: "10px",
        float: "right",
        fontSize: "1.5em",
        backgroundColor: "rgb(67,145,255)",
        color: "white"

        

    }


    return (
        <div style = {containerStyle}>
            <Button style = {LogoutStyle} onClick = {() => logout()}>Logout</Button>
            <h1>Account Profile</h1>
            <h1>{user.email}</h1>
            <h1>You have been a user for {userSince()}</h1>
          
            {/*Time Line*/}
            <RecentlyViewed></RecentlyViewed>
           
        </div>
    )
}
