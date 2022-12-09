import {configureStore} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'
import {persistCombineReducers} from 'redux-persist'
import {createWrapper} from 'next-redux-wrapper';

//-->> checkout slices
import checkoutSlice from '@/datasources/checkout/local/CheckoutSlice';
import checkoutSliceApi, {checkoutSliceApiTag} from '@/datasources/checkout/remote/CheckoutSliceApi';
//-->> product slices
import productSlice from '@/datasources/product/local/ProductSlice';
import configSlice from '@/datasources/config/local/ConfigSlice';
import productSliceApi, {productSliceApiTag} from '@/datasources/product/remote/ProductSliceApi';
import {rtkQueryErrorLogger} from "@/datasources/errorHandler";
import {loadingBarReducer} from 'react-redux-loading-bar'
import {LoadingHandler} from "@/datasources/loadingHandler";

const persistConfig = {
    key: 'VALAVID',
    timeout: 1000,
    storage,
    whitelist: ['checkout'],
};

let reducer = {
    //->> checkout
    checkout: checkoutSlice,
    [checkoutSliceApiTag]: checkoutSliceApi.reducer,
    //->> product
    product: productSlice,
    [productSliceApiTag]: productSliceApi.reducer,
    //->> config
    config: configSlice,
    //->> loadingBar
    loadingBar: loadingBarReducer,
}
reducer = persistCombineReducers(persistConfig, reducer);

export const store = (context) => configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat([
            rtkQueryErrorLogger,
            LoadingHandler,
            checkoutSliceApi.middleware,
            productSliceApi.middleware,
        ]),
})

export const wrapper = createWrapper(store, {debug: false});
