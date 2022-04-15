
import React from 'react'
import {useForm} from 'react-hook-form'
import Button from '@material-ui/core/Button'
import {parse} from 'papaparse';
import { useDispatch } from 'react-redux'
import { useGetStockBusinessDetailsQuery } from '../services/yahooRecommmend'
import { DatePicker, Space, Input, Select } from 'antd';
import { useGetPredictQuery } from '../services/pricePrediction';
import MachineLearn from './MachineLearning';
import { Checkbox } from 'antd';
import { Collapse } from 'antd';


const { Panel } = Collapse;

const { Option } = Select;
const { RangePicker } = DatePicker;
//import {actionTypes }from '../../Store/result/actions';

export default function FileUpload(props) {
   
    const {register, handleSubmit} = useForm()
    const [assets, setAssets] = React.useState([])
    const [file, setFile] = React.useState()
    var obv = 0;
    const dispatch = useDispatch()
    //const {datax, isFetching} = useGetStockBusinessDetailsQuery({symbol: "BTC/USD"})
    var i=0;
    var data = data?.data?.data;
    console.log(i)
    //console.log(datax)
    const [symbol, setSymbol] = React.useState(props.symbol)
    const [epochs , setEpochs] = React.useState(1)
    const [numOfDays, setNumOfDays] = React.useState(1)
    const [saveModel, setSaveModel] = React.useState(true)
    const [useModel, setUseModel] = React.useState(true)
    const [diffdate , setDiffdate] = React.useState(null)
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
    const onChangeStart = (date) => {
        console.log(date)
        setDiffdate(date._d)
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
        setNumOfDays(e)
    }

    const onChangeSaveModel = (e) => {
        console.log(e.target.checked)
        setSaveModel(e.target.checked)
    }
    const onChangeUseModel = (e) => {
        console.log(e.target.checked)
        setUseModel(e.target.checked)
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
    const selectStyle = {
        width: '100%',
        marginBottom: '10px',
        marginTop: '10px',

    }
    const inputStyle = {
        width: '100%',
        marginBottom: '10px',
        marginTop: '10px',
    }
    const buttonStyle = {
        marginTop: '10px',
        marginBottom: '10px',
        width: '100%',
        height: '100%',
        backgroundColor: '#00bcd4',
        color: 'white',
        fontSize: '20px',
        borderRadius: '10px',
        border: 'none',
        cursor: 'pointer',
        outline: 'none',
        boxShadow: '0px 0px 10px #00bcd4',
        transition: 'all 0.3s ease-in-out'  
    }
    const labelStyle = {
        fontSize: '20px',
        marginBottom: '10px',
        marginTop: '10px',
    }
    /*
    if (isFetching){
        return 'Loading...';
    }*/
    return (
        <div style = {{ marginLeft:"1%", padding : "25px"}}>
            <form onSubmit={handleSubmit(onSubmit)}>
            {/*<input type ="file" {...register('test', { required: true })} onChange={(e)=>{onChange(e)}}></input>*/}
            <label style = {labelStyle}>Symbol:</label>
            <Input placeholder="Basic usage" style = {inputStyle} defaultValue={symbol} onChange={onChangeSymbol} />
            <br/>
            <label style = {labelStyle}>Number Of Days:</label>
            <Select 
                style = {selectStyle}
                showSearch
                value = {numOfDays}
                optionFilterProp="children"
                onChange={onChangeNumOfDays}
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                <Option value="1">1</Option>
                <Option value="2">2</Option>
                <Option value="3">3</Option>
                <Option value="4">4</Option>
                <Option value="5">5</Option>
                <Option value="6">6</Option>
                <Option value="7">7</Option>
                <Option value="8">8</Option>
                <Option value="9">9</Option>
                <Option value="10">10</Option>
                <Option value="20">20</Option>
                <Option value="30">30</Option>
                <Option value="40">40</Option>
                <Option value="50">50</Option>
                <Option value="75">75</Option>
                <Option value="100">100</Option>
            </Select>

            
           
            <br/>
            <label style = {labelStyle}>Epochs: </label>
            
            <Select
                style = {selectStyle}
                showSearch
                value = {epochs}
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
            <br/>
            <Button style = {buttonStyle}type="primary" htmlType="submit" >
                Submit
            </Button>
                <Collapse ghost>
                    <Panel header="Advanced Options" key="1">
                    <div>
                    <p>Load previous training into the model  <Checkbox onChange = {onChangeUseModel}defaultChecked ></Checkbox>   </p>
                  
                    <p>Save your training into the model  <Checkbox onChange= {onChangeSaveModel}defaultChecked></Checkbox>  </p>
            
                    <p>Change the start date (6 months ago by default)</p>
                   
                    <DatePicker onChange={(e)=>onChangeStart(e)} />
                    <p>Change the end date (today by default)</p>
                   
                    <DatePicker onChange={(e)=>onChangeStart(e)} />
                    </div>
                    
                </Panel>
                </Collapse>
           </form>
                

                {xy? <div>
                    {console.log(symbol,epochs)}
                    <MachineLearn save = {saveModel} use ={ useModel } diffdate={diffdate} symbol = {symbol} numOfDays={numOfDays} epochs = {epochs}/></div>: null}
           
          
        </div>
        
    )
}

