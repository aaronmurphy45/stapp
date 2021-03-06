import React, {useState, useEffect} from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Input, Pagination, Button } from 'antd'
import { useGetStocksQuery, useGetStockQuoteQuery, useGetStockPriceQuery } from '../services/stockListAPI'
import NASDAQ2  from './LSE2'
import { Spin } from 'antd';
import { HeartFilled } from '@ant-design/icons'
import { addFavourites } from '../services/favouritesActions'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase/firebase-config'
import { LineChartOutlined } from '@ant-design/icons'
import Chart2 from './Chart2'
import { Modal } from 'antd'

//import { useGetStocksQuery } from '../services/yahooRecommmend';

export default function LSE(state) {
    
   // const count = simplified ? 10: 100;
    const [symbolx, setSymbolx] = useState("")
    const [country, setCountry] = React.useState("");
    const [exchange, setExchange] = React.useState("");
    const [searchTerm, setSearchTerm] = useState('');
    const [symbol, setSymbol] = React.useState("AAPL,MSFT,AMZN,FB,GOOGL,GOOG,TSLA,TWTR");
    const [stocks, setStocks ] = React.useState([])
    const [modalVisible, setModalVisible] = useState(false);
    const [currentarray, setCurrentarray] = React.useState();
    const [simplified, setSimplified] = React.useState(false);
    const { data , loading, error2} = useGetStockPriceQuery("NDAQ")


    state = {
        current: 3,
      };
    
    const format = "json";
    var array = [];
    var {data :stocksList, isFetching } = useGetStockQuoteQuery(symbol);
    const {data: nasdaq , isFetching2, error} = useGetStockQuoteQuery("NDAQ");
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
   
        setCurrentarray(chunkedStocks[page-1])

        
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

    
    const xAdd = (e) => {
       
        addFavourites(e,uid)
        
    }

    





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

            {simplified ? <NASDAQ2></NASDAQ2> :  <div>
          
            <Modal title="" visible={modalVisible} okButtonProps={{ hidden: true }}
                cancelButtonProps={{ hidden: true }} onOk={handleOk} onCancel={handleCancel}>
                <Chart2 symbol = {symbolx}></Chart2>
            </Modal>
            <div style = {{width:"60%", background:"white", alignItems:"center", textAlign:"center", padding:"10px", margin:"10px", boxShadow:"0px 0px 10px black"}}>
                <div style = {{width: "50%"}}>
                 <Chart2 kag symbol = {"NDAQ"}></Chart2>
                </div>
                <div style = {{width: "50%", }}>
                    <h1>
                    Live NASDAQ price : {data?.price}
                    </h1>
                </div>
           </div>
            <div>


            </div>
            <h1>NASDAQ STOCKS</h1>
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
