
import React from 'react'
import { useState } from 'react'
import { useGetCryptosQuery } from '../services/cryptoAPI'
import { useEffect } from 'react'
import { logout } from '../firebase/firebase-config'
import { Button, Menu , Typography , Avatar}  from 'antd'


import {Trail} from 'react-spring'
import { ConsoleSqlOutlined } from '@ant-design/icons';


import { CaretDownOutlined } from '@ant-design/icons';
import { CaretUpOutlined } from '@ant-design/icons';
import { IdcardTwoTone } from '@ant-design/icons';
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { useGetStockSparkQuery, useGetStocksTrendingQuery, useGetStockQuoteQuery } from '../services/yahooRecommmend'

import { auth } from "../firebase/firebase-config";

import {trending} from './aJSON/trending'
import { spark } from './aJSON/spark'
import {crypto} from './aJSON/crypto'

export default function NavBar2(props) {

     
   
    const count = 100;
   
    //cryptos
    //const { data: stocks, isFetching } = useGetCryptosQuery(count);
    const stocks = crypto;
    
    //most popular
    const [region, setRegion] = React.useState("US");
    //const {data :stocks, isFetching } = useGetStocksTrendingQuery({region: region});

    var stockArrary = [];

    let stocksa = "";
    if (stockArrary.length == 0){
    //const stocksx = stocks?.finance?.result[0]?.quotes?.forEach((stock)=> (
    const stocksx = stocks?.data?.coins.forEach((stock)=> (    
        stockArrary.push(stock.symbol)
        //stocksa = stocksa + stock.symbol + "," 
        
        
        
    ))}


        

    var vi = 0;
    while (vi < 3) {
        

        if (vi == 2) {
            stocksa = stocksa + stockArrary[vi]
            vi++;
            
        } 
        else {
        stocksa = stocksa + stockArrary[vi] + ","
        vi++;
        }
    }




    

    
    //const {data : stockList3, isFetching3 } = useGetStockSparkQuery({symbol: stocksa});
    //const { data: stockList3, isFetching3 } = useGetStockQuoteQuery({symbol: stocksa});


 

    if (spark){
        var arrayObject = Object.values(spark)
    }
 

    
   /*
   const [region, setRegion] = React.useState("US");
   const insstock  = [];
   const [stockArrary, setStockArrary] = React.useState([]);
    const {data :stocksList, isFetching } = useGetStocksTrendingQuery({region: region});
    let stocksa = "";
    if (stockArrary.length == 0){
    const stocksx = stocksList?.finance?.result[0]?.quotes?.forEach((stock)=> (
        
        stockArrary.push(stock.symbol),
        stocksa = stocksa + stock.symbol + "," 
        
        
        
    ))}
    
    console.log(stockArrary)
        

    function name(params) {
        
        //split array into 10's


        
        

    }
   
    console.log(insstock)
    const [searchTerm, setSearchTerm] = useState('')

    
    const [stocks2, setStocks2 ] = React.useState([])

    stocksa = ""
    //const {data :stockList2 , isFetching2 } = useGetStocksTrendingQuery({});
    var vi = 0;
    while (vi < 1) {
        console.log(stockArrary[vi])
        if (vi == 0) {
            stocksa = stocksa + stockArrary[vi]
            vi++;
        } else {
        stocksa = stocksa + stockArrary[vi] + ","
        vi++;
        }
    }
    console.log(stocksa)
    //const half = splitString(stocksa)
    //console.log(half.length)
    */

    /***CHANGE FOR JSON DATA  */
    //const {data : stockList3, isFetching3 } = useGetStockQuoteQuery({symbol: stocksa});
    const x = "quote"
    
    //const {data : stockList4, isFetching4 } = getData(x);
    //const [stockList3, setStockList3] = React.useState([])

    


    const Logout = () => {
        //history("/homepage");
        window.location = "/";
        logout();
    }
   


    

    

    
   
    //onst [z, setZ] = React.useState(0);
    const [colorx, setColorx] = React.useState("green");
    const [colory, setColory] = React.useState("green");
    const [colorz, setColorz] = React.useState("green");
   
    const [colora, setColora] = React.useState("green");
    const [colorb, setColorb] = React.useState("green");
    const [colorc, setColorc] = React.useState("green");
    const [colord, setColord] = React.useState("green");
    const [cryptos, setCryptos] = React.useState([])
    const [currentstock, setCurrentstock] = React.useState({name:"", price:"", change:0})
    const [currentstock2, setCurrentstock2] = React.useState({name:"", price:"", change:0})
    const [currentstock3, setCurrentstock3] = React.useState({name:"", price:"", change:0})
    const [currentstock4, setCurrentstock4] = React.useState({name:"", price:"", change:0})
    const [currentstock5, setCurrentstock5] = React.useState({name:"", price:"", change:0})
    const [currentstock6, setCurrentstock6] = React.useState({name:"", price:"", change:0})
    const [currentstock7, setCurrentstock7] = React.useState({name:"", price:"", change:0})
    

    let z = 0

    //const stocks = []
    const [user, loading, error] = useAuthState(auth);
    
    const barstyle = {

        borderBottom: "3px solid rgb(65,143,247)",
        paddingTop: "10px",
        backgroundColor: "rgb(65,143,247)",
        width: "100%",
        alignItems: "horizontal",
        height: "100px",
        fontSize: "5px",
        textAlign: "center",
        color: "white",
        

    }
    const linkcol = {
        color: "white",
        textDecoration: "none",
        fontSize: "20px",
        fontWeight: "bold",
        paddingLeft: "10px",
        paddingRight: "10px",
        paddingTop: "10px",
        paddingBottom: "10px",
        borderBottom: "3px solid rgb(65,143,247)",
    }
    const linkcol2 = {
        color: "white",
        textDecoration: "none",
        fontSize: "48px",
        fontWeight: "bold",
        paddingLeft: "10px",
        paddingRight: "10px",
        paddingTop: "10px",
        paddingBottom: "10px",
        borderBottom: "3px solid rgb(65,143,247)",
    }

    const blockstyle = {
        minWidth: "100px",
        display: "inline-block",
        marginLeft: "1%",
        padding : "10px",
        border: "1px solid black",
        borderRadius: "5px",
        backgroundColor : "white",
        marginBottom: "30px",
    }
    const textstyle = {
        color: colorx,
        borderColor: colorx,
        display: "inline-block",
    }
    const textstyle2 = {
        color: colory,
        borderColor: colory,
        display: "inline-block",
    }
    const textstyle3 = {
        color: colorz,
        borderColor: colorz,
        display: "inline-block",

    }
    const textstyle4 = {
        color: colora,
        borderColor: colora,
        display: "inline-block",
    }

    const textstyle5 = {
        color: colorb,
        borderColor: colorb,
        display: "inline-block",
    }
    const textstyle6 = {
        color: colorc,
        borderColor: colorc,
        display: "inline-block",
    }
    const textstyle7 = {
        color: colord,
        borderColor: colord,
        display: "inline-block",
       
    }
    const account = {
       
       top : "0px",
       right : "0px",
       position : "absolute",
        

    }

    const logo = {
        left: "10px",
        top: "10px",
        position: "absolute",  
    }


    


useEffect(() => {
 
  
        
        const interval = setInterval(() => {
            
            let obj = {
                name: stocks?.data?.coins[z].name,
                price: stocks?.data?.coins[z].price,
                change: stocks?.data?.coins[z].change
            }
            
            let obj2 = {
                name: stocks?.data?.coins[z+1].name,
                price: stocks?.data?.coins[z+1].price,
                change: stocks?.data?.coins[z+1].change
            }
            let obj3 = {
                name: stocks?.data?.coins[z+2].name,
                price: stocks?.data?.coins[z+2].price,
                change: stocks?.data?.coins[z+2].change
            }
            let obj4 = {
                name: stocks?.data?.coins[z+3].name,
                price: stocks?.data?.coins[z+3].price,
                change: stocks?.data?.coins[z+3].change
            }
            let obj5 = {
                name: stocks?.data?.coins[z+4].name,
                price: stocks?.data?.coins[z+4].price,
                change: stocks?.data?.coins[z+4].change
            }
            let obj6 = {
                name: stocks?.data?.coins[z+5].name,
                price: stocks?.data?.coins[z+5].price,
                change: stocks?.data?.coins[z+5].change
            }
            let obj7 = {
                name: stocks?.data?.coins[z+6].name,
                price: stocks?.data?.coins[z+6].price,
                change: stocks?.data?.coins[z+6].change
            }
            
            if (obj.change > 0) {
                setColorx("green")
            }

            else {
                setColorx("red")
            }
            if (obj2.change > 0) {
                setColory("green")
            }
            else{
                setColory("red")
            }
            if (obj3.change > 0) {
                setColorz("green")
            }
            else{
                setColorz("red")
            }
            if (obj4.change > 0) {
                setColora("green")
            }
            else{
                setColora("red")
            }
            if (obj5.change > 0) {
                setColorb("green")
            }
            else{
                setColorb("red")
            }
            if (obj6.change > 0) {
                setColorc("green")
            }
            else{
                setColorc("red")
            }
            if (obj7.change > 0) {
                setColord("green")
            }
            else{
                setColord("red")
            }
        
            setCurrentstock(obj);
            setCurrentstock2(obj2);
            setCurrentstock3(obj3);
            setCurrentstock4(obj4);
            setCurrentstock5(obj5);
            setCurrentstock6(obj6);
            setCurrentstock7(obj7);

         
            if (z>96) {
                z = 0
            }
            else {
                z++;
            }
            
        
        
        }, 5000);
    
        return () => clearInterval(interval);

     }, []);
    
     
   
    

    // This nav bar will be a conatntly rotationg navbar oif the stocks and prices
    return (

        <div>
        

        <div style = {barstyle}>
        <div style = {logo}>
            {/*   <Avatar src = {iconx} size ="large"></Avatar>*/ }
         
            <Typography.Title level = {2} >
                <Link style = {linkcol2}to = "/"> Stapp{/*<img src={iconx} alt={"logo"}/>*/}</Link>
            </Typography.Title>
        </div>
           <div className="moveleft" style = {blockstyle}>
            <h1 style = {textstyle}> {currentstock.change < 0 ? <CaretDownOutlined style = {{color: "red"}} /> : <CaretUpOutlined style = {{color: "green"}} />}  {currentstock.name}</h1>
            <br/>
            <h1 style={textstyle}>{parseFloat(currentstock.price).toFixed(4)}</h1>
           
            </div>
      
            <div className="moveleft" style = {blockstyle}>
            <h1 style = {textstyle2}> {currentstock2.change < 0 ? <CaretDownOutlined style = {{color: "red"}} /> : <CaretUpOutlined style = {{color: "green"}} />}  {currentstock2.name}</h1>
            <br/>
            <h1 style={textstyle2}>{parseFloat(currentstock2.price).toFixed(4)}</h1>
            </div>
        
            <div className="moveleft" style = {blockstyle}>
            <h1 style = {textstyle3}> {currentstock3.change < 0 ? <CaretDownOutlined style = {{color: "red"}} /> : <CaretUpOutlined style = {{color: "green"}} />}  {currentstock3.name}</h1>
            <br/>
            <h1 style={textstyle3}>{parseFloat(currentstock3.price).toFixed(4)}</h1>
           
            </div>

            <div className="moveleft" style = {blockstyle}>
            <h1 style = {textstyle4}> {currentstock4.change < 0 ? <CaretDownOutlined style = {{color: "red"}} /> : <CaretUpOutlined style = {{color: "green"}} />}  {currentstock4.name}</h1>
            <br/>
            <h1 style={textstyle4}>{parseFloat(currentstock4.price).toFixed(4)}</h1>
            </div>

            <div className="moveleft" style = {blockstyle}>
            <h1 style = {textstyle5}> {currentstock5.change < 0 ? <CaretDownOutlined style = {{color: "red"}} /> : <CaretUpOutlined style = {{color: "green"}} />}  {currentstock5.name}</h1>
            <br/>
            <h1 style={textstyle5}>{parseFloat(currentstock5.price).toFixed(4)}</h1>
            </div>
        

            <div className="moveleft" style = {blockstyle}>
            <h1 style = {textstyle6}> {currentstock6.change < 0 ? <CaretDownOutlined style = {{color: "red"}} /> : <CaretUpOutlined style = {{color: "green"}} />}  {currentstock6.name}</h1>
            <br/>
            <h1 style={textstyle6}>{parseFloat(currentstock6.price).toFixed(4)}</h1>
            </div>

            <div className="moveleft" style = {blockstyle}>
            <h1 style = {textstyle7}> {currentstock7.change < 0 ? <CaretDownOutlined style = {{color: "red"}} /> : <CaretUpOutlined style = {{color: "green"}} />}  {currentstock7.name}</h1>
            <br/>
            <h1 style={textstyle7}>{parseFloat(currentstock7.price).toFixed(4)}</h1>
            </div>

            <div className='usericon' style = {account}>
                <Link style = {linkcol} to = "/user">
                <IdcardTwoTone style = {{ fontSize: '48px', marginTop: "10px"}}/>
                <p style = {{ fontSize: '10px'}}>{user.email}</p>
                </Link>
            </div>

        
            {/*stocks?.data?.coins.map((currency)=> (
                <div className = "moveleft" style = {}>
                    <p>{currency.name}</p> 
                    <p>{currency.price}</p>
                </div>

            ))*/}
        
        </div>
        </div>
    )
}
