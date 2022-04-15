import React, { useEffect, useState} from 'react'
import HTMLReactParser from 'html-react-parser'
import { useParams } from 'react-router'
import millify from 'millify'
import { Col, Row, Typography, Select } from 'antd'
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

const { Panel } = Collapse;



const {Title, Text} = Typography;
const {Options} = Select;
const { TextArea } = Input;



export default function StockDetails() {
    const {stockId} = useParams();

    const [user] = useAuthState(auth);

    
    

    PageDecider(stockId);
    addRecent(stockId)
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [action, setAction] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [timePeriod, setTimePeriod] = useState('7d')
    const [comment, setComment] = useState('');
    //const [comments, setComments] = useState([]);
    //const {data: comments, loading: commentsLoading, error: commentsError} = getComments(stockId);
    
   


    //const [comments, setComments] = useState([]);   
       
    var arrayObject3 =[];

    var isFetching = false;
    
   
   
  
    
    //const {data, isFetching} = useGetCryptoDetailsQuery(coinId)
    const data = quote;
    
    var stockDetails;
    //const stockDetails = data?.data?.coin;

    const data2 = spark;
    //const isFetching2 = false;


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

    data?.quoteResponse?.result?.map(stock => {
    if (stock.symbol == stockId) {

        stockDetails = stock;
        // check if stock id is key in dictionary of data2
        if (data2[stockId]) {
            xx = data2[stockId];
 
            //invalid date
            
        }


        


        return stock;
    }
})
    if (isFetching){
        
        return <div>Loading...</div>
    }
    

    const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];
    


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
    if (stappsrating) {
        stappsr = <DownOutlined style = {{color: '#f5222d'}}/>
    }else if (stappsrating < 50) {
        stappsr = <DownOutlined style = {{color: '#f5222d'}}/>
    } else {
        stappsr = <DownOutlined style = {{color: '#f5222d'}}/>
    }


   
    return (
        <div>
        <div style = {containerStyle}>
            <Col className = "coin-detail-container">
                <Col className = "coin-heading-container">
                    <div style = {chartStyle}>
                    <Chart symbol = {stockDetails.symbol} timestamp = {xx.timestamp } close = {xx.close} />
                    </div>
               
                    <Title level={2} className = "coin-name">
                        {stockDetails.displayName} ({stockDetails.symbol}) {stockDetails.ask}
                    </Title>

                    <p> Stock Details <br/>
                    Ask : {stockDetails.ask} <br/>
                    Bid : {stockDetails.bid} <br/>
                    Change :  {stockDetails.change} <br/>
                    Market : {stockDetails.market}</p>
                    Book: value : {stockDetails.bookValue}<br/>
                
                    <br/><br/> <br/><br/>
                    <br/>

                </Col>
                <Button type="primary" onClick={showModal}>
                        Open Predictor
                    </Button>
                    <div>Stapp's Stock Rating: {stappsr}</div>
                    <Collapse style = {{marginTop:"5%"}} onChange={callback}>
                    <Panel header="This is panel header 1" key="1">
                        <p>{stockDetails.description}</p>
                    </Panel>
                    <Panel header="Postmarket Information" key="2">
                        <p>Post Market Change : {stockDetails.postMarketChange}</p>
                        <p>Post Market Change Percent : {stockDetails.postMarketChangePercent}%</p>
                        <p>Post Market Price : {stockDetails.postMarketPrice}</p>
                        <p>Post Market Time : {new Date(stockDetails.postMarketTime).toLocaleString()}</p>
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
