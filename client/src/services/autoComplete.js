import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const cryptoApiHeaders = {
   
   
   
    
}


const baseUrl = 'https://ticker-2e1ica8b9.now.sh'


const createRequest = (url) => ({
    url , headers : cryptoApiHeaders
})

export const autoComplete = createApi({
    reducerPath: 'autoComplete',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints : (builder) => ({
        getAutoComplete: builder.query({
            query : (keyword) => createRequest(`/keyword/${keyword}`)
        })
       
    })
})

export const {
    useGetAutoCompleteQuery,
} = autoComplete





// This creates a hook which allows you to make API requests 


