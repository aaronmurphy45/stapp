import React from 'react'
import millify from 'millify'
import { Typography, Row, Col, Statistic } from 'antd'
import { Link } from 'react-router-dom'

import machineLearn from '../machineLearning/MachineLearning'

import { useGetCryptosQuery } from '../services/cryptoAPI'
import { Cryptocurrencies, CryptoNews, Stocks, StockNews, MostPopular, Favourites } from '.'
import NASDAQ from './NASDAQ'
import MachineLearn from '../machineLearning/MachineLearning'
import HighChange from './HighChange'
import LowChange from './LowChange'


// Load mobilenet.

const {Title} = Typography;

export default function Homepage() {
    

    //const {data, isFetching} = useGetCryptosQuery(10);
    //const globalStats = data?.data?.stats

    //console.log(data)
/*
    if (isFetching){
        return 'Loading...'
    }
*/
    return (
    
   
    <div style = {{overflowX:"scroll"}}>
           <div className = "home-heading-container">
               <Title level = {2} className = "home-title">Your Favourites</Title>
               <Title level ={3} className ="show-more"><Link to = '/favourites'>Show More</Link></Title>
           </div>
           <Favourites simplified={true}></Favourites>
           <div className = "home-heading-container">
               <Title level = {2} className = "home-title">Most Popluar</Title>
               <Title level ={3} className ="show-more"><Link to = '/mostpopular'>Show More</Link></Title>
           </div>
            <MostPopular simplified></MostPopular>
                {/*
           <div className = "home-heading-container">
               <Title level = {2} className = "home-title">Biggest Movers</Title>
               <Title level ={3} className ="show-more"><Link to = '/highchange'>Show More</Link></Title>
           </div>
       
           <HighChange simplified></HighChange>
           <div className = "home-heading-container">
               <Title level = {2} className = "home-title">Biggest Losers</Title>
               <Title level ={3} className ="show-more"><Link to = '/highchange'>Show More</Link></Title>
           </div>
           <LowChange simplified></LowChange>
           <div className = "home-heading-container">
               <Title level = {2} className = "home-title"> Top 10 Stocks</Title>
               <Title level ={3} className ="show-more"><Link to = '/stocks'>Show More</Link></Title>
           </div>
    */}
            {/*
           <NASDAQ simplidied></NASDAQ>
            */}
           <div className = "home-heading-container">
               <Title level = {2} className = "home-title"> Top 50 Crypto Currencies </Title>
               <Title level ={3} className ="show-more"><Link to = '/cryptocurrencies'>Show More</Link></Title>
           </div>
          <Cryptocurrencies simplified></Cryptocurrencies>
           <div className = "home-heading-container">
               <Title level = {2} className = "home-title"> Latest News </Title>
               <Title level ={3} className ="show-more"><Link to = '/cryptonews'>Show More</Link></Title>
           </div>
           

        </div>
    )
}
