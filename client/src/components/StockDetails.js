import {React, useEffect, useState} from 'react'
import HTMLReactParser from 'html-react-parser'
import { useParams } from 'react-router'
import millify from 'millify'
import { Col, Row, Typography, Select } from 'antd'
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import FileUpload from '../machineLearning/FileUpload'
import { Chart } from '.'
import { useGetCryptoDetailsQuery } from '../services/cryptoAPI'
import { Option } from 'rc-select'
import { crypto } from './aJSON/crypto'
import { quote } from './aJSON/quote'
import { useGetStockBusinessDetailsQuery } from '../services/yahooRecommmend'
import { spark } from './aJSON/spark'
import { Modal, Button } from 'antd'
import { addRecent } from './RecentlyViewed'
import { PageDecider } from './PageDecider'
import { SidePanelNews } from './index'

const {Title, Text} = Typography;
const {Options} = Select;



export default function StockDetails() {
    const {stockId} = useParams();
    console.log(stockId)
    PageDecider(stockId);
    addRecent(stockId)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [timePeriod, setTimePeriod] = useState('7d')

    //const {data, isFetching} = useGetCryptoDetailsQuery(coinId)
    const data = quote;
    const isFetching = false;
    var stockDetails;
    //const stockDetails = data?.data?.coin;

    const data2 = spark;
    //const isFetching2 = false;


    // check if stock id is key in dictionary of data2
    
 



    let i =0;
    var xx;

    data?.quoteResponse?.result?.map(stock => {
    if (stock.symbol == stockId) {
        console.log("StockDetails now here")

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
                    <p> Stock Details</p>
                    <Button type="primary" onClick={showModal}>
                        Open Predictor
                    </Button>
                    <p>Price : {stockDetails.ask}</p>
                    <p>Change :  {stockDetails.change}</p>
                    <p>Market : {stockDetails.market}</p>

                    <p>
                        {stockDetails.name } live price 
                        View Value Statistics, Market Cap and Supply
                    </p>
                </Col>
                <Modal title="Stock Price Predictor" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <FileUpload symbol = {stockDetails.symbol }></FileUpload>
                </Modal>
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
        <SidePanelNews stockname = {stockDetails.displayName}></SidePanelNews>
        </div>
    )
}
