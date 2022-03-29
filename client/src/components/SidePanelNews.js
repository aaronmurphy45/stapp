import React from 'react'
import { Select , Typography, Row, Col, Avatar, Card, Input } from 'antd'
import moment from 'moment'

import { useEffect } from 'react'

import { cryptoNewsApi, useGetCryptoNewsQuery } from '../services/cryptoNewsAPI'
import { useGetCryptosQuery } from '../services/cryptoAPI'
import { useParams } from 'react-router'
import { PageDecider } from './PageDecider'

const { Text, Title} = Typography;
const {Option} = Select;

const demoImage = "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News"

export default function SidePanelNews(props) {
    const simplified = props.simplified;
    let search;
    if (props.stockname!=undefined){
        console.log(props.stockname)
        console.log("else")
        search= props.stockname+ " stock"
    }
    else{
        console.log("else")
        search = "Stock Market News"
    }
    
    const [newsCategory, setNewsCategory] = React.useState();
    //const {data, isFetching} = useGetCryptosQuery(100);
    console.log(search)
    const {data : cryptoNews} = useGetCryptoNewsQuery({search, count : simplified ? 20: 12})

    console.log(cryptoNews)
    console.log(simplified)
    var h  
    if (simplified){
       h = "1200%"
    }
    else{
        console.log("1000000")
        h = "100%"
    }
    // css for container
    const containerStyle = {
        margin: "0 auto",
        top: "115px",
        right: "0",
        width: "25%",
        maxHeight: h,
        position: "absolute",
        overflowX: "scroll",
        borderLeft: "3px solid rgb(67, 143, 255)",
    }
    const boxstyle = {
        
    }

    if (!cryptoNews?.value) return "Loading..."
    return (
        <div style = {containerStyle}>
        <Row gutter ={[4,4]}>
            {cryptoNews.value.map((news, i) => (
                <Col /*xs = {24} sm ={12} lg ={8} key = {i}*/>
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
        </div>
    )
}
