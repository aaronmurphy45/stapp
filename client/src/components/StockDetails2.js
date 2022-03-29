import React, { useEffect, useState} from 'react'
import HTMLReactParser from 'html-react-parser'
import { useParams } from 'react-router'
import millify from 'millify'
import { Col, Row, Typography, Select, Timeline } from 'antd'
import { MoneyCollectOutlined, DollarCircleOutlined,UpOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined, UpCircleOutlined, DownOutlined } from '@ant-design/icons';
import FileUpload from '../machineLearning/FileUpload'
import { Chart } from '.'
import { useGetCryptoDetailsQuery } from '../services/cryptoAPI'
import { Option } from 'rc-select'
import { crypto } from './aJSON/crypto'
import { quote } from './aJSON/quote'
import { useGetStockBusinessDetailsQuery } from '../services/yahooRecommmend'
import { spark } from './aJSON/spark'
import { Modal, Button, Input } from 'antd'
import { addRecent } from './RecentlyViewed'
import { PageDecider } from './PageDecider'
import { SidePanelNews } from './index'
import  {addComment} from '../services/commentsActions'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase/firebase-config'

import { Comments } from './Comments'


import  { createElement } from 'react';
import { Comment, Tooltip, Avatar } from 'antd';
import moment from 'moment';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
import { Collapse } from 'antd';
import { stappsRating} from '../services/stappsRating'
import { useGetStockQuoteQuery, useGetStockTimeSeriesQuery, useGetStockLogoQuery } from '../services/stockListAPI'
const { Panel } = Collapse;



const {Title, Text} = Typography;
const {Options} = Select;
const { TextArea } = Input;



export default function StockDetails2() {

    

    const {stockId} = useParams();

    const [user] = useAuthState(auth);

    
    
    console.log(stockId)
    PageDecider(stockId);

    addRecent(stockId)
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [action, setAction] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [timePeriod, setTimePeriod] = useState('7d')
    const [comment, setComment] = useState('');
    const [interval, setInterval] = useState("1h");
    
    const {data, isFetching} = useGetStockQuoteQuery(stockId);


    const {data: data2, isFetching: isFetching2} = useGetStockTimeSeriesQuery({symbol: stockId, interval: interval});
    //const {data2, isFetching2} = useGetStockTimeSeriesQuery({symbol: stockId, interval: interval});
    const {data: data3  , isFetching3} = useGetStockLogoQuery(stockId);
    
       
    var arrayObject3 =[];

    
    var logo;
   
    const timestamp = []
    const close = []

    if (data3){
        console.log(data3)
        logo = data3.url

    }

    console.log(data)
  
   
    if (data2){
        console.log(data2)
        data2?.values?.forEach(element => {
            

            // GET the time right now

            
            // convert date to YYYY-MM-DD
            console.log(element.datetime)
            var date = new Date(element.datetime)

            //GET TIME NOW


            timestamp.push(element.datetime)
        
        
            close.push(element.close)
        });
       
        console.log(timestamp)
        console.log(close)

    }
    
    console.log(data)
    if (data) {
        var stockDetails = data;
        
    }
    else{
        return <div>Loading...</div>
    }

   
   

    
    
    
    //const stockDetails = data?.data?.coin;

    //const data2 = spark;
    //const isFetching2 = false;


    // Twelve Data getTimeSeries
    


    // check if stock id is key in dictionary of data2
    
    

    // Comments 
   
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

        stockDetails = stock;
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

    const chartStyle = {
        width: '60%',
        height: '60%',
        margin: 'auto',
        float: 'left',
    }
    function callback(key) {
        console.log(key);
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

    const stappsrating = stappsRating({eps: stockDetails.epsCurrentYear, ptb: stockDetails.priceToBook})
    if (stappsrating < 25) {
        stappsr = <UpCircleOutlined style = {{color: '#52c41a'}}/>
    }else if (stappsrating < 50) {
        stappsr = <UpCircleOutlined style = {{color: '#faad14'}}/>
    } else {
        stappsr = <DownOutlined style = {{color: '#f5222d'}}/>
    }




   
    return (
        <div>
        <div style = {containerStyle}>
            <Col className = "coin-detail-container">
                <Col className = "coin-heading-container">
                    <div style = {chartStyle}>
                    <Select defaultValue="1h" style={{ width: 120 }} onChange={onChange}>
                        {time.map(item => (
                            <Option value={item}>{item}</Option>
                        ))}
                    </Select>
                    <Chart symbol = {stockDetails.symbol} timestamp = {timestamp} close = {close} />
                    </div>
               
                    <Title level={2} className = "coin-name">
                        {stockDetails.name} ({stockDetails.symbol}) {stockDetails.ask} {stockDetails.percent_change}%
                        {(stockDetails.percent_change < 0) ? <DownOutlined style = {{color: '#f5222d'}}/> : <UpCircleOutlined style = {{color: '#52c41a'}}/>}
                        <img src= {logo} style = {{width: '50px', height: '50px'}}/>
                    </Title>

                    <p> Stock Details <br/>
                        Open: {stockDetails.open} <br/>
                        Close: {stockDetails.close} <br/>
                        Change :  {stockDetails.change} <br/>
                        Market : {stockDetails.exchange}</p>
                        High: {stockDetails.high} <br/>
                        Low: {stockDetails.low} <br/>
                        Volume: {stockDetails.volume} <br/>
                        Previous Close: {stockDetails.previous_close} <br/>


                    
                    <br/><br/> <br/><br/>
                    <br/>

                </Col>
                <Button type="primary" onClick={showModal}>
                        Open Predictor
                    </Button>
                    <div>Stapp's Stock Rating: {stappsr}</div>
                    <Collapse style = {{marginTop:"5%"}} onChange={callback}>
                    <Panel header="Stock History" key="1" style = {{ maxHeight: "20%" , overflowX :"scroll"}}>
                        <Select defaultValue="1h" style={{ width: 120 }} onChange={onChange}>
                            {time.map(item => (
                                <Option value={item}>{item}</Option>
                            ))}
                        </Select>
                        <br/>
                        <br/>
                        <Timeline style = {{ marginLeft: "10px",maxHeight:"30vh", overflowX:"scroll", border: "1px solid grey"}}>
                            <br/>

                            {data2?.values?.map(item => {
                               if (item.open > item.close) {
                                      return <Timeline.Item color="red">Date : {item.datetime}<br/> Open : {item.open} <br/> Close : {item.close}</Timeline.Item>   
                                } else {
                                    return <Timeline.Item color="green">Date : {item.datetime}<br/> Open : {item.open} <br/> Close : {item.close}</Timeline.Item>
                                }
                            
                            })}
                        </Timeline>
                    </Panel>
                    <Panel header="52 Week Information" key="2">
                        <p>Low : {stockDetails.fifty_two_week.low}</p>
                        <p>High : {stockDetails.fifty_two_week.high}</p>
                        <p>Low Change : {stockDetails.fifty_two_week.low_change}</p>
                        <p>High Change : {stockDetails.fifty_two_week.high_change}</p>
                        <p>Low Change Percent : { stockDetails.fifty_two_week.low_chaqnge_percent}</p>
                        <p>High Change Percent : {stockDetails.fifty_two_week.high_change_percent}</p>
                        <p>Range : {stockDetails.fifty_two_week.range}</p>
                    </Panel>
                    <Panel header="This is panel header 3" key="3">
                    <p>infor3</p>
                    </Panel>
                </Collapse>
                <Modal title="Stock Price Predictor" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <FileUpload symbol = {stockDetails.symbol }></FileUpload>
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
                <Button type="primary" onClick = {()=>addComment(comment, user.email, stockDetails.symbol)}>Post</Button>
            </div>
            <div style = {{marginTop: "5%"}}>
                <h2>Comments</h2>
                <Comments stockid = {stockId}></Comments>
            </div>
    
            
        </div>
        <SidePanelNews stockname = {stockDetails.displayName}></SidePanelNews>
        </div>
    )
}
