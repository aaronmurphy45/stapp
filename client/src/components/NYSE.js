import React, {useState, useEffect} from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Input, Pagination, Button, Spin } from 'antd'
import { useGetStocksQuery, useGetStockQuoteQuery } from '../services/stockListAPI'
import NYSE2  from './NYSE2'
import Chart2 from './Chart2'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase/firebase-config'
import { Modal } from 'antd'
import { LineChartOutlined } from '@ant-design/icons'
import { HeartFilled } from '@ant-design/icons'
import { addFavourites } from '../services/favouritesActions' 


//import { useGetStocksQuery } from '../services/yahooRecommmend';

export default function NYSE(state) {
    
   // const count = simplified ? 10: 100;

    const [country, setCountry] = React.useState("");
    const [exchange, setExchange] = React.useState("");
    const [searchTerm, setSearchTerm] = useState('');
    const [symbol, setSymbol] = React.useState("TWTR,WMT,PFE,XOM,C,BAC,IBM");
    const [stocks, setStocks ] = React.useState([])
    const [currentarray, setCurrentarray] = React.useState();
    const [simplified, setSimplified] = React.useState(false);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [symbolx, setSymbolx] = React.useState("") 



    state = {
        current: 3,
      };
    
    const format = "json";
    var array = [];
    var {data :stocksList, isFetching } = useGetStockQuoteQuery(symbol);
    //const {data :stocksList, isFetching } = useGetStocksQuery({country, symbol, format, type});
      
    if (!isFetching){
 
        array = Object.values(stocksList)
  
        stocksList = array
     

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


    const xAdd = (e) => {
        
        addFavourites(e,uid)
        
    }
    
    

    if (simplified){


    //console.log(data)

    //const isFetching = false;
   // const stocksList=[]
    //const isFetching = false;
    //const stocksList = ["123", "456", "789"];
    
    
   
    
    }
    const onChange = page => {

        setCurrentarray(chunkedStocks[page-1])
       
        
      };

    const ChangeView  = () => {
        setSimplified(!simplified)
    }

    const handleOk = () => {
        setModalVisible(false);
        };
    const handleCancel = () => {
        setModalVisible(false);
        };

    const [user] = useAuthState(auth);
    const uid = user.uid;


    const showModal = (symbol) => {
        setSymbolx(symbol)
        setModalVisible(true);
    };




    useEffect(()=> { 
        //setCryptos(cryptosList?.data?.coins)
        const filteredData = stocksList?.data?.filter((stock)=> stock.name.toLowerCase().includes(searchTerm.toLowerCase()))

        //const filteredData = stocksList?.filter((stock)=> stock.name.toLowerCase().includes(searchTerm.toLowerCase()))



        setStocks(filteredData)


    }, [stocksList, searchTerm])
    
    if (isFetching){
        return <Spin></Spin>
    }
    return (
        <> 
            <h1>New York Stock Exchange</h1>
            {simplified ? <NYSE2></NYSE2> :  <div>
            
            <Modal title="" visible={modalVisible} okButtonProps={{ hidden: true }}
                cancelButtonProps={{ hidden: true }} onOk={handleOk} onCancel={handleCancel}>
                <Chart2 symbol = {symbolx}></Chart2>
            </Modal>
            <Row gutters = {[32,32]} className = "crypto-card-container">
                {currentarray?.map((stock)=> (
                    <Col xs ={24} sm={12} lg={6} className ="crypto-card" key ={stock.id}>
                        <Button  style = {{width:"50%"}} onClick={()=> xAdd(stock.symbol)} data-tip="Add to Favourites">
                        <HeartFilled style = {{color: "black"}}/>
                        </Button>
                        <Button style = {{width:"50%"}}onClick={()=>showModal(stock.symbol)} data-tip="View Chart">
                            <LineChartOutlined></LineChartOutlined>
                        </Button>
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
