import React, {useState, useEffect} from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Input } from 'antd'
import { useGetCryptosQuery } from '../services/cryptoAPI'
import { crypto } from './aJSON/crypto'
import { Chart } from 'react-chartjs-2'

export default function Cryptocurrencies({simplified }) {

    const count = simplified ? 10: 100;
    //const {data :cryptosList, isFetching } = useGetCryptosQuery(count);
    const isFetching = false;
    const cryptosList = crypto;
    const [cryptos, setCryptos ] = React.useState([])

    const [searchTerm, setSearchTerm] = useState('')


    useEffect(()=> { 
        //setCryptos(cryptosList?.data?.coins)

        const filteredData = cryptosList?.data?.coins.filter((coin)=> coin.name.toLowerCase().includes(searchTerm.toLowerCase()))

        setCryptos(filteredData)
    }, [cryptosList, searchTerm])
    if (isFetching){
        return 'Loading...'
    }
    return (
        <> {!simplified ? <div className = "search-crytpo">
        <Input style = {{marginLeft: "20%", width:"80%"}} placeholder = "Search" onChange = {(e)=> setSearchTerm(e.target.value)}></Input>
    </div>
    : <div></div> }
            

                             

            <Row gutters = {[32,32]} className = "crypto-card-container">
                {cryptos?.map((currency)=> (
                    <Col xs ={24} sm={12} lg={6} className ="crypto-card" key ={currency.id}>

                        <Link to = {`/crypto/${currency.symbol}`}>
                            
                            <Card 
                            title = { `${currency.rank}. ${currency.name}`}
                            extra = {<img className = 'crypto-image' src = {currency.iconUrl}></img>}
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
        </>
    )
}
