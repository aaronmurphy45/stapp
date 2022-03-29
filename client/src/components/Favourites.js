import React, {useState, useEffect} from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Input, Button } from 'antd'
import { useGetCryptosQuery } from '../services/cryptoAPI'
import { Select } from 'antd'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useGetStockSparkQuery } from '../services/yahooRecommmend'

import {addFavourites, deleteFavourites, getFavourites, favsx} from '../services/favouritesActions'
import Chart  from './Chart'
import { useGetStockQuoteQuery } from '../services/stockListAPI'
import { useGetStockTimeSeriesQuery } from '../services/stockListAPI'

import { auth } from '../firebase/firebase-config'

import {ref,dbs, getDatabase, child, get, storage, getDownloadUrl, db } from "../firebase/firebase-config"
import { set } from 'firebase/database'
import { spark } from './aJSON/spark'
import { crypto } from './aJSON/crypto'

export default function Favourites({simplified}) {
    

    // const [user]= useAuth(auth)

    var x;
    //const {data :cryptosList, isFetching } = useGetCryptosQuery(100);
    const [cryptos, setCryptos ] = React.useState([])

    const [searchTerm, setSearchTerm] = useState('')
    let highchangex = [];

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
            console.log(snapshot)
            console.log(favs)
            if (favs == undefined || favs == null || (favs.length == 0 && favs[0] == 'EMPTY')) {
                 console.log("No favourites")
            }
            else {
                favsv = favs
                console.log("this: "+ favsv)
                // turn array into string
                favsv = favsv.join(',')
                console.log(favsv)
                setFavourites(favsv)
                
                
            } 
        })



        const { data: stocksList, isFetching, error } = useGetStockQuoteQuery(favourites);
        const { data: stocksTimeSeries, isFetching2, error2 } = useGetStockTimeSeriesQuery({symbol: favourites, interval: interval});

        console.log(stocksTimeSeries)

        //const { data2, isFetching2 } = useGetStockTimeSeriesQuery({symbol: favourites, interval: interval});
        console.log(stocksList)

        const timestamp = []
        const close = []
    

        if (stocksList){
            var arrayObject = Object.values(stocksList)
        }
        if (stocksTimeSeries){
            var arrayObject2 = Object.values(stocksTimeSeries)
        
           
            console.log(timestamp)
            console.log(close)
    
        
        }
        //console.log(stocksList)

        

        


   

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
        console.log(xz)
        
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
        

   
    if  (isFetching) {
        return <div>Loading...</div>
    }
    
    return (
        <> {!simplified ? <div className = "search-crytpo">
        <Input style = {{width : "80%", marginLeft : "0%"}}placeholder = "Search" onChange = {(e)=> setSearchTerm(e.target.value)}></Input>
    </div>
    : <div></div> }
        
            <Row gutters = {[8,8]} className = "crypto-card-container">

                {arrayObject?.map((stock)=> (
                    <Col xs ={12} sm={8} lg={4} className ="crypto-card">
                        <Button onClick={()=> xDel(stock.symbol)}>DELETE</Button>
                        {
                            arrayObject2?.map(element => {
                                if (element.symbol == stock.symbol) {
                                    element?.values?.forEach(element2 => {
                                        timestamp.push(element2.datetime)
                                        close.push(element2.close)
                                    })
                                    
                                    return  <Chart symbol = {stock.symbol} timestamp = {stock.timestamp } close = {stock.close} />
                                }
                            })
                        }
                        <Link to = {`/stock/${stock.symbol}`}> 
                            <Card 
                            title = { `${stock.symbol}`}
                            >
                                <p>
                                    Symbol: {(stock.symbol)} <br/>
                                    Previous Close: {(stock.close)} <br/>
                                    Change: {(stock.change)} <br/>
                                    Change Percent: {(stock.percent_change)} <br/>
                                    Volume: {(stock.volume)} <br/>
                                   
                                </p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    )
}
