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
    

    const [favourites, setFavourites] = useState([]);

    /******* Change for JSON */
    //const {data : stockList3, isFetching3 } = useGetStockSparkQuery({symbol: favsx})

    const stockList3 = spark;
    if (stockList3){
        var arrayObject = Object.values(stockList3)
        
    }
    var favs = []

    //get auth and use as favourites
    const [user] = useAuthState(auth)
    const uid = user.uid


   
    

useEffect(() => {
    //get favourites
    const favs = xGet(uid)
 
    
    setFavourites(favs)


   
}, [uid])

useEffect(() => {
   
    
}, [favourites])

   

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
        const xz = getFavourites(uid)
        return xz
    }

    
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

   
    useEffect(()=> { 
        //setCryptos(cryptosList?.data?.coins)

        const filteredData = crypto?.data?.coins.filter((coin)=> coin.name.toLowerCase().includes(searchTerm.toLowerCase()))

        setCryptos(filteredData)
        // sort cryptos by high change

        const sortedData = filteredData?.sort((a,b)=> b.change - a.change)
        if (sortedData){
            if (simplified == true){
                //remove all but the top 10
                sortedData.reverse();
                setHighChange(sortedData.slice(0,8))
    
                //highchangex = sortedData.slice(0,10)
            }
            else {
                sortedData.reverse();
                setHighChange(sortedData)
            }
        }
        
        //highchangex = sortedData

        

    }, [crypto, searchTerm])
    
    return (

        <> {!simplified ? <div className = "search-crytpo">
        <Input style = {{width : "80%", marginLeft : "0%"}}placeholder = "Search" onChange = {(e)=> setSearchTerm(e.target.value)}></Input>
    </div>
    : <div></div> }
        
            <Row gutters = {[8,8]} className = "crypto-card-container">
                {arrayObject?.map((stock)=> (
                    <Col xs ={12} sm={8} lg={4} className ="crypto-card">
                        <Button onClick={()=> xDel(stock.symbol)}>DELETE</Button>
                        <Chart symbol = {stock.symbol} timestamp = {stock.timestamp } close = {stock.close} />
                        <Link to = {`/stock/${stock.symbol}`}> 
                            <Card 
                            title = { `${stock.symbol}`}
                            >
                                <p>
                                    Symbol: {(stock.symbol)} <br/>
                                    Previous Close: {(stock.close[stock.close.length-1])} 
                                </p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    )
}
