import { Button } from 'bootstrap';
import { use } from 'express/lib/router';
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth} from '../firebase/firebase-config';
import { logout } from '../firebase/firebase-config';
import { Timeline } from 'antd';

import { RecentlyViewed } from './RecentlyViewed';


export default function User() {

    const [user, loading] = useAuthState(auth);

    return (
        <div style = {{width: "100%", alignContent: "center", marginLeft: "30%"}}>
            <h1>{user.email}</h1>
            <button onClick = {() => logout()}>Logout</button>
            {/*Time Line*/}
            <RecentlyViewed></RecentlyViewed>
           
        </div>
    )
}
