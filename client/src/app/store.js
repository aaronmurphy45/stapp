import { configureStore } from '@reduxjs/toolkit'

import { cryptoApi } from '../services/cryptoAPI';
import { cryptoNewsApi } from '../services/cryptoNewsAPI';
import { stockListApi } from '../services/stockListAPI';
import { stockTimeSeriesApi } from '../services/stockTimeSeriesAPI';
import { yahooRecommmend } from '../services/yahooRecommmend';
import { predictApi } from '../services/pricePrediction';


export default configureStore({
    reducer : {
        [cryptoApi.reducerPath]: cryptoApi.reducer,
        [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
        [stockListApi.reducerPath]: stockListApi.reducer,
        [stockTimeSeriesApi.reducerPath]: stockTimeSeriesApi.reducer,
        [yahooRecommmend.reducerPath]: yahooRecommmend.reducer,
        [predictApi.reducerPath]: predictApi.reducer,
    },
});
