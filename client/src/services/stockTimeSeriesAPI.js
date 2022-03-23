import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'



const baseUrl = 'https://api.twelvedata.com/';

const apikey = "bcfdec8d315042f8a2af33b04656263d";



const createRequest = (url) => ({
    url 
})

console.log("called");
export const stockTimeSeriesApi = createApi({
    reducerPath: 'stockTimeSeriesApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints : (builder) => ({
        getStockTimeSeries: builder.query({
            query : ({symbol, interval}) => createRequest(`/time_series?symbol=${symbol}&interval=${interval}&apikey=${apikey}`)
        })
    })
})


export const { 
    useGetStockTimeSeriesQuery,
} = stockTimeSeriesApi



// This creates a hook which allows you to make API requests 