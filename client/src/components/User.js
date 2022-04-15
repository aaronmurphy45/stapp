import { Button, Modal } from 'antd';
import { use } from 'express/lib/router';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth} from '../firebase/firebase-config';
import { logout } from '../firebase/firebase-config';
import { Input, Timeline, Select } from 'antd';
import { useGetCurrencyConQuery } from '../services/stockListAPI';
import { Collapse } from 'antd';
import { RecentlyViewed } from './RecentlyViewed';
import Settings from './Settings';
import TermsAndConditions from './TermsAndConditions';
import defaultProfile from './defaultImage.jpeg';
import PrivacyPolicy from './PrivacyPolicy';
import { Link } from 'react-router-dom';

const { Panel } = Collapse;

//import { curencyList, currencyX, changeCurrency, currencySymbol2 } from '../services/currencyController';




const { Option } = Select;
const curencyList = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'SEK', 'NZD']

var currencySymbol = "$";
var currencySymbol2 = "USD";
var currencyX = 1;

export { currencyX, currencySymbol, currencySymbol2 };

export default function User() {

    function callback(key) {
 
      }
      const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;


    const [user, loading] = useAuthState(auth);
    const [isModalVisible, setIsModalVisible] = useState(false);


    const [currency, setCurrency] = useState('USD');
    const [rate , setRate] = useState(1);

 
    
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
        marginTop: "50px",
        padding: "10px"
    }

    const LogoutStyle = {
       
        boxShadow: "0px 0px 5px #000000",
        border: "1px solid #black",
        padding: "10px",
        height: "100%",
        width :"30%",
        margin: "10px",
        float: "right",
        fontSize: "1.5em",
        backgroundColor: "rgb(67,145,255)",
        color: "white"

        

    }
    const chCstyle = {
        width: "100%",
    }

    

    const changeCur = (e) => {
  
        
        setCurrency(e);
    }
    const { data } = useGetCurrencyConQuery(currency);
    const changeCurrency = (currency) => {

        if (currency?.symbol == "USD") {
            currencySymbol = "$";
            currencySymbol2 = "USD";
            currencyX = 1;
        }
        else if (currency?.symbol == "USD/EUR") {
            currencySymbol = "€";
            currencySymbol2 = "EUR";
            currencyX = currency?.rate;
        }
        else if (currency?.symbol == "USD/GBP") {
            currencySymbol = "£";
            currencySymbol2 = "GBP";
            currencyX = currency?.rate;
        }
        else if (currency?.base_currency_code == "USD/JPY") {
            currencySymbol = "¥";
            currencySymbol2 = "JPY";
            currencyX = currency?.rates?.JPY?.rate;
        }
        else if (currency?.symbol == "USD/CAD") {
            currencySymbol = "C$";
            currencySymbol2 = "CAD";
            currencyX = currency?.rate;
        }
        else if (currency?.symbol == "USD/AUD") {
            currencySymbol = "$";
            currencySymbol2 = "AUD";
            currencyX = currency?.rate;
        }
        else if (currency?.symbol == "USD/CHF") {
            currencySymbol = "Fr";
            currencySymbol2 = "CHF";
            currencyX = currency?.rates?.CHF?.rate;
        }
        else if (currency?.symbol == "USD/CNY") {
            currencySymbol = "¥";
            currencySymbol2 = "CNY";
            currencyX = currency?.rates
        }
        else if (currency?.symbol == "USD/SEK") {
            currencySymbol = "kr";
            currencySymbol2 = "SEK";
            currencyX = currency?.rate
        }
        else if (currency?.symbol == "USD/NZD") {
            currencySymbol = "$";
            currencySymbol2 = "NZD";
            currencyX = currency?.rate
        }
        else {
            currencySymbol = "$";
            currencySymbol2 = "USD";
            currencyX = 1;
        }

        currencyX = currency?.rate;
    
       
    }
    const showTerms = () => {
        setIsModalVisible(true);
    }

   useEffect(() => {
        changeCurrency(data);
        //setCurrency(data?.base_currency_code);
        setRate(data);
        

    }, [currency]);

    const accountInfoStyle = {
        width: "100%",
        height: "100%",
        margin: "10px",
        padding: "10px",
        backgroundColor: "white",
        borderRadius: "10px",
        boxShadow: "0px 0px 10px rgb(0,0,0,0.5)",
        border : "1px solid rgb(0,0,0,0.5)"

    }
    const changeStyle = {
        margin: '10px',
        padding: '10px',
        border : "1px solid rgb(0,0,0,0.5)",
        borderRadius: '5px',
        boxShadow: '0px 0px 5px #000000',
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
    
      }
    

    return (
        <div style = {containerStyle}>
            
            <Button style = {LogoutStyle} onClick = {() => logout()}>Logout</Button>
            <h1>Welcome,</h1>
            {user?.displayName ? 
            <h2>{user.displayName}</h2>
            :
            <h1>{user.email}</h1>
            }


            <Collapse accordian defaultActiveKey={null} onChange={callback}>
                <Panel header="Account Info" key="1">
                    <p style = {accountInfoStyle}>
                        { /* circular image */}

                        {user?.photoURL ?  <img src={user.photoURL} alt="profile" style={{ width: "100px", height: "100px", borderRadius: "50%", border: "1px solid black" }} />
                            : 
                            <img src={defaultProfile} alt="profile" style={{ width: "100px", height: "100px", borderRadius: "50%", border: "1px solid black" }} />
                        }
                       
                        <br></br>
                        <h3>Email: </h3>
                        {user?.email}
                        <h3>Display Name</h3>
                        {user?.displayName ? user.displayName : "Not Set"}
                        <h3>Phone Number</h3>
                        {user?.phoneNumber ? user.phoneNumber : "Not Set"}
                        <h3>Account Created:</h3>
                        {userSince() + " ago"}
                    </p>

               
                </Panel>
                <Panel header="Settings" key="2">
               <Settings></Settings>
               <div style = {changeStyle}>

               <h3>Change Currency</h3>
               <Select style = {chCstyle} onChange={(e) => changeCur(e)}
               defaultValue={currency}>
                {curencyList.map((item, index) => {
                    return <Option key={index} value={item}>{item}</Option>
                })}
        
            </Select>
            </div>
                </Panel>
                <Panel header="Recently Viewed" key="3">
                <RecentlyViewed></RecentlyViewed>
                </Panel>
                <Panel header="Terms And Conditions" key="4">
                <TermsAndConditions></TermsAndConditions>
                </Panel>
                <Panel header="Privacy Policy" key="5">
                <PrivacyPolicy></PrivacyPolicy>
                </Panel>
            </Collapse>
          
            {/*Time Line*/}
          
           
        </div>
    )
}
