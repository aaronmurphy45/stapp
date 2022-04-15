import React, { useEffect, useState} from 'react'
import HTMLReactParser from 'html-react-parser'
import { useParams } from 'react-router'
import millify from 'millify'
import { Col, Row, Typography, Select, Timeline } from 'antd'
import { MoneyCollectOutlined, DollarCircleOutlined,UpOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined, UpCircleOutlined, DownOutlined } from '@ant-design/icons';
import FileUpload from '../machineLearning/FileUpload'
import { Chart, Profile } from '.'
import { useGetCryptoDetailsQuery, useGetCryptoPriceHistoryQuery } from '../services/cryptoAPI'
import { Option } from 'rc-select'
import { crypto } from './aJSON/crypto'
import { quote } from './aJSON/quote'
import { useGetStockBusinessDetailsQuery } from '../services/yahooRecommmend'
import { spark } from './aJSON/spark'
import { Modal, Button, Input } from 'antd'
import { addRecent } from './RecentlyViewed'
import { PageDecider } from './PageDecider'
import { SidePanelNews } from './index'
import Parser from 'html-react-parser';
import  {addComment} from '../services/commentsActions'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase/firebase-config'

import { addRecentCrypto } from './RecentlyViewed'
import { currencyX, currencySymbol, currencySymbol2 } from './User'
import { Comments } from './Comments'


import  { createElement } from 'react';
import { Comment, Tooltip, Avatar } from 'antd';
import moment from 'moment';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
import { Collapse } from 'antd';
import { stappsRating} from '../services/stappsRating'
import { useGetStockQuoteQuery, useGetStockTimeSeriesQuery, useGetStockLogoQuery, useGetStockProfileQuery, useGetStockPriceQuery } from '../services/stockListAPI'
import { addFavourites } from '../services/favouritesActions'
import TwitterScrape from './TwitterScrape'

const { Panel } = Collapse;



const {Title, Text} = Typography;
const {Options} = Select;
const { TextArea } = Input;


export default function CryptoDetails() {
    const {coinId} = useParams();
   

    const [user] = useAuthState(auth);
   

    const [timePeriod, setTimePeriod] = useState('7d')
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [action, setAction] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    //const [timePeriod, setTimePeriod] = useState('7d')
    const [comment, setComment] = useState('');
    const [interval, setInterval] = useState("24h");

    const {data , isFetching, error} = useGetCryptoDetailsQuery(coinId)


    
   // const {data2, isFetching2} = useGetCryptoPriceHistoryQuery(coinId)
   
    const [priceHistory, setPriceHistory] = useState([]);
    var logo;
   
    const timestamp = []
    const close = []
    
    

   



    
        //console.log(cryptoPriceHistory)
    
    //const isFetching = false;
    if (isFetching){
      
        return <div>Loading...</div>
    }
    
    var cryptoDetails;
   
    //const cryptoDetails = data?.data?.coin;

    cryptoDetails = data?.data?.coin;
    addRecentCrypto(cryptoDetails?.symbol);
    
    //console.log(cryptoPriceHistory)
   
    

    //console.log(cryptoDetails)

    //const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];


  
  
    const like = () => {
        setLikes(1);
        setDislikes(0);
        setAction('liked');
      };
    
      const dislike = () => {
        setLikes(0);
        setDislikes(1);
        setAction('disliked');
      };



    const actions = [
        <Tooltip key="comment-basic-like" title="Like">
          <span onClick={like}>
            {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
            <span className="comment-action">{likes}</span>
          </span>
        </Tooltip>,
        <Tooltip key="comment-basic-dislike" title="Dislike">
          <span onClick={dislike}>
            {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
            <span className="comment-action">{dislikes}</span>
          </span>
        </Tooltip>,
        <span key="comment-basic-reply-to">Reply to</span>,
      ];



    let i =0;
    var xx;
    /*
    data?.quoteResponse?.result?.map(stock => {
    if (stock.symbol == "AAPL") {

        cryptoDetails = stock;
        // check if stock id is key in dictionary of data2
        if (data2[stockId]) {
            xx = data2[stockId];
 
            //invalid date
            
        }


        


        return stock;
    }
})
*/
    if (isFetching){
        
        return <div>Loading...</div>
    }
    
 
    const time = ['1min', '5min', '15min', '30min', '45min', '1h', '2h', '4h', '8h', '1day', '1week', '1month']

    // on chat time change update the call
    const onChange = (value) => {
        setInterval(value)

    }

    


    // dictionary to array 
   
  
    

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const containerStyle = {
        width: '100%',
       
    }
    const borderDesign = {
        border: '10px solid ' + cryptoDetails?.color,
    }
    const chartStyle = {
        width: '60%',
        height: '60%',
        margin: 'auto',
        float: 'left',
    }
    function callback(key) {
       
      }
    const textStyle = {
        width: '40%',
        height: '60%',
        margin: 'auto',
        float: 'right',
    }

    const headerStyle = {
        color: 'rgb(67,145,255)',
        fontSize: '1.5em',

    }
    const stockInformationStyle = {
        backgroundColor: 'white',
        width: "40%",
        height: "100%",
        margin : "10px",
        padding: "10px",
        float : "right"
    }

    var stappsr;

    const stappsrating = stappsRating({eps: cryptoDetails?.price, ptb: cryptoDetails?.price})
    if (stappsrating < 25) {
        stappsr = <UpCircleOutlined style = {{color: '#52c41a'}}/>
    }else if (stappsrating < 50) {
        stappsr = <UpCircleOutlined style = {{color: '#faad14'}}/>
    } else {
        stappsr = <DownOutlined style = {{color: '#f5222d'}}/>
    }


    const span = <span>{cryptoDetails?.description}</span>

    const dynamicString = cryptoDetails?.description;
    const dynamicStringSpan = <span> {`${dynamicString}`} </span>


    
   
    return (
        <div>
        <div style = {containerStyle}>
            <Col className = "coin-detail-container">
                <Col className = "coin-heading-container" style = {borderDesign}>
                    <div style = {chartStyle}>
                    <Select defaultValue="1h" style={{ width: 120 }} onChange={onChange}>
                        {time.map(item => ( 
                            <Option value={item}>{item}</Option>
                        ))}
                    </Select>
                    <Chart symbol = {cryptoDetails?.symbol} timestamp = {timestamp} close = {close} />
                    </div>
               
                    <Title level={2} className = "coin-name">
                    <img src= {cryptoDetails?.iconUrl} style = {{width: '50px', height: '50px'}}/><p></p>     
                        {cryptoDetails?.name} ({cryptoDetails?.symbol}) {currencySymbol}{cryptoDetails?.price*currencyX} {cryptoDetails?.change}%
                        {   (cryptoDetails?.change < 0) ?  <DownOutlined style = {{color: '#f5222d'}}/> : <UpCircleOutlined style = {{color: '#52c41a'}}/>   }
                        
                    </Title>

                    <p> <a href = {cryptoDetails?.websiteUrl} target = "_blank">{cryptoDetails?.websiteUrl}</a> <br/>
                        All Time High ({cryptoDetails?.allTimeHigh?.timestamp}): {currencySymbol}{cryptoDetails?.allTimeHigh?.price*currencyX} <br/>
                        Started : {cryptoDetails?.listedAt} <br/>
                        Market Cap : {cryptoDetails?.marketCap} <br/>
                        Number of Markets : {cryptoDetails?.numberOfMarkets} <br/>
                        Number of Exchanges : {cryptoDetails?.numberOfExchanges} <br/>
                        Change :  <b>{cryptoDetails?.change}</b> <br/>
                        Rank : {cryptoDetails?.rank} <br/>
                        Circulating Supply : {cryptoDetails?.supply?.circulating} <br/>
                        Total Supply : {cryptoDetails?.supply?.total} <br/>
                        </p>
                    <br/>

                </Col>
                <Button type="primary" onClick={showModal}>
                        Open Predictor
                    </Button>
                    <Button onClick= {()=>addFavourites(cryptoDetails?.symbol, user.uid)}>
                        Add to Favourites
                    </Button>
                    <div>Stapp's Stock Rating: {stappsr}</div>
                    <Collapse style = {{marginTop:"5%"}} onChange={callback}>
                    <Panel header="Crypto Information" key="1" style = {{ maxHeight: "20%" , overflowX :"scroll"}}>
                        {/*
                        <Select defaultValue="1h" style={{ width: 120 }} onChange={onChange}>
                            {time.map(item => (
                                <Option value={item}>{item}</Option>
                            ))}
                        </Select>
                        <br/>
                        <br/>
                        <Timeline style = {{ marginLeft: "10px",maxHeight:"30vh", overflowX:"scroll", border: "1px solid grey"}}>
                            <br/>

                            {cryptoDetails?.sparkline?.map(item => {
                               if (item.open > item.close) {
                                      return <Timeline.Item color="red">Date : {item.datetime}<br/> Open : {item.open} <br/> Close : {item.close}</Timeline.Item>   
                                } else {
                                    return <Timeline.Item color="green">Date : {item.datetime}<br/> Open : {item.open} <br/> Close : {item.close}</Timeline.Item>
                                }
                            
                            })}
                        </Timeline>
    */}            <div className="content">{Parser(cryptoDetails.description)}</div>
                    </Panel>
                    <Panel header="Useful Links" key="2">
                        {cryptoDetails?.links?.map(item => (
                            <div><a href={item.url}> {item.name} </a> <br/></div>
                        ))}
                    </Panel>
                    <Panel header="Company Information" key="3">
                        {/*<TwitterScrape searchTerm = {cryptoDetails?.name} count = {10}/>*/}
                    </Panel>
                </Collapse>
                <Modal title="Stock Price Predictor" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <FileUpload symbol = {cryptoDetails?.symbol }></FileUpload>
                </Modal>
                {/*
                <Select 
                    defaultValue = "7d"
                    className = "select-time-period"
                    placeholder = "Select Time Period "
                    onChange = {(value)=>setTimePeriod(value)}
                >
                    {time.map((element)=>{
                        <Option key = {element}>{element}</Option>
                    })}
                </Select>
                */}
                
            </Col>
            <div style = {{marginTop: "5%"}}>
                <h2>Post A Comment</h2>
                <TextArea rows={4} placeholder="maxLength is 120" maxLength={120} onChange = {
                    (e)=>{
                        setComment(e.target.value)
                    }
                } />
                <Button type="primary" onClick = {()=>addComment(comment, user.email, cryptoDetails?.symbol)}>Post</Button>
            </div>
            <div style = {{marginTop: "5%"}}>
                <h2>Comments</h2>
                <Comments stockid = {cryptoDetails?.symbol}></Comments>
            </div>
    
            
        </div>
        <SidePanelNews stockname = {cryptoDetails?.name}></SidePanelNews>
        </div>
    )
}
