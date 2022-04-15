import React, {useState, useEffect} from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Input } from 'antd'
import { useGetCryptosQuery } from '../services/cryptoAPI'
import { crypto } from './aJSON/crypto'
import { Chart } from 'react-chartjs-2'
import { useGetCryptoPriceHistoryQuery } from '../services/cryptoAPI'

export default function Cryptocurrencies({simplified }) {

    const count = simplified ? 10: 100;
    const {data :cryptosList, isFetching, error } = useGetCryptosQuery();
    //const {data , isFetching2, error} = useGetCryptoDetailsQuery("Qwsogvtv82FCd", "1d")
    //const { datax , isFetching2, error } = useGetCryptoPriceHistoryQuery({ coinId : "Qwsogvtv82FCd", timepriod : "1d" })

    console.log(error)

    console.log(cryptosList)
    console.log("cryptosList")
    console.log(cryptosList)


    console.log(isFetching)


    console.log(cryptosList);
    
    const [cryptos, setCryptos ] = React.useState([])

    const [searchTerm, setSearchTerm] = useState('')

    const [newCryptos , setNewCryptos] = React.useState([])
    const [bestCryptos, setBestCryptos] = React.useState([])


    
    
   
    //console.log(datax)

    useEffect(()=> { 
        //setCryptos(cryptosList?.data?.coins)
        console.log("useEffect")
        console.log(cryptosList)
        console.log(cryptosList?.data?.coins)
        setCryptos(cryptosList?.data?.coins)
        
        const filteredData = cryptosList?.data?.coins.filter((coin)=> coin.name.toLowerCase().includes(searchTerm.toLowerCase()))

        setNewCryptos(cryptosList?.data?.stats?.newestCoins)
        setBestCryptos(cryptosList?.data?.stats?.bestCoins)

        console.log(newCryptos)
        console.log(bestCryptos)


        setCryptos(filteredData)
    }, [cryptosList, searchTerm])

    return (
        <> {!simplified ? <div className = "search-crytpo">
    </div>
    : <div></div> }
            



                             

            <Row gutters = {[32,32]} className = "crypto-card-container">
                {cryptos?.map((currency)=> (
                    <Col xs ={24} sm={12} lg={4} className ="crypto-card" key ={currency.id}>

                        <Link to = {`/crypto/${currency.uuid}`}>
                            
                            <Card
                            title = { `${currency.rank}. ${currency.name}`}
                            extra = {<div><img style = {{zIndex:"-1"}} className = 'crypto-image' src = {currency.iconUrl}></img></div>}
                            hoverable
                            >   
                            
                                <p>Price: {millify(currency.price)}</p>
                                <p>Market Cap: {millify(currency.marketCap)}</p>
                                <p>Daily Change: {millify(currency.change)}</p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>




            <h1>Best Cryptos Today</h1>
            <Row gutters = {[32,32]} className = "crypto-card-container">
                {bestCryptos?.map((currency)=> (
                    <Col xs ={24} sm={12} lg={4} className ="crypto-card" key ={currency.id}>
                        <Link to = {`/crypto/${currency.uuid}`}>
                            <Card
                            title = { `${currency.symbol}. ${currency.name}`}
                            extra = {<img className = 'crypto-image' src = {currency.iconUrl}></img>}
                            hoverable
                            >
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>


            <h1>Newest Cryptos</h1>
            <Row gutters = {[32,32]} className = "crypto-card-container">
                {newCryptos?.map((currency)=> (
                    <Col xs ={24} sm={12} lg={4} className ="crypto-card" key ={currency.id}>
                        <Link to = {`/crypto/${currency.uuid}`}>
                            <Card
                            title = { `${currency.symbol}. ${currency.name}`}
                            extra = {<img className = 'crypto-image' src = {currency.iconUrl}></img>}
                            hoverable
                            >
                                
                            </Card>
                        </Link>
                    </Col>
                ))}
                
            
            </Row>

        </>
    )
}
