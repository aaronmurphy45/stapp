import React, {useState, useEffect} from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Input } from 'antd'
import { useGetStocksQuery } from '../services/stockListAPI'

export default function NYSE(state) {

    //const symbol = ["XOM", "C", "PFE", "JNJ", "JPM", "WMT", "VZ", "PG", "HD", "T", "UNH", "KO", "MCD", "MRK", "DIS", "PEP", "CSCO", "CMCSA", "C", "CAT", "CVX", "MMM", "AXP", "BA", "BAC", "BK", "CVS", "DD", "DDD", "DOW", "DVN", "EBAY", "EMC", "F", "FB", "GE", "GOOG", "GS", "HAL", "HPQ", "IBM", "INTC", "JNJ", "JPM", "KO", "MCD", "MRK", "MSFT", "NKE", "PEP", "PFE", "PG", "T", "TRV", "UNH", "UTX", "VZ", "WMT", "XOM"]

    console.log("Stocks")
   // const count = simplified ? 10: 100;
    const [country, setCountry] = React.useState("");
    const [exchange, setExchange] = React.useState("NYSE");
    const [symbol, setSymbol] = React.useState("");
    const [type, setType] = React.useState("");
    const format = "json";
    //const {data :stocksList, isFetching } = useGetStocksQuery({country, exchange, symbol, format, type});
    const stocksList = []
    const isFetching = true;
    console.log(state)
    console.log(stocksList)
    
    const [stocks, setStocks ] = React.useState([])

    const [searchTerm, setSearchTerm] = useState('')
    console.log(stocks)


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
        <Input placeholder = "Search" onChange = {(e)=> setSearchTerm(e.target.value)}></Input>
            
            <Row gutters = {[32,32]} className = "crypto-card-container">
                {stocks?.map((stock)=> (
                    <Col xs ={24} sm={12} lg={6} className ="crypto-card" key ={stock.id}>
                       {/* <Link to = {`'/crypto/${currency.id}'`}> */}
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
        </>
    )
}
