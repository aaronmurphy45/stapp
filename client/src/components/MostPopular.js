import React, {useState, useEffect} from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Line } from 'react-chartjs-2'
import { Card, Row, Col, Input } from 'antd'
import { useGetStockTimeSeriesQuery } from '../services/stockTimeSeriesAPI'
import { useGetStocksTrendingQuery, useGetStockDataQuery,  useGetStockBusinessDetailsQuery, useGetStockInfoQuery, useGetStockSparkQuery } from '../services/yahooRecommmend'
import { stockListApi } from '../services/stockListAPI'
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

export default function MostPopular({simplified}) {

    

    const [pageNumber, setPageNumber] = useState(0)
    const insstock  = [];
    const count = simplified ? 10: 100;
    const [country, setCountry] = React.useState("");
    const [exchange, setExchange] = React.useState("");
    const [symbol, setSymbol] = React.useState("AAPL,EUR/USD,ETH/BTC,TSLA");
    const [interval, setInterval] = React.useState("1min");
    const [region, setRegion] = React.useState("US");
    
    const [type, setType] = React.useState("");
    const format = "json";
    //const {data :stocksList, isFetching } = useGetStocksTrendingQuery({region: region});
    const [stocks, setStocks ] = React.useState([])
    const [stockstring, setStockstring] = React.useState("");
    const [stockArrary, setStockArrary] = React.useState([]);
    const [stockData, setStockData] = React.useState([]);


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
    
    
        

    function name(params) {
        
        //split array into 10's


        
        

    }
   

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

    //const half = splitString(stocksa)
    //console.log(half.length)
    
    //const {data : stockList3, isFetching3 } = useGetStockSparkQuery({symbol: stocksa});
    const stockList3 = spark;
    const isFetching3 = false;
   

    if (spark){
        var arrayObject = Object.values(spark)
    }


   
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

    
    return (
        <> 
      
            
            <Row gutters = {[32,32]} className = "crypto-card-container">
                {arrayObject?.map((stock)=> (
                    <Col xs ={24} sm={12} lg={6} className ="crypto-card">
                        <Button onClick={()=> addFavourites(stock.symbol, uid)}>
                            <Icon path = {mdiCardsHeart}
                            size = {1}
                            color = {blue[500]}
                            />

                        </Button>
                        <Chart symbol = {stock.symbol} timestamp = {stock.timestamp } close = {stock.close} />
                        <Link to = {`/stock/${stock.symbol}`}> 
                            <Card 
                            title = { `${stock.symbol}`}
                            >
                                <p>
                                    Symbol: {(stock.symbol)} <br/>
                                    Price : {(stock.close[stock.close.length-1])} <br/>

                                </p>
                              
                            </Card>
                        </Link>
                        
                    </Col>
                ))}
            </Row>
        </>
    )
}
