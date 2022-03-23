import React, {useState, useEffect} from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Input } from 'antd'
import { useGetStocksQuery } from '../services/yahooRecommmend';

//import Loading from "../../public/Spinner.gif"

import { useGetStockTimeSeriesQuery } from '../services/stockTimeSeriesAPI'

export default function NASDAQ({simplified}) {
    
    console.log("Stocks")
    const count = simplified ? 10: 100;

    const top100 = "AAPL,ADBE,ADI,ADP,ADSK,AEP,ALGN,AMAT,AMD,AMGN,AMZN,AMSS,ASML,ATVI,AVGO,BIDU,BIIB,BKNG,CDNS,CDW,CERN,CHKP,CHTR,CMCSA,COST,CPRT,CRWD,CSCO,CSX,CTAS,CTSH,DLTR,DOCU,DXCM,EA,EBAY,EXC,FAST,FB,FISV,FOX,,FOXA,GILD,GOOG,GOOGL,HON,IDXX,ILMN,INCY,INTC,INTU,ISRG,JD,KDP,KHC,KLAC,LRCX,LULU,MAR,MCHP,MDLZ,MELI,MNST,MRNA,MRVL,MSFT,MTCH,MU,NFLX,NTES,NVDA,NXPI,OKTA,NXPI,ORLY,PAYX,PCAR,PDD,PEP,PTON,PYPL,QCOM,REGN,ROST,SBUX,SGEN,SIRI,SNPS,SPLK,SWKS,TCOM,TEAM,TMUS,TSLA,TXN,VRSK,VRSN,VRTX,WBA,WDAY,XEL,ZM"
    const top10 = "AAPL,AMZN,MSFT,FB,GOOGL,GOOG,TSLA,NVDA";

    const top10array = ["AAPL","AMZN","MSFT","FB","GOOGL","GOOG","TSLA","NVDA"];

    const [country, setCountry] = React.useState("");
    const [exchange, setExchange] = React.useState("NASDAQ");
    const [interval, setInterval] = React.useState("1min");

    const [symbol, setSymbol] = React.useState(top10);
    const [type, setType] = React.useState("");
    const format = "json";
    /*
    if (count == 10){
        setSymbol(top10)
    }
    else{
        setSymbol(top100)
    }
    */
   top10array.map((stock=>{
       
   }))

    //const {data :stocksList, isFetching } = useGetStocksQuery({symbol,interval});

    const stocksList = []
    const isFetching = true;
    //console.log(state)
    console.log(stocksList)


    const [stocks, setStocks ] = React.useState([])

    const [searchTerm, setSearchTerm] = useState('')
    console.log(stocks)


    useEffect(()=> { 
        //setCryptos(cryptosList?.data?.coins)
        //set(cryptosList?.data?.coins)

        // Makee stocks a list version o

        const filteredData = stocksList?.data?.filter((stock)=>stock.meta.name.toLowerCase().includes(searchTerm.toLowerCase()))

    
        setStocks(stocksList)
    }, [stocksList, searchTerm])
    
    if (isFetching){
        return 'Loading...'
    }
    return (
        <> {simplified ? <div className = "search-crytpo">
        <Input placeholder = "Search" onChange = {(e)=> setSearchTerm(e.target.value)}></Input>
    </div>
    : <div></div> }
            <Row gutters = {[32,32]} className = "crypto-card-container">
                {stocks?.map((stock)=> (
                    <Col xs ={24} sm={12} lg={6} className ="crypto-card" key ={stock.id}>
                       {/* <Link to = {`'/crypto/${currency.id}'`}> */}
                       {console.log(stock)}
                            <Card 
                            title = { `${stock.name}`}
                            >
                                <p>
                                    Exchange: {(stock.meta.exchange)} <br/>
                                    Symbol: {(stock.meta.symbol)}  <br/>
                                    Country: {(stock.meta.country)}  <br/>
                                    Currency: {(stock.meta.currency)}
                                </p>
                            </Card>
                        {/*</Link>*/}
                        
                    </Col>
                ))}
            </Row>
        </>
    )
}
