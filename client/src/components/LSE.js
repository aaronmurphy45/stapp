import React, {useState, useEffect} from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Input, Pagination, Button } from 'antd'
import { useGetStocksQuery, useGetStockQuoteQuery } from '../services/stockListAPI'
import LSE2  from './LSE2'
//import { useGetStocksQuery } from '../services/yahooRecommmend';

export default function LSE(state) {
    
   // const count = simplified ? 10: 100;

    const [country, setCountry] = React.useState("");
    const [exchange, setExchange] = React.useState("");
    const [searchTerm, setSearchTerm] = useState('');
    const [symbol, setSymbol] = React.useState("SHEL,AZN,RIO,BP,HSBA,VOD");
    const [stocks, setStocks ] = React.useState([])
    const [currentarray, setCurrentarray] = React.useState();
    const [simplified, setSimplified] = React.useState(false);
    state = {
        current: 3,
      };
    
    const format = "json";
    var array = [];
    var {data :stocksList, isFetching, error } = useGetStockQuoteQuery({symbol});
    //const {data :stocksList, isFetching } = useGetStocksQuery({country, symbol, format, type});
   
    if (!isFetching){
        console.log(stocksList)
        array = Object.values(stocksList)
        console.log(array)
        stocksList = array
        console.log(stocksList)

    //console.log(data)

    //const isFetching = false;
   // const stocksList=[]
    //const isFetching = false;
    //const stocksList = ["123", "456", "789"];
    
    
   
    if (!isFetching) {
    if (currentarray === undefined) {
        setCurrentarray(stocksList.slice(0, 10))
    }
    var chunkedStocks = stocksList.reduce((chunks, stock, index) => { 
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
        
    }

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
    
    

    if (simplified){
        console.log(stocksList)

    //console.log(data)

    //const isFetching = false;
   // const stocksList=[]
    //const isFetching = false;
    //const stocksList = ["123", "456", "789"];
    
    
   
    
    }
    const onChange = page => {
        console.log(page);
        setCurrentarray(chunkedStocks[page-1])
        console.log(currentarray)
        
      };

    const ChangeView  = () => {
        setSimplified(!simplified)
    }



    useEffect(()=> { 
        //setCryptos(cryptosList?.data?.coins)
        const filteredData = stocksList?.data?.filter((stock)=> stock.name.toLowerCase().includes(searchTerm.toLowerCase()))

        //const filteredData = stocksList?.filter((stock)=> stock.name.toLowerCase().includes(searchTerm.toLowerCase()))



        setStocks(filteredData)


    }, [stocksList, searchTerm])
    
    if (isFetching){
        return 'Loading...'
    }
    if(error){
        return (
            <div> <h1>Error</h1>
                </div>
        )
        }
    return (
        <> 

            {simplified ? <LSE2></LSE2> :  <div>
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
                                    Price: {(stock.close)} <br/>
                                    Change: {(stock.change)}  <br/>
                                    Currency: {(stock.currency)} <br/>
                                    High/Low: <br/>{(stock.high)}/{(stock.low)}
                                </p>
                            </Card>
                        
                    </Col>
                ))}
            </Row></div>}
            <Button style = {{width:"100%"}} onClick = {ChangeView}>{simplified ? "View Top 10" : "View All"}</Button>
        </>
    )
}
