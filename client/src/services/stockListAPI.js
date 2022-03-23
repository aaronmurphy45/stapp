import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const headersx = {
    'x-rapidapi-host': 'twelve-data1.p.rapidapi.com',
    'x-rapidapi-key': '906ab71e6amsh5ee0a63d7fa3c16p15ceb9jsn6c720da7ca33'
}

const baseUrl = 'https://twelve-data1.p.rapidapi.com';

const apikey = "bcfdec8d315042f8a2af33b04656263d";


const createRequest = (url) => ({
    url , headers : headersx
})

console.log("called");
export const stockListApi = createApi({
    reducerPath: 'stockListApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints : (builder) => ({
        getStocks: builder.query({
            query : ({country, exchange, symbol, format, type}) => createRequest(`/stocks?country=${country}&symbols=${symbol}&format=${format}&type=${type}`)
        }),
        getStockLogo : builder.query({
            query: ({symbol}) => createRequest(`/logo?symbol=${symbol}`)
        })
    })
    /*
    endpoints : (builder) => ({
        getStocksTimeSeries: builder.query({
            query : ({symbol, interval}) => createRequest(`/time_series?symbol=${symbol}&interval=${interval}&apikey=${apikey}`)
        })
    })*/
})

export const { 
    useGetStocksQuery,
} = stockListApi
export const {
    useGetStockLogoQuery,
}= stockListApi
/*
export const { 
    useGetStocksTimeSeriesQuery,
} = stockListApi
*/


// This creates a hook which allows you to make API requests 