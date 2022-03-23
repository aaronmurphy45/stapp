
import React from 'react'
import {useForm} from 'react-hook-form'
import Button from '@material-ui/core/Button'
import {parse} from 'papaparse';
import { useDispatch } from 'react-redux'
import { useGetStockBusinessDetailsQuery } from '../services/yahooRecommmend'
import { DatePicker, Space, Input, Select } from 'antd';
import { useGetPredictQuery } from '../services/pricePrediction';
import MachineLearn from './MachineLearning';

const { Option } = Select;
const { RangePicker } = DatePicker;
//import {actionTypes }from '../../Store/result/actions';

export default function FileUpload(props) {
   
    const {register, handleSubmit} = useForm()
    const [assets, setAssets] = React.useState([])
    const [file, setFile] = React.useState()
    var obv = 0;
    const dispatch = useDispatch()
    const {datax, isFetching} = useGetStockBusinessDetailsQuery({symbol: "BTC/USD"})
    var i=0;
    var data = data?.data?.data;
    console.log(i)
    console.log(datax)
    const [symbol, setSymbol] = React.useState(props.symbol)
    const [epochs , setEpochs] = React.useState(1)
    const [numOfDays, setNumOfDays] = React.useState(1)
    var result = [];
    const [xy, setXy] = React.useState(false)
    const onChange = (e) =>{
        
        setFile(e.target.files)
        // UseEffect Here?
        Array.from(e.target.files).filter(file => file.type === "text/csv").forEach(async (file)=> 
                {const text = await file.text();
                 result = parse(text, {header: true})
                    console.log(result)
                setAssets(result.data)
                 machineLearning(result.data)
                })
                
        console.log(assets)
    }
    const onSubmit = ()=> {

        // Get data from select and date range 
       
        console.log(numOfDays)
        console.log(symbol)
        console.log(epochs)

        //const { data, isFetching} = useGetPredictQuery({start: start, end: end, epochs: epochs, symbol: symbol})
        setXy(true)



    }
    function onChangeSel(value) {
        console.log(`selected ${value}`);
        setEpochs(value)
      }
      
      function onSearch(val) {
        console.log('search:', val);
      }

    const machineLearning = (assets) => {

        setAssets(existing => [...existing, ...result.data])
        console.log(assets)
        assets.forEach(asset => {
            // after reading the file, we can do machine learning here
            if (asset.Close > asset.Open) {
                obv += parseInt(asset.Volume)
            }
            console.log(obv)
            if (asset.Close < asset.Open) {
                obv -= parseInt(asset.Volume)
            }
            
            obv = obv/1000000
            console.log(obv)
            

        })
        /*In the book, Greenblatt outlines two criteria for stock investing: 
        Stock price and company cost of capital. Instead of conducting fundamental analysis of companies and stocks,
        investors use Greenblatt's online stock screener tool to select the 20 to 30 top-ranked companies in which to invest.
        Company rankings are based on:


        Their stock's earnings which are calculated as earnings before interest and taxes (EBIT).
        Their yield, calculated as earnings per share (EPS) divided by the current stock price.
        Their return on capital measures how efficiently they generate earnings from their assets.
        */
      
    }
    const onChangeSymbol = (e) => {
        
        setSymbol(e.target.value)
        console.log(symbol)
    } 

    const fibonnaciSequence = (num) => {
        //Fibonacci sequence
            var a = 1, b = 0, temp;
            var seq = []
            while (num > 0){
                temp = a;
                a = a + b;
                b = temp;
                seq.push(b)
                num--;
            }
            return seq;
        }
    
    


    const priceToEarnings = (price, costOfCapital) => {
        return price / costOfCapital
    }
    const earningsToYield = (earnings, price) => {
        return earnings / price
    }
    const returnOnCapital = (earnings, assets) => {
        return earnings / assets
    }
    
    const getPrice = (assets) => {
        return assets.map(asset => asset.price)
    }

    const priceToBook = (price, book) => {
        return price / book
    }
    const earningsPerShare = (netIncome, prefDiv, edcso ) => {
        // EDCSO stands for end of year common shares outstanding
        const eps = (netIncome - prefDiv) / edcso
        return eps
    }
    

    const onChangeNumOfDays = (e) => {
        setNumOfDays(e.target.value)
    }



    // Volume Drives Price Upwards 
    const onBalanceVolume = (assets) => {
        assets.forEach(asset => {
            
            if (asset.Close > asset.Open) {
                obv += parseInt(asset.Volume)
            }
            console.log(obv)
            if (asset.Close < asset.Open) {
                obv -= parseInt(asset.Volume)
            }
            if (asset.Close === asset.Open) {
                obv = parseInt(asset.Volume)
            }
        })
        console.log(obv);
    }
    /*
    if (isFetching){
        return 'Loading...';
    }*/
    return (
        <div style = {{ marginLeft:"30%"}}>
            <form onSubmit={handleSubmit(onSubmit)}>
            {/*<input type ="file" {...register('test', { required: true })} onChange={(e)=>{onChange(e)}}></input>*/}
            <label>Symbol</label>
            <Input placeholder="Basic usage" defaultValue={symbol} onChange={onChangeSymbol} />
            <label>Select Number of Days in future</label>
            
            <Input placeholder="Basic usage" defaultValue={numOfDays} onChange={onChangeNumOfDays} />
            <br/>
            <label>Epochs: </label>
            
            <Select
                showSearch
                placeholder="Select a person"
                optionFilterProp="children"
                onChange={onChangeSel}
                onSearch={onSearch}
                filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                <Option value = "1">1</Option>
                <Option value = "2">2</Option>
                <Option value = "3">3</Option>
                <Option value = "4">4</Option>
                <Option value = "5">5</Option>
                <Option value = "10">10</Option>
                <Option value = "20">20</Option>
                <Option value = "30">30</Option>
                <Option value = "40">40</Option>
                <Option value = "50">50</Option>
            </Select>
            <Button type="primary" htmlType="submit" >
                Submit
            </Button>
           </form>
                

                {xy? <div>
                    {console.log(symbol,epochs)}
                    <MachineLearn symbol = {symbol} numOfDays={numOfDays} epochs = {epochs}/></div>: null}
           
          
        </div>
        
    )
}

