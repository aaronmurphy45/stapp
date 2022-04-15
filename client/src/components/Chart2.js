import React from 'react'
import { useGetStockSparkQuery } from '../services/yahooRecommmend'
import { useGetStockTimeSeriesQuery } from '../services/stockListAPI';
import { Line } from 'react-chartjs-2';
import { Chart, registerables} from 'chart.js';
import { Button, Select, Spin } from 'antd';
import { useEffect } from 'react';

const Option = Select.Option;


Chart.register(...registerables);

const Chart2 = (props) => {

    if (props.kag) {
        const widthx ="50%";
    } else {
        const widthx ="100%";
    }


    //const {data , isFetching} = useGetStockSparkQuery(props.symbol)
    const [interval, setInterval] = React.useState("1h");

    
    const sx = props.symbol;
 

    //const {datax, isFetching, error} = useGetStockTimeSeriesQuery({symbol: props.symbol, interval: interval})
    
    const { data: datax, isFetching, error } = useGetStockTimeSeriesQuery({symbol: sx, interval: interval});
    
    var close = []
    var timestamp = []


    useEffect(() => {
    
    }, [ interval])
        

    if (datax){
        timestamp = datax?.values?.map(item => item.datetime)
        close = datax?.values?.map(item => item.close)
       
    }


    if (error){
        return <div>Error</div>
    }

    
    
    if (isFetching) {
        return <Spin style = {{width:"100%"}}/>
    }
   /*
    if (props.symbol == null) {
        return <div>No data</div>
    }
    */

    
    if (datax){
        var x = close;
    }
    var y = timestamp?.map(x => {



        // if time
        const date = new Date(x)
        // get just the time 
        
        //var s = new Date(x * 1000).toLocaleDateString("en-US")

        try {
            var s = x.slice(10, 16);
        }
        catch (e) {
            var s = x;
        }

        

       
        return s
    })

   

    const onSeletChange = (value) => {
       
        setInterval(value);
    }

    // reverse the array
    //
   

    
    

    const data = {
        labels: y,
        datasets : [
            {
                label : "Price",
                fill: false,
                data: x,
                lineTension: 0.1,
                
                backgroundColor: 'rgb(65,143,247)',
                borderColor: 'rgb(65,143,247)',
                borderCapStyle: 'butt',
                height: '100%',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                spanGaps: false,

            }
        ]
    }
    const options = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }



    

  return (
    <div >
    <h1>{sx} Chart </h1>
    
    <Select defaultValue="1h" style={{ width: 120 }} onChange={(e) =>
        onSeletChange(e)}>
        <Option value="1min">1m</Option>
        <Option value="5min">5m</Option>
        <Option value="15min">15m</Option>
        <Option value="30min">30m</Option>
        <Option value="1h">1h</Option>
        
    </Select>
   
    <Line data = {data} options = {options} ></Line>
    
    
    </div>
  )
}


export default Chart2;