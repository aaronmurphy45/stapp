import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const cryptoApiHeaders = {
    'x-bingapis-sdk': 'true',
    'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
    'x-rapidapi-key': '906ab71e6amsh5ee0a63d7fa3c16p15ceb9jsn6c720da7ca33'
}

const baseUrl = 'https://bing-news-search1.p.rapidapi.com'

const createRequest = (url) => ({
    url , headers : cryptoApiHeaders
})

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints : (builder) => ({
        getCryptoNews: builder.query({
            query : ({ search, count}) => createRequest(`/news/search/?q=${search}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`)
        })
    })
})

export const { 
    useGetCryptoNewsQuery,
} = cryptoNewsApi


// This creates a hook which allows you to make API requests 