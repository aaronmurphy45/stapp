import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const cryptoApiHeaders = {
    'X-RapidAPI-Host': 'twitter-scraper2.p.rapidapi.com',
    'X-RapidAPI-Key': '8ae76c8c78msha78350991b984fbp1ae047jsnab39811a40a4'
   
    
}


const baseUrl = 'https://twitter-scraper2.p.rapidapi.com/api/v1/search'


//const baseUrl = 'https://api.coinranking.com/v2'

const createRequest = (url) => ({
    url , headers : cryptoApiHeaders
})

export const twitterScrape = createApi({
    reducerPath: 'twitterScrape',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints : (builder) => ({
        getTwitterScrape: builder.query({
            query : ({searchTerm, maxTweets}) => createRequest(`?searchTerm=${searchTerm}&maxTweets=${maxTweets}`),
        }),
       
    })
})

export const { 
    useGetTwitterScrapeQuery,
} = twitterScrape






// This creates a hook which allows you to make API requests 


