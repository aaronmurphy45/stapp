import React from 'react'
import { Select , Typography, Row, Col, Avatar, Card, Input } from 'antd'
import moment from 'moment'

import { cryptoNewsApi, useGetCryptoNewsQuery } from '../services/cryptoNewsAPI'
import { useGetCryptosQuery } from '../services/cryptoAPI'

const { Text, Title} = Typography;
const {Option} = Select;

const demoImage = "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News"

export default function News({simplified}) {
    const [newsCategory, setNewsCategory] = React.useState('Stocks')
    const {data, isFetching} = useGetCryptosQuery(100);
    const {data : cryptoNews} = useGetCryptoNewsQuery({newsCategory, count : simplified ? 6: 12})

    console.log(cryptoNews)

    if (!cryptoNews?.value) return "Loading..."
    return (
        <Row gutter ={[24,24]}>
            {!simplified && (
                <Col span ={24}>
                    <Select
                    showSearch
                    className="select-news"
                    placeholder="Select a Crypto"
                    optionFilterProp="children"
                    onChange={(value)=>(setNewsCategory(value))}
                    filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        <Option value = "Cryptocurrency">Cryptocurrency</Option>
                        {data?.data?.coins.map((coin) => <Option value = {coin.name}>{coin.name}</Option>)}
                        {/* ADD COMMONDITIES, STOCKS, FOREX */}
                    </Select>
                </Col>
            )}
            {cryptoNews.value.map((news, i) => (
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
    )
}
