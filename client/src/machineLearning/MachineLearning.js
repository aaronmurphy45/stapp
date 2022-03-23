

import React from 'react'
import { useGetStockBusinessDetailsQuery, useGetStocksQuery } from '../services/yahooRecommmend'
import { useGetPredictQuery } from '../services/pricePrediction'



export default function MachineLearn(props) {

  console.log("props")
  console.log(props)

  console.log(props.symbol)
  console.log(props.epochs)

  const { data, isFetching } = useGetPredictQuery({epochs: props.epochs, symbol: props.symbol, numOfDays: props.numOfDays})
  
 

  /*
  const { datax, isFetching } = useGetStockBusinessDetailsQuery({ symbol: "BTC/USD" })
  //const { datay, isFetching2 } = useGetStocksQuery({ symbol: "BTC/USD" })

  console.log(datax)
  //console.log(datay)

  const [dividends, setDividends] = React.useState(0)
  const [earnings, setEarnings] = React.useState(0)
  const [price, setPrice] = React.useState(0)
  const [book, setBook] = React.useState(0)

  const [stockgood, setStockgood] = React.useState(0)
  const [stockbad, setStockbad] = React.useState(0)
  const [stockneutral, setStockneutral] = React.useState(0)

  // 1
  const dividendToPriceRatio = (dividend, price) => {
    return dividend / price
  }
  // 2 
  const priceToEarningsRatio = (price, earnings) => {
    return price / earnings
  }
  //3 
  const priceToBookRatio = (price, book) => {
    return price / book
  }
  //4 Price sector average. 
  const priceSectorAverage = (price, sector) => {
    return price / sector
  }
  //5 
  const profitability = (earnings, price) => {
    return earnings / price
  }
  //6
  const priceToSalesRatio = (price, sales) => {
    return price / sales
  }
  //7 
  
 




  /*
  if (stockgood) // switch statement
  return (
    <div>
      
    </div>
  )
  if (stockbad)
  return (
    <div>
      
    </div>
  )
  */

  if (isFetching) {
    return 'Loading...'
  }
  
  return (
    <div>
      <p>{data.data}</p>
     
    </div>
  )

}











//dividend-price ratio, the price-to-earnings ratio, the cyclically adjusted price-to-earnings ratio, GDP acceleration, the natural rate of unemployment, inflation, house price growth and consumer sentiment.

// return whatever the prediction price is 



