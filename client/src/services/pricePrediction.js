import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

//const apikey = "coinranking0de0d139cced1bc906413bf5415a7786d0eaae38b44a7e27"

//const baseUrl = 'https://coinranking1.p.rapidapi.com'


const baseUrl = 'http://127.0.0.1:8000/project/'
const cryptoApiHeaders = {
}

const createRequest = (url) => ({
    url , headers : cryptoApiHeaders
})

export const predictApi = createApi({
    reducerPath: 'predictApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints : (builder) => ({
        getPredict: builder.query({
            query : ({symbol, epochs,numOfDays,diffdate, use, save}) => createRequest(`?epochs=${epochs}&symbol=${symbol}&lookup_step=${numOfDays}&start=&end=&use=${use}&save=${save}`),
        }),
    })
})

export const { 
    useGetPredictQuery,
} = predictApi






// This creates a hook which allows you to make API requests 


