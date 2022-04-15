import { configureStore } from '@reduxjs/toolkit'

import { cryptoApi } from '../services/cryptoAPI';
import { cryptoNewsApi } from '../services/cryptoNewsAPI';
import { stockListApi } from '../services/stockListAPI';
import { stockTimeSeriesApi } from '../services/stockTimeSeriesAPI';
import { yahooRecommmend } from '../services/yahooRecommmend';
import { predictApi } from '../services/pricePrediction';
import { mmApi } from '../services/alphaVantage';
import { autoComplete } from '../services/autoComplete';
import { yhFinApi } from '../services/yhFin';
import { twitterScrape } from '../services/twitterScrape';
import { currencyConvert } from '../services/currencyConverter';
import { businessApi } from '../services/businessDetails';
import { newsAgainApi } from '../services/newsAPI2';


export default configureStore({
    reducer : {
        [cryptoApi.reducerPath]: cryptoApi.reducer,
        [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
        [stockListApi.reducerPath]: stockListApi.reducer,
        [stockTimeSeriesApi.reducerPath]: stockTimeSeriesApi.reducer,
        [yahooRecommmend.reducerPath]: yahooRecommmend.reducer,
        [predictApi.reducerPath]: predictApi.reducer,
        [autoComplete.reducerPath]: autoComplete.reducer,
        [yhFinApi.reducerPath]: yhFinApi.reducer,
        [twitterScrape.reducerPath]: twitterScrape.reducer,
        [currencyConvert.reducerPath]: currencyConvert.reducer,
        [businessApi.reducerPath]: businessApi.reducer,
        [newsAgainApi.reducerPath]: newsAgainApi.reducer,


    },
});
