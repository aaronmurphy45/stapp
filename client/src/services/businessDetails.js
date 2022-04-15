import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const cryptoApiHeaders = {
    'X-RapidAPI-Host': 'yahoofinance-stocks1.p.rapidapi.com',
    'X-RapidAPI-Key': '906ab71e6amsh5ee0a63d7fa3c16p15ceb9jsn6c720da7ca33'
}

const baseUrl = 'https://yahoofinance-stocks1.p.rapidapi.com'



//const baseUrl = 'https://api.coinranking.com/v2'

const createRequest = (url) => ({
    url , headers : cryptoApiHeaders
})

export const businessApi = createApi({
    reducerPath: 'businessApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints : (builder) => ({
        getAnnualIncome: builder.query({
            query : (symbol) => createRequest(`/financialstatements/annual-income?Symbol=${symbol}`),
        }),
        getAnnualBalanceSheet: builder.query({
            query : (symbol) => createRequest(`/financialstatements/annual-balancesheet?Symbol=${symbol}`),
        }),
        getAnnualCashFlow: builder.query({
            query : (symbol) => createRequest(`/financialstatements/annual-cashflow?Symbol=${symbol}`),
        }),
        getQuarterlyIncome: builder.query({
            query : (symbol) => createRequest(`/financialstatements/quarterly-income?Symbol=${symbol}`),
        }),
        getQuarterlyBalanceSheet: builder.query({
            query : (symbol) => createRequest(`/financialstatements/quarterly-balancesheet?Symbol=${symbol}`),
        }),
        getQuarterlyCashFlow: builder.query({
            query : (symbol) => createRequest(`/financialstatements/quarterly-cashflow?Symbol=${symbol}`),
        }),

    })
})


export const {
    useGetAnnualIncomeQuery,
} = businessApi

export const {
    useGetAnnualBalanceSheetQuery,
} = businessApi

export const {
    useGetAnnualCashFlowQuery,
} = businessApi

export const {
    useGetQuarterlyIncomeQuery,
} = businessApi

export const {
    useGetQuarterlyBalanceSheetQuery,
} = businessApi
export const {
    useGetQuarterlyCashFlowQuery,
} = businessApi


// This creates a hook which allows you to make API requests 


