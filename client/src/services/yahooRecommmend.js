import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'




const apikey = {
    "x-api-key" : "sS4iNusyPrPDa9LLGIdA2rNlSBcpAIrafsBVms10" ,
    //'Access-Control-Allow-Origin':'*',
    //"Origin": "http:://localhost:3000",
    //"access-control-allow-origin": 'true',
    "method": "GET",
    "mode": "cors",
    "Access-Control-Allow-Origin": "*",
    //"Access-Control-Allow-Credentials": "true",
    //"Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
    //"Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    
};
const baseUrl = 'https://yfapi.net';

const createRequest = (url) => ({
    url , headers : apikey
})

console.log("called");
export const yahooRecommmend = createApi({
    reducerPath: 'yahooRecommmend',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints : (builder) => ({
        getStockInfo: builder.query({
            query : (symbol) => createRequest(`/v6/finance/quote?symbols=${symbol}`)
        }),
        getStockQuote: builder.query({
            query : ({symbol}) => createRequest(`/v6/finance/quote?symbols=${symbol}`)
        }),
        getStocks: builder.query({
            query : ({symbol}) => createRequest(`/v6/finance/recommendationsbySymbol${symbol}`)
        }),
        getStockSpark: builder.query({
            query : ({symbol}) => createRequest(`/v8/finance/spark?symbols=${symbol}`)
        }),
        getStockBusinessDetails: builder.query({
            query : ({symbol}) => createRequest(`/ws/insights/v1/finance/insights?symbol=${symbol}`)
        }),
        getStocksTrending: builder.query({
            query : ({region}) => createRequest(`/v1/finance/trending/${region}`)
        }),
        /*
        getStockData: builder.query({
            query : ({symbol}) => createRequest(`/v1/finance/quote/symbols?=${symbol}`)
        }),
        */

    })
})
export const { 
    useGetStockBusinessDetailsQuery,
} = yahooRecommmend

export const {
    useGetStockSparkQuery,
} = yahooRecommmend

export const { 
    useGetStocksQuery,
} = yahooRecommmend

export const {
    useGetStocksTrendingQuery,
} = yahooRecommmend

export const {
    useGetStockInfoQuery,
} = yahooRecommmend

export const {
    useGetStockQuoteQuery,
} = yahooRecommmend
/*
export const {
    useGetStockDataQuery,
} = yahooRecommmend
*/
// This creates a hook which allows you to make API requests 