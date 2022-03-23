import {React, useState} from 'react'
import HTMLReactParser from 'html-react-parser'
import { useParams } from 'react-router'
import millify from 'millify'
import { Col, Row, Typography, Select } from 'antd'
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import FileUpload from '../machineLearning/FileUpload'

import { useGetCryptoDetailsQuery } from '../services/cryptoAPI'
import { Option } from 'rc-select'
import { crypto } from './aJSON/crypto'
import { useGetStockBusinessDetailsQuery } from '../services/yahooRecommmend'
const {Title, Text} = Typography;
const {Options} = Select;




export default function CryptoDetails() {
    const {coinId} = useParams();

    const [timePeriod, setTimePeriod] = useState('7d')

    //const {data, isFetching} = useGetCryptoDetailsQuery(coinId)
    const data = crypto;
    const isFetching = false;
    var cryptoDetails;
    //const cryptoDetails = data?.data?.coin;
    data?.data?.coins.map(coin => {
        
        if (coin.symbol == coinId) {
  
            cryptoDetails = coin;
          
            return coin;
        }
    })
    if (isFetching){
      
        return <div>Loading...</div>
    }
    

    console.log(cryptoDetails)

    const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];
    
  
    

    return (
        <div>
       
            <h1>CryptoDetails {coinId}</h1>
            <Col className = "coin-detail-container">
                <Col className = "coin-heading-container">
                    <Title level={2} className = "coin-name">
                        {cryptoDetails.name} ({cryptoDetails.symbol}) {cryptoDetails.price}
                    </Title>

                    <p>
                        {cryptoDetails.name } live price 
                        View Value Statistics, Market Cap and Supply
                    </p>
                </Col>
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
                
            </Col>
            
        </div>
    )
}
