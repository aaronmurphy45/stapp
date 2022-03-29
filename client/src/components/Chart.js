import React from 'react'
import { useGetStockSparkQuery } from '../services/yahooRecommmend'
import { Line } from 'react-chartjs-2';
import { Chart, registerables} from 'chart.js';

Chart.register(...registerables);

const Chartx = (props) => {
    
   

    if (props.close == undefined) {
        return <div>Loading...</div>
    }
    if (props.timestamp == undefined) {
        return <div>No data</div>
    }
    if (props.symbol == null) {
        return <div>No data</div>
    }


    
    const x = props.close
    var y = props.timestamp.map(x => {
        const date = new Date(x)
        // get just the time 
        
        //var s = new Date(x * 1000).toLocaleDateString("en-US")
        var s = x;
        

        

       
        return s
    })

    // reverse the array
    y.reverse()
    
    

    const data = {
        labels: y,
        datasets : [
            {
                label : '',
                fill: false,
                data: x,
                lineTension: 0.1,
                
                backgroundColor: 'rgb(65,143,247)',
                borderColor: 'rgb(65,143,247)',
                borderCapStyle: 'butt',
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
    <Line data = {data} options = {options} ></Line>
  )
}


export default Chartx;