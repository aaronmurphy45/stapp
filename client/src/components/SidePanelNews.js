import React from 'react'
import { Select , Typography, Row, Col, Avatar, Card, Input } from 'antd'
import moment from 'moment'

import { useEffect } from 'react'

import { cryptoNewsApi, useGetCryptoNewsQuery } from '../services/cryptoNewsAPI'
import { useGetCryptosQuery } from '../services/cryptoAPI'
import { useParams } from 'react-router'
import { PageDecider } from './PageDecider'
import {useGetGoogleNewsQuery} from '../services/newsAPI2'

const { Text, Title} = Typography;
const {Option} = Select;

const demoImage = "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News"

export default function SidePanelNews(props) {
    const simplified = props.simplified;
    let search;
    if (props.stockname!=undefined){
        search= props.stockname+ " stock"
    }
    else{
        search = "Stock Market News"
    }
    
    const [newsCategory, setNewsCategory] = React.useState();


    //const {data, isFetching} = useGetCryptosQuery(100);
    const {data : cryptoNews, isFetching, error } = useGetCryptoNewsQuery({search, count : simplified ? 20: 12})
    const {data: cryptoNews2, isFetching2, error2} = useGetGoogleNewsQuery(search)

    var h  
    if (simplified){
       h = "500%"
    }
    else{
 
        h = "93%"
    }
    if (props.xxx){
        h = "210%"
    }
    // css for container
    const containerStyle = {
        margin: "1px",
        top: "115px",
        right: "0",
        width: "25%",
        boxShadow: "0px 0px 5px #000000",
        
       height: h,
        position: "absolute",
        overflowX: "scroll",
        borderLeft: "3px solid rgb(67, 143, 255)",


       
    }
    const boxstyle = {
        
    }

    const errorStyle = {
        margin: "0 auto",
        top: "215px",
        right: "0",
        width: "25%",
        position: "absolute",
        fontSize: "20px",
        color: "black",
    }



    const newsImageStyle = {
        borderRadius: "100%",
        width: "100%",
        height: "100%",
        objectFit: "cover",
    }
    
   
    return (
        <div >
        { error2? <div style = {errorStyle}>Error Loading News </div> : 
        <div id = "newsd" style = {containerStyle}>
        
      
        
<Row gutter ={[4,4]}>
{cryptoNews?.value.map((news, i) => (
    <Col xs = {24} sm ={24} lg ={24} key = {i} style = {{boxShadow: '0px 0px 5px #000000'}}>
        <Card hoverable className="news-card"> 
            <a href = {news.url} target= "_blank" rel= "noreferrer">
               
               
                <Title level ={4}>{news.name}</Title>
                
                  
                   
        
               
                <p style = {{textSize: "10px",textAlign: "center",  boxShadow: '0px 0px 5px #000000', padding:"10px"}}>
                        {news.description.length > 1000 ? `${news.description.substring(0,1000)}...`
                        : news.description }
                </p>
                <div className="provider-container">
                    <div >
                        <Avatar src = {news.provider[0]?.image?.thumbnail?.contentUrl || demoImage}></Avatar>
                        
                        <Text clasName = "provider-name">   {news.provider[0]?.name}</Text>
                    </div>
                    <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>

                </div>
            </a>
        </Card>
    </Col>
))}
</Row>

        </div>
    }</div>
    )
    
}


/*
<Row gutter ={[4,4]}>
{cryptoNews?.value.map((news, i) => (
    <Col xs = {24} sm ={12} lg ={8} key = {i}>
        <Card hoverable className="news-card"> 
            <a href = {news.url} target= "_blank" rel= "noreferrer">
                <div className = "news-image-container">
                    <Title className = "news-title" level ={4}>{news.name}</Title>
                    <img style = {{maxWidth:"200px", maxHeight:"100px"}} src = {news?.image?.thumbnail?.contentUrl || demoImage} alt ="News Image Failed to Load"></img>
                   
                </div>
                <p>
                        {news.description.length > 100 ? `${news.description.substring(0,100)}...`
                        : news.description }
                </p>
                <div className="provider-container">
                    <div>
                        <Avatar src = {news.provider[0]?.image?.thumbnail?.contentUrl || demoImage}></Avatar>
                        <Text clasName = "provider-name">{news.provider[0]?.name}</Text>
                    </div>
                    <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>

                </div>
            </a>
        </Card>
    </Col>
))}
</Row>
*/