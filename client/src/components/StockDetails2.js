import React, { useEffect, useState} from 'react'
import HTMLReactParser from 'html-react-parser'
import { useParams } from 'react-router'
import { Rate } from 'antd';
import millify from 'millify'
import { Col, Row, Typography, Select, Timeline } from 'antd'
import { MoneyCollectOutlined, DollarCircleOutlined,UpOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined, UpCircleOutlined, DownOutlined } from '@ant-design/icons';
import FileUpload from '../machineLearning/FileUpload'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'   
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { Chart, Profile } from '.'
import ReactTooltip from 'react-tooltip'
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

import { addStockRating} from '../services/ratingService';
import { dbs } from '../firebase/firebase-config';
import { Comments } from './Comments'


import  { createElement } from 'react';
import { Comment, Tooltip, Avatar } from 'antd';
import moment from 'moment';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
import { Collapse } from 'antd';
import { stappsRating} from '../services/stappsRating'
import { useGetStockQuoteQuery, useGetStockTimeSeriesQuery, useGetStockLogoQuery, useGetStockProfileQuery, useGetStockPriceQuery } from '../services/stockListAPI'
import { addFavourites } from '../services/favouritesActions'
import { currencySymbol, currencyX } from './User'
import { useGetAnnualIncomeQuery, useGetAnnualBalanceSheetQuery, useGetAnnualCashFlowQuery, useGetQuarterlyBalanceSheetQuery, useGetQuarterlyCashFlowQuery, useGetQuarterlyIncomeQuery } from '../services/businessDetails'

const { Panel } = Collapse;



const {Title, Text} = Typography;
const {Options} = Select;
const { TextArea } = Input;



export default function StockDetails2() {

    

    const {stockId} = useParams();
   
    const [user] = useAuthState(auth);



    
    

   
    const [stockRating, setStockRating] = useState(0);
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [action, setAction] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [timePeriod, setTimePeriod] = useState('7d')
    const [comment, setComment] = useState('');
    const [interval, setInterval] = useState("1h");
    const [userRating , setUserRating] = useState(0);
    
  
    if (stockId==undefined){
        //console.log("stockId is undefined")
        // move to home page
        alert("stockId is undefined")
        window.location.href = "/"

    }
    const {data, isFetching, error} = useGetStockQuoteQuery(stockId);
    PageDecider(stockId);

    addRecent(stockId)

    const {data: data2, isFetching: isFetching2, error2} = useGetStockTimeSeriesQuery({symbol: stockId, interval: interval});
    //const {data2, isFetching2} = useGetStockTimeSeriesQuery({symbol: stockId, interval: interval});
    const {data: data3  , isFetching3} = useGetStockLogoQuery(stockId);

    const { data: dataX, isFetching : isFetchingX , error3} = useGetAnnualIncomeQuery(stockId);
    //const { data: dataY, isFetching : isFetchingY } = useGetAnnualBalanceSheetQuery(stockId);
    //const { data: dataZ, isFetching : isFetchingZ } = useGetAnnualCashFlowQuery(stockId);
    const { data: dataA, isFetching : isFetchingA , error4} = useGetQuarterlyIncomeQuery(stockId);
    //const { data: dataB, isFetching : isFetchingB } = useGetQuarterlyBalanceSheetQuery(stockId);
    //const { data: dataC, isFetching : isFetchingC } = useGetQuarterlyCashFlowQuery(stockId);
    
    const dataY = []
    const dataZ = []
   

    const {data: data4, isFetching: isFetching4, error5} = useGetStockPriceQuery(stockId);

    if (data4) {
       
    }
       
    var arrayObject3 =[];

    if (error){
        return <div>Error</div>
    }
    if (error2){
        return <div>Error</div>
    }
    if (error3){
        return <div>Error</div>
    }
    if (error4){
        return <div>Error</div>
    }
    if (error5){
        return <div>Error</div>
    }
    
    var logo;
   
    const timestamp = []
    const close = []

    if (data3){
       
        logo = data3.url

    }


    
  
   
    if (data2){
    
        data2?.values?.forEach(element => {
            

            // GET the time right now

            
            // convert date to YYYY-MM-DD
            
            var date = new Date(element.datetime)

            //GET TIME NOW


            timestamp.push(element.datetime)
        
        
            close.push(element.close)
        });
       
      

    }

    if (data) {
        var stockDetails = data;
        
    }
    else{
        return <div>Loading...</div>
    }
    
    if (dataX) {

        var stockDetailsX = []//dataX?.results[0];

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
      }
    const textStyle = {
        width: '40%',
        height: '60%',
        margin: 'auto',
        float: 'right',
    }
    const indicatorContainerStyle = {
        marginTop: '20px',
        marginLeft: '10px',
        width: '58%',
        height: '60%',
        alignItems: 'in-line',
        marginBottom: '20px',
        borderRadius: '5px',
        backgroundColor: '#fafafa',
        padding: '0px 10px 10px 10px',
        boxShadow: '0px 0px 5px #000000',
        
    

    }
    const indicatorStyle = {
        width: '100%',
        height: '20%',
        margin: '3px',
    }



    const headerStyle = {
        color: 'rgb(67,145,255)',
        fontSize: '1.5em',

    }
    const stockInformationStyle = {
        backgroundColor: 'white',
        width: "35%",
        height: "100%",
        padding: "10px",
        float : "right",
        borderRadius: "10px",
        boxShadow: '0px 0px 5px #000000',
        marginRight: "50px",
    }
    const borderDesign = {
        border : '3px solid rgb(67,145,255)',
        marginBottom : '100px',
        paddingBottom : '50px',
        borderRadius : '10px',
        boxShadow: '0px 0px 5px #000000',
    }
    const stockValueTextStyle = {
        float: "left",
        width: "50%",
    }
    const stockValueStyle = {
        float: "right",
        width: "50%",
    }



    var stappsr;


   
    const stappsrating = stappsRating({x:dataX,y: dataY,z:dataZ ,price: data4?.price});
    if (stappsrating < 25) {
        stappsr = <DownOutlined style = {{color: '#f5222d'}}/>
    }else if (stappsrating < 50) {
        stappsr = <UpCircleOutlined style = {{color: '#faad14'}}/>
    } else {
        stappsr = <DownOutlined style = {{color: '#f5222d'}}/>
    }
    
    const pe = data4?.price / dataX?.results[0]?.basicEps;
    const eps = dataX?.results[0]?.basicEps;
    const grossMargin = dataX?.results[0]?.grossProfit/dataX?.results[0]?.totalRevenue;
    const netMargin = ((dataX?.results[0]?.grossProfit-dataX?.results[0]?.totalExpenses)/dataX?.results[0]?.totalRevenue);
    const peg = (pe / (dataX?.results[0]?.basicEps-dataX?.results[1]?.basicEps))
    const pb = dataX?.results[0]?.price/dataX?.results[0]?.bookValue;


    
    const yearlyRevTrend = () => {
        var count = 0;
        for (let i = 1; i < dataX?.results?.length; i++) {
            if (dataX?.results[i]?.totalRevenue > dataX?.results[i-1]?.totalRevenue) {
                count += 1;
            }
        }
        if (count > dataX?.results?.length / 2) {
            return <UpOutlined style = {{color: '#52c41a'}}/>
        }
        else {
            return <DownOutlined style = {{color: '#f5222d'}}/>
        }
    }

    const quarterlyRevTrend = () => {
        var count = 0;
        for (let i = 1; i < dataA?.results?.length; i++) {
            if (dataA?.results[i]?.totalRevenue > dataA?.results[i-1]?.totalRevenue) {
                count += 1;
            }
        }

        if (count > dataA?.results?.length / 2) {
            return <UpOutlined style = {{color: '#52c41a'}}/>
        }
        else {
            return <DownOutlined style = {{color: '#f5222d'}}/>
        }
    }


const getUserStockRating = (stock) => {
    const email = user?.email;
    const db = dbs.ref(`Ratings/-N-5tjvQZKnNf7ZVTHkR/${stock}`)
    db.once('value', function(snapshot) {
        if (snapshot.val() == undefined || snapshot.val() == null) {
            return 0
        }
        else {
            var ratings = snapshot.val()
            var nratings = Object.values(ratings)
            var xratings = Object.keys(ratings)
            nratings.forEach(element => {
                if (element.email == email) {
                    setUserRating(element.rating)
                    
                }


            });

        
        }
    })
}





    const getStockRating = (stock) => {
        const db = dbs.ref(`Ratings/-N-5tjvQZKnNf7ZVTHkR/${stock}`)
        db.once('value', function(snapshot) {
            var ratings = snapshot.val()
            var sum = 0
            var count = 0
            for (var key in ratings) {
                sum += ratings[key].rating
                count += 1
            }
        
            var avg = sum/count
            setStockRating(avg)
        })
    }

    getStockRating(stockId)
    getUserStockRating(stockId)

    const rateThisStockContainerStyle = {
        marginTop: '50px',
        width: '100%',
        height: '100%',
        margin: 'auto',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0px 0px 5px #000000',
    }
    const rateThisStockTextStyle = {
        fontSize: '1.5em',
        margin: 'auto',
        marginTop: '20px',
        marginBottom: '20px',
        textAlign: 'center',
    }
    const collapseStyle = {
        margin: 'auto',
        marginTop: '20px',
        boxShadow: '0px 0px 5px #000000',
        borderRadius: '10px',
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        alignItems: 'center',
    }
    const rateThisStockStarStyle = {
        width: '100%',
        height: '100%',
        margin: 'auto',
        marginTop: '20px',
        marginBottom: '20px',
        textAlign: 'center',

    }
    const rateThisStockSmallText = {
        fontSize: '0.8em',
        margin: 'auto',
        marginTop: '20px',
        marginBottom: '20px',
        textAlign: 'center',
    }
    
    const postCommentStyle = {
        margin: 'auto',
        boxShadow: '0px 0px 5px #000000',
        alignItems: 'center',
        backgroundColor: 'white',
        textAlign: 'center',
    }
    const commentStyle = {
        margin: 'auto',
        boxShadow: '0px 0px 5px #000000',
        alignItems: 'center',
        
        width: '100%',
        overflowX: 'hidden',
        backgroundColor: 'white',
        textAlign: 'center',
    }


    const topRatingStyle = {
        width: '30%',
        height: '10%',
        margin: 'auto',
        
    }
    const headingStyle = {
        margin: 'auto',
        width: "40%",
        float:"right",
        height: '40%',
        textAlign: 'center',
        marginTop: '50px',
    }


    const onediv = {
        float: 'left',
        width: '30%',
        
    }
    const twodiv = {
        float: 'left',
        width: '70%',

    }

        if (error){
            return <div>Error: {error}</div>
        }

    
   
    return (
        <div>
            <ReactTooltip />
        <div style = {containerStyle}>
            <Col className = "coin-detail-container">
                <Col className = "coin-heading-container" style = {borderDesign}>
                    <div style = {chartStyle}>
                    <Select style = {{marginLeft : "10px"}} defaultValue="1h" style={{ width: 120 }} onChange={onChange}>
                        {time.map(item => (
                            <Option value={item}>{item}</Option>
                        ))}
                    </Select>
                    <div style = {{boxShadow: '0px 0px 5px #000000', marginTop: '10px', marginBottom: '10px', marginLeft: '10px', marginRight: '10px', backgroundColor: 'white', borderRadius: '10px'}}>
                    <Chart symbol = {stockDetails.symbol} timestamp = {timestamp} close = {close} />
                    </div>
                   
                    </div>
                    
                    <div style = {headingStyle}>
                    <div style = {onediv}>
                    <img src= {logo} style = {{width: '100px', height: '100px', borderRadius:"100%", border: '1px black solid'}}/>
                    </div>
                    <div style = {twodiv}>
                    <Title level={2} className = "coin-name">
                        {stockDetails.name} ({stockDetails.symbol}) 
                        <br/>
                        {currencySymbol}{data4?.price*currencyX}
                        <br/>
                         {stockDetails.percent_change}%
                        {   (stockDetails.percent_change < 0) ?  <DownOutlined style = {{color: '#f5222d'}}/> : <UpCircleOutlined style = {{color: '#52c41a'}}/>   }
                        
                    </Title>
                    </div>
                    
                   
                    </div>
                     <div style = {stockInformationStyle}>
                        
                        <p> Stock Details <br/>
                        <div style = {stockValueTextStyle}>Open:</div>
                        <div style = {stockValueStyle}>{currencySymbol}{stockDetails?.open*currencyX}</div>
                        <div style = {stockValueTextStyle}>High:</div>
                        <div style = {stockValueStyle}>{currencySymbol}{stockDetails?.high*currencyX}</div>
                        <div style = {stockValueTextStyle}>Low:</div>
                        <div style = {stockValueStyle}>{currencySymbol}{stockDetails?.low*currencyX}</div>
                        <div style = {stockValueTextStyle}>Close:</div>
                        <div style = {stockValueStyle}>{currencySymbol}{stockDetails?.close*currencyX}</div>
                        </p>
                        <div style = {stockValueTextStyle}>Volume:</div>
                        <div style = {stockValueStyle}>{stockDetails?.volume}</div>
                        <div style ={stockValueTextStyle}>Exchange:</div>
                        <div style = {stockValueStyle}>{stockDetails?.exchange}</div>
                        <div style = {stockValueTextStyle}>Market Cap:</div>
                        <div style = {stockValueStyle}>{currencySymbol}{stockDetails?.market_cap}</div>
                        <div style = {stockValueTextStyle}>PE:</div>
                        <div style = {stockValueStyle}>{pe.toFixed(2)}</div>
                        <div style = {stockValueTextStyle}>EPS:</div>
                        <div style = {stockValueStyle}>{eps}</div>
                        <div style = {stockValueTextStyle}>Gross Margin:</div>
                        <div style = {stockValueStyle}>{grossMargin?.toFixed(2)}</div>
                        <div style = {stockValueTextStyle}>Net Margin:</div>
                        <div style = {stockValueStyle}>{netMargin?.toFixed(2)}</div>
                        <div style = {stockValueTextStyle}>PEG:</div>
                        <div style = {stockValueStyle}>{peg?.toFixed(2)}</div>
                        <div style = {stockValueTextStyle}>PB:</div>
                        <div style = {stockValueStyle}>{pb?.toFixed(2)}</div>

                    </div>

                    

                    
                   
                        
                        


                    <br/><br/> <br/><br/>
                    <br/>
                    <div style = {indicatorContainerStyle}>
                        <div style = {indicatorStyle}>
                    <Button type="primary" onClick={showModal} >
                        Open Predictor
                    </Button>
                    <Button onClick= {()=>addFavourites(stockDetails.symbol, user.uid)}>
                        Add to Favourites
                    </Button>
                    </div>
                    <div style = {indicatorStyle}>Stapp's Stock Rating: {stappsr} <FontAwesomeIcon icon={faCircleInfo} data-tip = "Stapps Rating of a stock is based on the price to earnings ratio the earnings per share and recent growth"/></div>
                    <div style = {indicatorStyle}>Yearly Revenue Trend: {yearlyRevTrend()} <FontAwesomeIcon icon={faCircleInfo} data-tip = "Yearly Revenue Trend displays an arrow depending on whether the stocks yearly reveune has increased in the last 5 years"/></div>
                    <div style = {indicatorStyle}>Quarterly Revenue Trend: {quarterlyRevTrend()} <FontAwesomeIcon icon={faCircleInfo} data-tip = "Yearly Revenue Trend displays an arrow depending on whether the stocks yearly reveune has increased in the last 5 quarters"/></div>
                    <div style = {indicatorStyle}>Stapp's Users Rating : <Rate disabled value={stockRating} style = {topRatingStyle}></Rate> </div>
                    </div>

                </Col>
                
                   

                    <Collapse onChange={callback} style = {collapseStyle}>
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
                        <p>Low : {stockDetails?.fifty_two_week.low}</p>
                        <p>High : {stockDetails?.fifty_two_week.high}</p>
                        <p>Low Change : {stockDetails?.fifty_two_week.low_change}</p>
                        <p>High Change : {stockDetails?.fifty_two_week.high_change}</p>
                        <p>Low Change Percent : { stockDetails?.fifty_two_week.low_chaqnge_percent}</p>
                        <p>High Change Percent : {stockDetails?.fifty_two_week.high_change_percent}</p>
                        <p>Range : {stockDetails?.fifty_two_week.range}</p>
                    </Panel>
                    <Panel header="Company Information" key="3">
                    <Profile stockid = {stockDetails?.symbol}/>
                    </Panel>
                    <Panel header="Financial Information" key="4">
                        <p>Earnings Per Share : {stockDetailsX?.basicEps}</p>
                        <p>Dividend Yield : {stockDetailsX?.dividendYield}</p>
                        <p> Gross Profit : {stockDetailsX?.grossProfit}</p>
                        <p>Cost of Revenue : {stockDetailsX?.costOfRevenue}</p>
                        <p>Operating Income : {stockDetailsX?.operatingIncome}</p>
                        <p>Net Income : {stockDetailsX?.netIncome}</p>
                        <p>Earnings Before Taxes : {stockDetailsX?.ebit}</p>
                    </Panel>
                </Collapse>
                <Modal title="Stock Price Predictor" visible={isModalVisible} footer={null} onOk={handleOk} onCancel={handleCancel}>
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
            <div style = {rateThisStockContainerStyle}>
                <h2 style = {rateThisStockTextStyle}>Rate this stock</h2>
                <Rate style = {rateThisStockStarStyle}value={userRating} onChange = {(e)=> addStockRating({email:user.email, stock: stockDetails.symbol,rating: e })}></Rate>
                <p style = {rateThisStockSmallText}>Stapp Users rate this stock <b>{stockRating}</b></p>
            </div>
           <div style = {postCommentStyle}>
                <h2>Post A Comment</h2>
                <TextArea rows={4} placeholder="Post a comment or report about this stock"  onChange = {
                    (e)=>{
                        setComment(e.target.value)
                    }
                } />
                <Button type="primary" onClick = {()=>addComment(comment, user.email, stockDetails.symbol)}>Post</Button>
            </div>
            <br/>
            <br/>
            <div style = {commentStyle}>
                <h2>Comments</h2>
                <Comments stockid = {stockId}></Comments>
            </div>
    
            
        </div>
        <SidePanelNews xxx stockname = {stockDetails.name}></SidePanelNews>
        </div>
    )
}
