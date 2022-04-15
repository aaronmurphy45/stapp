import React from 'react'
import { useGetStockProfileQuery } from '../services/stockListAPI'

export default function Profile(props) {


    const {data, isFetching } = useGetStockProfileQuery(props.stockid)

    console.log(data)

    const panelStyle = {
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        borderRadius: '5px',
        padding: '10px',
        boxShadow: '0px 0px 1px 0px rgba(0,0,0,0.75)',
        maxHeight: "200vh",
        overflowY: "scroll",
        overflowX: "scroll",
    }

    
  return (
    <div>
        {data ? (
            <div >
               <p>CEO : <b>{data.CEO}</b></p>
               <p> Address : <b>{data.address}</b></p>
               <p>City : <b>{data.city}</b></p>
               <p>Country : <b>{data.country}</b></p>
               <p>Employees : <b>{data.employees}</b></p>
                <p>Exchange : <b>{data.exchange}</b></p>
                <p>Industry : <b>{data.industry}</b></p>
                <p>Name : <b>{data.name}</b></p>
                <p>Phone : <b>{data.phone}</b></p>
                <p>Sector : <b>{data.sector}</b></p>
                <p>Symbol : <b>{data.symbol}</b></p>
                <p>Website : <b>{data.website}</b></p>
                <p>Zip : <b>{data.zip}</b></p>
                <p>Description : <b>{data.description}</b></p>
            </div>
        ) : (
            <div>
                <h1>Loading...</h1>
            </div>
        )}
    </div>



  )
}
