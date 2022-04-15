import React, {useState, useEffect} from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Line } from 'react-chartjs-2'
import { Card, Row, Col, Input, Pagination } from 'antd'
import { useGetStockTimeSeriesQuery } from '../services/stockTimeSeriesAPI'
import { useGetStocksTrendingQuery, useGetStockDataQuery,  useGetStockBusinessDetailsQuery, useGetStockInfoQuery, useGetStockSparkQuery } from '../services/yahooRecommmend'
import { stockListApi } from '../services/stockListAPI'
import { useGetStockQuoteQuery } from '../services/stockListAPI'
import { Spin } from 'antd';
import { LineChartOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons'
import ReactTooltip from 'react-tooltip';



import { useGetCryptoPriceHistoryQuery } from '../services/cryptoAPI'


import { CaretDownOutlined } from '@ant-design/icons'
import { CaretUpOutlined } from '@ant-design/icons'
import { blue } from '@material-ui/core/colors'
import { Button } from 'antd'
import { Chart } from '.'
import { addFavourites } from '../services/favouritesActions'
import { mdiCardsHeart } from '@mdi/js';
import { useAuthState } from 'react-firebase-hooks/auth'
import {auth} from '../firebase/firebase-config'
import { Icon } from '@mdi/react'
import {trending} from './aJSON/trending'
import { spark } from './aJSON/spark'
import {crypto} from './aJSON/crypto'
import { useGetTrendingQuery } from '../services/yhFin'
import Chart2  from './Chart2'
import { Modal} from 'antd'


import { currencySymbol, currencyX } from './User'

import { UpCircleOutlined, DownCircleOutlined } from '@ant-design/icons'


export default function MostPopular(props) {


    //console.log(props.simplified)
    const simplified = props.simplified;
    const [pageNumber, setPageNumber] = useState(0)
    const insstock  = [];
    const count = simplified ? 10: 100;
    const [shownStocks , setShownStocks] = React.useState([]);
    const [country, setCountry] = React.useState("");
    const [exchange, setExchange] = React.useState("");
    const [symbol, setSymbol] = React.useState("AAPL,EUR/USD,ETH/BTC,TSLA,FB,AMZN,ETH/USD");
    const [interval, setInterval] = React.useState("1h");
    const [region, setRegion] = React.useState("US");
    const [isModalVisible , setIsModalVisible] = React.useState(false);
    
    const [type, setType] = React.useState("");
    const format = "json";
    const [xf, setXf] = React.useState(7);
    //const {data :stocksList, isFetching } = useGetStocksTrendingQuery({region: region});
    const [stocks, setStocks ] = React.useState([])
    const [stockstring, setStockstring] = React.useState("");
    const [stockArrary, setStockArrary] = React.useState([]);
    const [stockData, setStockData] = React.useState([]);
    var color = "grey"


    //const { datax , isFetching } = useGetCryptoPriceHistoryQuery({ coinId : "Qwsogvtv82FCd", timepriod : "1d" })
    //console.log(datax)
    //const {data : trendingStocks, isFetching0, error1 } = useGetTrendingQuery();
    var x =[];
    var currentStockList =[];

    const trendingStocks = trending;
    const isFetching = false;
    const error1 = false;
    console.log(trendingStocks)


    var stockList1 = []
    var stockList2 = []
    var stockname1 = ""
    var stockname2 = "" 
    var stockname3 = ""
 
    if (trendingStocks) {
        let c = 0;
        let x1 = [];
        let x2 = [];
        let x3 = [];
        trendingStocks?.finance?.result[0]?.quotes?.forEach(element => {
            if (c < xf) {
                x1.push(element)
                if (c!=(xf-1)) {
                stockname1 = stockname1 + element.symbol + ","
                }
                else {
                    stockname1 = stockname1 + element.symbol
                }
                
                c++;
            }
            else if (c < ((xf*2))) {
                if ( c < xf*2-1) {
                    stockname2 = stockname2 + element.symbol + ","
                }
                else{
                    stockname2 = stockname2 + element.symbol
                }
               
                x2.push(element)
                c++;
            }
            else if (c < ((xf*3))) {
                if ( c < xf*3-1) {
                    stockname3 = stockname3 + element.symbol + ","
                }
                else{
                    stockname3 = stockname3 + element.symbol
                }
               
                x3.push(element)
                c++;
            }
                
        });

        stockList1 = x1;
        stockList2 = x2;
       
        currentStockList = stockList1;
    
       
    }

    





    


  
    // split trending stocks in 2

    
    const [trendingStocks1, setTrendingStocks1] = React.useState([]);
    const [trendingStocks2, setTrendingStocks2] = React.useState([]);


    const stockList = [];

    //const { data: stockList, isFetching } = useGetStockQuoteQuery(symbol);

    //const { data: stocksTimeSeries, isFetching2, error2 } = useGetStockTimeSeriesQuery({symbol: shownStocks, interval: interval});
    


    //console.log(stocksTimeSeries)
    

    const showModal = (symbol) => {
        setSymbol(symbol)
       
        setIsModalVisible(true);
      };



    if (stockList) {
       var arrayObject = Object.values(stockList);
  
    }
   
   


    /*
    const stcok = [];
    stocksList?.data?.map((stock)=> (
        stcok.push(stock)
        
    ))
    setStocks(stcok)
    */


    
    //onsole.log(state)
   
    
    let stocksa = "";
    if (stockArrary.length == 0){
    const stocksx = trending?.finance?.result[0]?.quotes?.forEach((stock)=> (
        
        stockArrary.push(stock.symbol),
        stocksa = stocksa + stock.symbol + "," 
        
        
        
    ))}
    

    useEffect(() => {
        setShownStocks(stockList1)

    }, [stockname1])
    
        

    function name(params) {
        //split array into 10's
    }
    /*
    if (stocksTimeSeries){
        var arrayObject2 = Object.values(stocksTimeSeries)
        console.log(arrayObject2)

    
    }
    */

    var timestamp = []
    var close = []
   

    const [searchTerm, setSearchTerm] = useState('')

    
    const [stocks2, setStocks2 ] = React.useState([])

    stocksa = ""
    //const {data :stockList2 , isFetching2 } = useGetStocksTrendingQuery({});
    var vi = 0;
    while (vi < 10) {
        
      
        if (vi == 9) {
            stocksa = stocksa + stockArrary[vi]
            vi++;
        } else {
        stocksa = stocksa + stockArrary[vi] + ","
        vi++;
        }
    }

    const Load = () => {
        setShownStocks(stockList1)
    }
    const onChange = page => {
       switch (page) {
              case 1:
                  currentStockList = stockList1;
                    setShownStocks(stockList1);
                    break;
                case 2:
                    currentStockList = stockList2;
                    setShownStocks(stockList2);
                    break;
                case 3:
                default:
                    currentStockList = stockList2;
                    setShownStocks(stockList2);
                    break;
            }
        
      };

    //const half = splitString(stocksa)
    //console.log(half.length)
    
    //const {data : stockList3, isFetching3 } = useGetStockSparkQuery({symbol: stocksa});
    const stockList3 = spark;
    const isFetching3 = false;
   


    const handleOk = () => {
        setIsModalVisible(false);
      };
    
      const handleCancel = () => {
        setIsModalVisible(false);
      };




   
    //console.log(stocksList2)
  //  console.log(stockList3)
    



    // use treding from api.
        /*
    useEffect(()=> { 
        // add new trending stocks to the list
        //const filteredData = stocksList?.data?.filter((stock)=> stock.toLowerCase().includes(searchTerm.toLowerCase()))
        const filteredData = stocksList?.data?.map((stock)=> stock.symbol)
       
        setStocks(filteredData)
    }, [stocksList, searchTerm])
*/


    const [user] = useAuthState(auth)
    const uid = user.uid
/*
    if (stocksTimeSeries){
        x = Object.values(stocksTimeSeries);
    }
    */
    if (error1){
        return <div>Error</div>
    }

    if (shownStocks.length == 0){
        return <div>Error Loading Most Popular</div>
    }

    
    return (
        <> 

       
      
            <ReactTooltip />
            <Modal title="" visible={isModalVisible} okButtonProps={{ hidden: true }}
            cancelButtonProps={{ hidden: true }} onOk={handleOk} onCancel={handleCancel}>
                <Chart2 symbol = {symbol}></Chart2>
            </Modal>
            <Row gutters = {[32,32]} className = "crypto-card-container">

                {shownStocks?.map((stock)=> {

                    if (stock.changePercent > 0) {
                        color = "green"
                    } else {
                        color = "red"
                    }
                    return (
                        <Col xs ={12} sm={8} lg={4} className ="crypto-card" style = {{border : "1px solid" + color}}>
                        <Button  style = {{width:"50%"}} onClick={()=> addFavourites(stock.symbol, uid)} data-tip="Add to Favourites">
                        <HeartFilled style = {{color: "black"}}/>

                        </Button>

        
                    
                        <Button  style = {{width:"50%"}}onClick={()=>showModal(stock.symbol)} data-tip="View Chart">
                            <LineChartOutlined></LineChartOutlined>
                        </Button>
                        
                        {/*
                            (error2 || x[0]?.status == "error")  ? <div>No Chart Data</div> :
                            arrayObject2?.map(element => {
                              
                               
                                if (element?.symbol == stock.symbol) {
                                    console.log("kdhvbchjbc")
                                    element?.values?.forEach(element2 => {
                                        timestamp.push(element2.datetime)
                                        close.push(element2.close)
                                       

                                    })
                                    let bri = timestamp;
                                    let clo = close;
                                    timestamp = []
                                    close = []
                                    
                                    return  <Chart style = {{width: "100vh"}} symbol = {stock.symbol} timestamp = {bri } close = {clo} />
                                }
                            })
                        */}
                            
                        <Link to = {`/stock/${stock.symbol}`}> 
                            <Card 
                            title = { `${stock.shortName} (${stock.symbol}) `}
                            >
                                 <div><b>{currencySymbol}{(stock.regularMarketPrice*currencyX).toFixed(2)}</b></div>  
                                <p><div>{(stock.regularMarketChangePercent > 0 ? <UpCircleOutlined  style = {{color: "green"}}/> : <DownCircleOutlined style = {{color: "red"}}/>)} {stock.regularMarketChangePercent}%</div>
                                    Change: {(stock.regularMarketChange.toFixed(2))} <br/>
                                    Price: {currencySymbol}{stock.regularMarketPrice*currencyX} <br/>
                                    Symbol: {(stock.symbol)} <br/>
                                    Trendding Score: {stock.trendingScore.toFixed(2)} <br/>
                                </p>
                            </Card>
                        </Link>
                        
                    </Col>
                    )
    })}
            </Row>
            <div>
                {simplified ? (
                    <>
                   
                    </>
                ) : (
                    <div>
                        <Pagination onLoad = {Load} defaultCurrent={1} total={30} onChange={onChange} />
                    </div>
                )}
            </div>


        </>
    )
}
