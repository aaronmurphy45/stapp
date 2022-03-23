
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const cryptoApiHeaders = {
    //'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    //'x-access-token': 'coinranking0de0d139cced1bc906413bf5415a7786d0eaae38b44a7e27',
    mode: 'no-cors'
    //'Access-Control-Allow-Origin': '*'
}
const apikey = "237MO24SLK0ZDHJ0"

//const baseUrl = 'https://coinranking1.p.rapidapi.com'


const baseUrl = 'https://api.coinranking.com/v2'

const createRequest = (url) => ({
    url , headers : cryptoApiHeaders
})

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints : (builder) => ({
        getCryptos: builder.query({
            query : (count) => createRequest(`/coins?x-access-token=${apikey}`)
        }),
        getCryptoDetails: builder.query({
            query : (coinId) => 
            createRequest(`/coin/${coinId}`)
        })
    })
})

export const { 
    useGetCryptosQuery,
} = cryptoApi


export const { 
    useGetCryptoDetailsQuery,
} = cryptoApi

