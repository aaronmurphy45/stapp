import React, {useState, useEffect} from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Input } from 'antd'
import { useGetStocksQuery } from '../services/stockListAPI'
//import { useGetStocksQuery } from '../services/yahooRecommmend';

export default function LSE(state) {

   // const count = simplified ? 10: 100;
    const [country, setCountry] = React.useState("");
    const [exchange, setExchange] = React.useState("");
    const [symbol, setSymbol] = React.useState("AAPL");
    const [type, setType] = React.useState("");
    const format = "json";
    //const {data :stocksList, isFetching } = useGetStocksQuery({country, symbol, format, type});
    const data = []
    const isFetching = true;
    const stocksList=[]
    //const isFetching = false;
    //const stocksList = ["123", "456", "789"];
    
    
    const [stocks, setStocks ] = React.useState([])

    const [searchTerm, setSearchTerm] = useState('');




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
                        
                    </Col>
                ))}
            </Row>
        </>
    )
}
