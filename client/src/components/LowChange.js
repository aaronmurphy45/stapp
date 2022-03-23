import React, {useState, useEffect} from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Input } from 'antd'
import { useGetCryptosQuery } from '../services/cryptoAPI'

export default function LowChange({simplified}) {
    
    //const {data :cryptosList, isFetching } = useGetCryptosQuery(100);
    const [cryptos, setCryptos ] = React.useState([])
    const cryptosList = crypto;
    const isFetching = false;

    const [searchTerm, setSearchTerm] = useState('')

    let highchangex = [];

    const [highChange, setHighChange] = useState();

    


    useEffect(()=> { 
        //setCryptos(cryptosList?.data?.coins)

        const filteredData = cryptosList?.data?.coins.filter((coin)=> coin.name.toLowerCase().includes(searchTerm.toLowerCase()))

        setCryptos(filteredData)
        // sort cryptos by high change

        const sortedData = filteredData?.sort((a,b)=> b.change - a.change)
        if (sortedData){
            if (simplified == true){
                //remove all but the top 10
                sortedData.reverse();
                setHighChange(sortedData.slice(0,8))
    
                //highchangex = sortedData.slice(0,10)
            }
            else {
                sortedData.reverse();
                setHighChange(sortedData)
            }
        }
        
        //highchangex = sortedData
        

    }, [cryptosList, searchTerm])
    if (isFetching){
        return 'Loading...'
    }
    return (
        <> {!simplified ? <div className = "search-crytpo">
        <Input placeholder = "Search" onChange = {(e)=> setSearchTerm(e.target.value)}></Input>
    </div>
    : <div></div> }
            
            <Row gutters = {[32,32]} className = "crypto-card-container">
                {highChange?.map((currency)=> (
                    <Col xs ={24} sm={12} lg={6} className ="crypto-card" key ={currency.id}>
                        <Link to = {`/crypto/${currency.id}`}>
                            <Card 
                            title =  {`${currency.name}`}
                            extra = {<img className = 'crypto-image' src = {currency.iconUrl}></img>}
                            hoverable
                            >
                                <p>Price: {millify(currency.price)}</p>
                                <p>Market Cap: {millify(currency.marketCap)}</p>
                                <p>Daily Change: {millify(currency.change)}</p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    )
}
