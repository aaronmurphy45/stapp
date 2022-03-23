import React, {useState, useEffect} from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Input } from 'antd'
import { useGetStocksQuery } from '../services/stockListAPI'
import { Button } from 'antd'

export default function Stocks(state) {

    console.log("Stocks")
   // const count = simplified ? 10: 100;
    const [country, setCountry] = React.useState("");
    const [exchange, setExchange] = React.useState("NASDAQ");
    const [symbol, setSymbol] = React.useState("");
    const [type, setType] = React.useState("");
    const format = "json";
    const {data :stocksList, isFetching } = useGetStocksQuery({country, exchange, symbol, format, type});
    console.log(state)
    console.log(stocksList)
    
    const [stocks, setStocks ] = React.useState([])

    const [searchTerm, setSearchTerm] = useState('')
    console.log(stocks)

    const xAdd = (x) => {
        console.log(x)
        setStocks(x)
    }

    useEffect(()=> { 
        //setCryptos(cryptosList?.data?.coins)

        const filteredData = stocksList?.data?.filter((stock)=> stock.name.toLowerCase().includes(searchTerm.toLowerCase()))

        setStocks(filteredData)
    }, [stocksList, searchTerm])
    
    if (isFetching){
        return 'Loading...'
    }
    return (
        <> 
        <div style = {{backgroundColor: "purple"}}>
        <Input placeholder = "Search" onChange = {(e)=> setSearchTerm(e.target.value)}></Input>
            
            <Row gutters = {[32,32]} className = "crypto-card-container">
                {stocks?.map((stock)=> (
                    <Button onClick={()=> xAdd(stock.symbol)}>ADD</Button>,
                    <Col xs ={24} sm={12} lg={6} className ="crypto-card" key ={stock.id}>
                       
                            <Card 
                            title = { `${stock.name}`}
                            
                            >
                                <p>
                                    Exchange: {(stock.exchange)} <br/>
                                    Symbol: {(stock.symbol)}  <br/>
                                    Country: {(stock.country)}  <br/>
                                    Type: {(stock.type)} <br/>
                                    Currency: {(stock.currency)}
                                </p>
                            </Card>
                        {/*</Link>*/}
                        
                    </Col>
                ))}
            </Row>
            </div>
        </>

    )
}
