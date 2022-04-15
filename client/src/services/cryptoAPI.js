import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const cryptoApiHeaders = {
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
    'X-RapidAPI-Key': '8ae76c8c78msha78350991b984fbp1ae047jsnab39811a40a4'
}

const baseUrl = 'https://coinranking1.p.rapidapi.com'



//const baseUrl = 'https://api.coinranking.com/v2'

const createRequest = (url) => ({
    url , headers : cryptoApiHeaders
})

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints : (builder) => ({
        getCryptos: builder.query({
            query : (count) => createRequest(`/coins?limit=50`),
        }),
        getCryptoDetails: builder.query({
            query : (coinId) => createRequest(`/coin/${coinId}`)
        }),
        getCryptoPriceHistory: builder.query({
            query : ({coinId,timeperiod}) => createRequest(`/coin/Qwsogvtv82FCd/history?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h`)
        }),
    })
})

export const { 
    useGetCryptosQuery,
} = cryptoApi


export const { 
    useGetCryptoDetailsQuery,
} = cryptoApi

export const {
    useGetCryptoPriceHistoryQuery,
} = cryptoApi



// This creates a hook which allows you to make API requests 


