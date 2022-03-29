import React, {useState, useEffect} from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Input, Pagination } from 'antd'
import { useGetStocksQuery, useGetStockQuoteQuery } from '../services/stockListAPI'
//import { useGetStocksQuery } from '../services/yahooRecommmend';

export default function NYSE2(state) {

   // const count = simplified ? 10: 100;
    const [country, setCountry] = React.useState("");
    const [exchange, setExchange] = React.useState("NYSE");
    const [searchTerm, setSearchTerm] = useState('');
    const [symbol, setSymbol] = React.useState("");

    const [type, setType] = React.useState("");
    state = {
        current: 3,
      };
    
    const format = "json";
    
    const {data :stocksList, isFetching } = useGetStocksQuery({country, symbol, format, type});

    

    /*
    const [stocksList, setStocksList] = useState([
        {
        "symbol":"AACG",
        "name":"ATA Creativity Global",
        "currency":"USD",
        "exchange":"NASDAQ",
        "country":"United States",
        "type":"Depositary Receipt",
    }, 
    {
        "symbol":"AACI",
        "name":"Armada Acquisition Corp. I",
        "currency":"USD",
        "exchange":"NASDAQ",
        "country":"United States",
        "type":"Common Stock"
    },
    {
        "symbol":"AACP",
        "name":"ATA Creativity Global",
        "currency":"USD",
        "exchange":"NASDAQ",
        "country":"United States",
        "type":"Depositary Receipt",
    }, 
    {
        "symbol":"AACT",
        "name":"Armada Acquisition Corp. I",
        "currency":"USD",
        "exchange":"NASDAQ",
        "country":"United States",
        "type":"Common Stock"
    },
    {
        "symbol":"AACU",
        "name":"ATA Creativity Global",
        "currency":"USD",
        "exchange":"NASDAQ",
        "country":"United States",
        "type":"Depositary Receipt",
    }, 
    {
        "symbol":"AACV",
        "name":"Armada Acquisition Corp. I",
        "currency":"USD",
        "exchange":"NASDAQ",
        "country":"United States",
        "type":"Common Stock"
    },
    {
        "symbol":"AACW",
        "name":"ATA Creativity Global",
        "currency":"USD",
        "exchange":"NASDAQ",
        "country":"United States",
        "type":"Depositary Receipt",
    }, 
    {
        "symbol":"AACX",
        "name":"Armada Acquisition Corp. I",
        "currency":"USD",
        "exchange":"NASDAQ",
        "country":"United States",
        "type":"Common Stock"
    },
    {
        "symbol":"AACZ",
        "name":"ATA Creativity Global",
        "currency":"USD",
        "exchange":"NASDAQ",
        "country":"United States",
        "type":"Depositary Receipt",
    }, 
    {
        "symbol":"AAEA",
        "name":"Armada Acquisition Corp. I",
        "currency":"USD",
        "exchange":"NASDAQ",
        "country":"United States",
        "type":"Common Stock"
    }, 
    {
        "symbol":"AAEC",
        "name":"ATA Creativity Global",
        "currency":"USD",
        "exchange":"NASDAQ",
        "country":"United States",
        "type":"Depositary Receipt",
    }, 
    {
        "symbol":"AAEE",
        "name":"Armada Acquisition Corp. I",
        "currency":"USD",
        "exchange":"NASDAQ",
        "country":"United States",
        "type":"Common Stock"
    },
    {
        "symbol":"AAEF",
        "name":"ATA Creativity Global",
        "currency":"USD",
        "exchange":"NASDAQ",
        "country":"United States",
        "type":"Depositary Receipt",
    },
    {
        "symbol":"AAEG",
        "name":"Armada Acquisition Corp. I",
        "currency":"USD",
        "exchange":"NASDAQ",
        "country":"United States",
        "type":"Common Stock"
    },
    {
        "symbol":"AAEH",
        "name":"ATA Creativity Global",
        "currency":"USD",
        "exchange":"NASDAQ",
        "country":"United States",
        "type":"Depositary Receipt",
    }, 
    {
        "symbol":"AAEI",
        "name":"Armada Acquisition Corp. I",
        "currency":"USD",
        "exchange":"NASDAQ",
        "country":"United States",
        "type":"Common Stock"
    },
    {
        "symbol":"AAEK",
        "name":"ATA Creativity Global",
        "currency":"USD",
        "exchange":"NASDAQ",
        "country":"United States",
        "type":"Depositary Receipt",
    },
    {
        "symbol":"AAEL",
        "name":"Armada Acquisition Corp. I",
        "currency":"USD",
        "exchange":"NASDAQ",
        "country":"United States",
        "type":"Common Stock"
    },
    {

        "symbol":"AAEM",


        "name":"ATA Creativity Global",
        "currency":"USD",
        "exchange":"NASDAQ",
        "country":"United States",
        "type":"Depositary Receipt",
    },
    {
        "symbol":"AAEN",
        "name":"Armada Acquisition Corp. I",
        "currency":"USD",
        "exchange":"NASDAQ",
        "country":"United States",
        "type":"Common Stock"
    },
    {
        "symbol":"AAEO",
        "name":"ATA Creativity Global",
        "currency":"USD",
        "exchange":"NASDAQ",
        "country":"United States",
        "type":"Depositary Receipt",
    },
    {
        "symbol":"AAEP",
        "name":"Armada Acquisition Corp. I",
        "currency":"USD",
        "exchange":"NASDAQ",
        "country":"United States",
        "type":"Common Stock"
    },
    {
        "symbol":"AAES",
        "name":"ATA Creativity Global",
        "currency":"USD",
        "exchange":"NASDAQ",
        "country":"United States",
        "type":"Depositary Receipt",
    },
    {
        "symbol":"AAET",
        "name":"Armada Acquisition Corp. I",
        "currency":"USD",
        "exchange":"NASDAQ",
        "country":"United States",
        "type":"Common Stock"
    },
    {
        "symbol":"AAEU",
        "name":"ATA Creativity Global",
        "currency":"USD",
        "exchange":"NASDAQ",
        "country":"United States",
        "type":"Depositary Receipt",
    },
    {
        "symbol":"AAEV",
        "name":"Armada Acquisition Corp. I",
        "currency":"USD",
        "exchange":"NASDAQ",
        "country":"United States",
        "type":"Common Stock"
    },
    {
        "symbol":"AAEW",
        "name":"ATA Creativity Global",
        "currency":"USD",
        "exchange":"NASDAQ",
        "country":"United States",
        "type":"Depositary Receipt",
    },   {
        "symbol":"AAEX",
        "name":"Armada Acquisition Corp. I",
        "currency":"USD",
        "exchange":"NASDAQ",
        "country":"United States",
        "type":"Common Stock"
    },
    {
        "symbol":"AAEY",
        "name":"ATA Creativity Global",
        "currency":"USD",
        "exchange":"NASDAQ",
        "country":"United States",
        "type":"Depositary Receipt",
    },
    {
        "symbol":"AAFA",
        "name":"Almaden Minerals Ltd.",
        "currency":"USD",
        "exchange":"NASDAQ",
        "country":"United States",
        "type":"Common Stock"
    },
    {
        "symbol":"AAFB",
        "name":"Almaden Minerals Ltd.",
        "currency":"USD",
        "exchange":"NASDAQ",
        "country":"United States",
        "type":"Common Stock"
    },
    {
        "symbol":"AAFC",
        "name":"Almaden Minerals Ltd.",
        "currency":"USD",
        "exchange":"NASDAQ",
        "country":"United States",
        "type":"Common Stock"
    },
    {
        "symbol":"AAFF",
        "name":"Almaden Minerals Ltd.",
        "currency":"USD",
        "exchange":"NASDAQ",
        "country":"United States",
        "type":"Common Stock"
    },
    {
        "symbol":"AAFG",
        "name":"Almaden Minerals Ltd.",
        "currency":"USD",
        "exchange":"NASDAQ",
        "country":"United States",
        "type":"Common Stock"
    },
    ])
    */

    console.log(stocksList)

    //console.log(data)

    //const isFetching = false;
   // const stocksList=[]
    //const isFetching = false;
    //const stocksList = ["123", "456", "789"];
    
    
    const [stocks, setStocks ] = React.useState([])
    const [currentarray, setCurrentarray] = React.useState();
    if (!isFetching) {
    if (currentarray === undefined) {
        setCurrentarray(stocksList.data.slice(0, 10))
    }
    var chunkedStocks = stocksList.data.reduce((chunks, stock, index) => { 
        const chunkIndex = Math.floor(index / 10);
        if (!chunks[chunkIndex]) {
            chunks[chunkIndex] = [];
        }
        chunks[chunkIndex].push(stock);
        return chunks;
    }, []);
    
    }


    



    

    const onChange = page => {
        console.log(page);
        setCurrentarray(chunkedStocks[page-1])
        console.log(currentarray)
        
      };

    useEffect(()=> { 
        //setCryptos(cryptosList?.data?.coins)
        const filteredData = stocksList?.data?.filter((stock)=> stock.name.toLowerCase().includes(searchTerm.toLowerCase()))

        //const filteredData = stocksList?.filter((stock)=> stock.name.toLowerCase().includes(searchTerm.toLowerCase()))



        setStocks(filteredData)


    }, [stocksList, searchTerm])
    
    if (isFetching){
        return 'Loading...'
    }
    return (
        <> 
        <Input placeholder = "Search" onChange = {(e)=> setSearchTerm(e.target.value)}></Input>
            
            <Row gutters = {[32,32]} className = "crypto-card-container">
                {currentarray?.map((stock)=> (
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
            <Pagination total={500} onChange ={onChange} />
        </>
    )
}
