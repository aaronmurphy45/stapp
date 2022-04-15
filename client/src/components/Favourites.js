import React, {useState, useEffect} from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Input, Button } from 'antd'
import { useGetCryptosQuery } from '../services/cryptoAPI'
import { Select } from 'antd'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useGetStockSparkQuery } from '../services/yahooRecommmend'
import { Spin, Modal } from 'antd';



import {addFavourites, deleteFavourites, getFavourites, favsx} from '../services/favouritesActions'
import Chart2  from './Chart2'
import { useGetStockQuoteQuery } from '../services/stockListAPI'
import { useGetStockTimeSeriesQuery } from '../services/stockListAPI'

import { faHeartCrack } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { auth } from '../firebase/firebase-config'

import {ref,dbs, getDatabase, child, get, storage, getDownloadUrl, db } from "../firebase/firebase-config"
import { set } from 'firebase/database'
import { spark } from './aJSON/spark'
import { crypto } from './aJSON/crypto'
import { UpCircleOutlined, DownCircleOutlined, LineChartOutlined } from '@ant-design/icons'
import ReactTooltip from 'react-tooltip'

import { currencySymbol, currencyX } from './User'

export default function Favourites({simplified}) {
    

    // const [user]= useAuth(auth)

    var x;
    //const {data :cryptosList, isFetching } = useGetCryptosQuery(100);
    const [cryptos, setCryptos ] = React.useState([])
    const [symbol, setSymbol] = React.useState("")

    const [searchTerm, setSearchTerm] = useState('')
    let highchangex = [];
    const [isModalVisible, setIsModalVisible] = useState(false);

    var color;

    const [highChange, setHighChange] = useState();
    var check = false;
    
    var fav;
    const [favourites, setFavourites] = useState([]);

    const [interval , setInterval] = React.useState("1h");

    



    /******* Change for JSON */
    //const {data : stockList3, isFetching3 } = useGetStockSparkQuery({symbol: favsx})

    //const stockList3 = spark;
    
    var favs = []

    //get auth and use as favourites
    const [user] = useAuthState(auth)
    const uid = user.uid

    var favsv;
   
    

    
        const db = dbs.ref(`Users/-MxJXOWOc4gpZU10vKMb/${uid}/favourites`)
        db.once('value', function(snapshot) {
            const favs = snapshot.val()
    
            if (favs == undefined || favs == null || (favs.length == 0 && favs[0] == 'EMPTY')) {
                 console.log("No favourites")
            }
            else {
                favsv = favs
                // turn array into string
                favsv = favsv.join(',')
    
                setFavourites(favsv)
                
                
            } 
        })



        const { data: stocksList, isFetching, error } = useGetStockQuoteQuery(favourites);
        //const { data: stocksTimeSeries, isFetching2, error2 } = useGetStockTimeSeriesQuery({symbol: favourites, interval: interval});

        //console.log(stocksTimeSeries)

        //const { data2, isFetching2 } = useGetStockTimeSeriesQuery({symbol: favourites, interval: interval});
 

       var timestamp = []
        var close = []
    

        if (stocksList){
            var arrayObject = Object.values(stocksList)
        }
        /*
        if (stocksTimeSeries){
            var arrayObject2 = Object.values(stocksTimeSeries)
            console.log(arrayObject2)
    
        
        }
        */
        //console.log(stocksList)

        const handleOk = () => {
            setIsModalVisible(false);
          };
        
          const handleCancel = () => {
            setIsModalVisible(false);
          };

        


   

    /*
    const AddFavourites = () => {
        
        const db = dbs.ref(`Users/-MxFDVJQQsUZohLinzaG/${uid}`)
        //console.log(db)

        //dbs.ref(`Users`).push(obj)

        const newvalue = "NEO"
        db.once('value', function(snapshot) {
           favs = snapshot.val().favourites
           if (favs == undefined || favs == null) {
            dbs.ref(`Users/-MxFDVJQQsUZohLinzaG/${uid}/favourites`).update([newvalue])
            }
            
            else {
                if (favs.length == 1 && favs[0] == 'EMPTY') {
                    favs.pop()
                    favs.push(newvalue)
                }
                else {
                    if (favs.includes(newvalue)) {
                        alert("Already in favourites")
                    }
                    else {
                        favs.push(newvalue)
                    }
                }
                console.log(favs)
                dbs.ref(`Users/-MxFDVJQQsUZohLinzaG/${uid}/favourites`).update(favs)

                }
        })
            
        

            
    }
    */
    
    //AddFavourites("BTC")
    /*
    function xFavs(symbol){
        addFavourites(uid)
    }

    const DeleteFavourites = (symbol) => {
        const searchTerm = symbol
        const db = dbs.ref(`Users/-MxFDVJQQsUZohLinzaG/${uid}/favourites`)
        db.once('value', function(snapshot) {
            const favs = snapshot.val()
            console.log(favs)
            if (favs == undefined || favs == null || (favs.length == 0 && favs[0] == 'EMPTY')) {
                alert("No favourites to delete")
            }
            else {
                    if (favs.includes(searchTerm)) {
                        favs.splice(favs.indexOf(searchTerm), 1)
                    }
                    else {
                        alert("Not in favourites")
                    }
                }
                if (favs.length == 0) {
                    favs.push('EMPTY')
                }
                dbs.ref(`Users/-MxFDVJQQsUZohLinzaG/${uid}/favourites`).set(favs)
            
        })
        GetFavourites()
       
    }
    */

    

    

    function xAdd(symbol){
        addFavourites(uid)
    }
    const xDel = (symbol) => {
        deleteFavourites(uid, symbol)
    }
    const xGet = (uid) => {
        xz = getFavourites(uid)
   
        
        return xz
    }
    var xz
    //get favourites
  
    //var fav = favsx(uid)


    
   
 


    


    
    // array to string 
    const arrayToString = (array) => {
        let string = ""
        for (let i = 0; i < array.length; i++) {
            string += array[i]
            if (i != array.length - 1) {
                string += ","
            }
        }
        return string
    }
    if (error){
        return <div>Error</div>

    }
    /*
    while (error2){
        return <div>Error</div>
    }
    */
   

    const showModal = (symbol) => {
        setSymbol(symbol)

        setIsModalVisible(true);
      };

   
    if  (isFetching) {
        return <Spin></Spin>
    }

    if (arrayObject[0] == 400 || arrayObject == null){
        return <div>No favourites</div>
    }


    
    
    
    return (
        <> {!simplified ? <div className = "search-crytpo">
    </div>
    : <div></div> }
        <h1>Favourites</h1>
            <ReactTooltip />
            <Row gutters = {[8,8]} className = "crypto-card-container">
            <Modal title="" visible={isModalVisible} okButtonProps={{ hidden: true }}
          cancelButtonProps={{ hidden: true }} onOk={handleOk} onCancel={handleCancel}>
                <Chart2 symbol = {symbol}></Chart2>
            </Modal>
            
                {arrayObject?.map((stock)=> (
                
        
                
                <Col xs ={2} sm={2} lg={4} className ="crypto-card"> 
                   
                        <Button style = {{width:"50%"}}onClick={()=> xDel(stock.symbol)} data-tip="Delete from Favourites">
                            <FontAwesomeIcon icon={faHeartCrack} />
                        </Button>
                    
                        <Button style = {{width:"50%"}}onClick={()=>showModal(stock.symbol)} data-tip="View Chart">
                            <LineChartOutlined></LineChartOutlined>
                        </Button>
                        
                        
                        {/*
                            arrayObject2?.map(element => {
                                console.log(element)

                                if (element==400){
                                    return <div>Error</div>
                                }
                                if (element.meta?.symbol == stock.symbol) {
                                    element?.values?.forEach(element2 => {
                                        timestamp.push(element2.datetime)
                                        close.push(element2.close)
                                        console.log(element2)

                                    })
                                    let bri = timestamp;
                                    let clo = close;
                                    timestamp = []
                                    close = []
                                    
                                    return  <Chart style = {{width: "100vh"}} symbol = {stock.symbol} timestamp = {bri } close = {clo} />
                                }
                                
                            })
                        */}
                        <Link to = {`/stock/${stock.symbol}`}> 
                            <Card 
                                 style={{overflow:"visible"}} title = { `${stock.name} (${stock.symbol}) \n\n `}>
                                      <div><b>{currencySymbol}{(stock.close*currencyX).toFixed(2)}</b></div>  
                                <p><div>{(stock.percent_change > 0 ? <UpCircleOutlined  style = {{color: "green"}}/> : <DownCircleOutlined style = {{color: "red"}}/>)} {stock.percent_change}%</div>
                               
                                    Change: {(stock.change)} <br/>
                                    Change Percent: {(stock.percent_change)}% <br/>
                                    Symbol: {(stock.symbol)} <br/>
                                    Price: {currencySymbol}{(stock.close*currencyX)} <br/>

                                   
                                </p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    )
}
