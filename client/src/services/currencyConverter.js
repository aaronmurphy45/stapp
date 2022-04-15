


import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const cryptoApiHeaders = {
    'X-RapidAPI-Host': 'currency-converter5.p.rapidapi.com',
    'X-RapidAPI-Key': '8ae76c8c78msha78350991b984fbp1ae047jsnab39811a40a4'
}


const baseUrl = 'https://currency-converter5.p.rapidapi.com/currency'


//const baseUrl = 'https://api.coinranking.com/v2'

const createRequest = (url) => ({
    url , headers : cryptoApiHeaders
})

export const currencyConvert = createApi({
    reducerPath: 'currencyConvert',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints : (builder) => ({
        getCurrencyCon: builder.query({
            query : (symbol) => createRequest(`/convert?from=EUR&to=${symbol}amount=1`),
        }),
       
    })
})

export const {
    useGetCurrencyConQuery,
} = currencyConvert





// This creates a hook which allows you to make API requests 


