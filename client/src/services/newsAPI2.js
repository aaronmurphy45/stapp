import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const cryptoApiHeaders = {
    'X-RapidAPI-Host': 'google-news1.p.rapidapi.com',
    'X-RapidAPI-Key': '906ab71e6amsh5ee0a63d7fa3c16p15ceb9jsn6c720da7ca33'
}

const baseUrl ='https://google-news1.p.rapidapi.com'

const createRequest = (url) => ({
    url , headers : cryptoApiHeaders
})

export const newsAgainApi = createApi({
    reducerPath: 'newsAgainApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints : (builder) => ({
        getGoogleNews: builder.query({
           query : (keyword) => createRequest(`/search?q=${keyword}&country=US&lang=en`),
        })
    })
})


// This creates a hook which allows you to make API requests 

export const {
    useGetGoogleNewsQuery,
} = newsAgainApi