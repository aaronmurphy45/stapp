import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const cryptoApiHeaders = {
   
    'X-RapidAPI-Host': 'yh-finance.p.rapidapi.com',
    'X-RapidAPI-Key': '906ab71e6amsh5ee0a63d7fa3c16p15ceb9jsn6c720da7ca33'
   
    
}


//const baseUrl = 'https://coinranking1.p.rapidapi.com'


const baseUrl = 'https://yh-finance.p.rapidapi.com'

const createRequest = (url) => ({
    url , headers : cryptoApiHeaders
})

export const yhFinApi = createApi({
    reducerPath: 'yhFinApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints : (builder) => ({
        getTrending: builder.query({
            query : () => createRequest(`/market/get-trending-tickers`)
        })
    })
})

export const { 
    useGetTrendingQuery,
} = yhFinApi




// This creates a hook which allows you to make API requests 


