import { configureStore } from "@reduxjs/toolkit";
// import storage from 'redux-persist/lib/storage'
import { persistCombineReducers } from "redux-persist";
import { createWrapper } from "next-redux-wrapper";

//-->> auth slices
import authSlice from "@/datasources/auth/local/AuthSlice";
import authSliceApi, {
  authSliceApiTag,
} from "@/datasources/auth/remote/AuthSliceApi";
//-->> checkout slices
import checkoutSlice from "@/datasources/checkout/local/CheckoutSlice";
import checkoutSliceApi, {
  checkoutSliceApiTag,
} from "@/datasources/checkout/remote/CheckoutSliceApi";
//-->> products slices
import productSlice from "@/datasources/product/local/ProductSlice";
import productSliceApi, {
  productSliceApiTag,
} from "@/datasources/product/remote/ProductSliceApi";
//-->> accounting slices
import accountingSlice from "@/datasources/Accounting/local/AccountingSlice";
import accountingSliceApi, {
  accountingSliceApiTag,
} from "@/datasources/Accounting/remote/AccountingSliceApi";
//-->> config slices
import configSlice from "@/datasources/config/local/ConfigSlice";
//-->> user slices
import userSlice from "@/datasources/user/local/UserSlice";
import userSliceApi, {
  userSliceApiTag,
} from "@/datasources/user/remote/UserSliceApi";
//-->> loading slices
import { loadingBarReducer } from "react-redux-loading-bar";
//-->> middlewares
import { rtkQueryErrorLogger } from "@/datasources/errorHandler";
import { LoadingHandler } from "@/datasources/loadingHandler";
import storage from "@/datasources/storage";
import homeSliceApi, {
  homeSliceApiTag,
} from "@/datasources/home/remote/HomeSliceApi";
import blogSliceApi, { blogSliceApiTag } from "./blog/remote/BlogSliceApi";

const persistConfig = {
  key: "VALAVID",
  timeout: 1000,
  storage,
  whitelist: ["checkout", "user"],
};

let reducer = {
  //->> home
  [homeSliceApiTag]: homeSliceApi.reducer,
  //->> auth
  auth: authSlice,
  [authSliceApiTag]: authSliceApi.reducer,
  //->> checkout
  checkout: checkoutSlice,
  [checkoutSliceApiTag]: checkoutSliceApi.reducer,
  //->> products
  product: productSlice,
  [productSliceApiTag]: productSliceApi.reducer,
  //->> accounting
  accounting: accountingSlice,
  [accountingSliceApiTag]: accountingSliceApi.reducer,
  //->> blog
  [blogSliceApiTag]: blogSliceApi.reducer,
  //->> config
  config: configSlice,
  //->> user
  user: userSlice,
  [userSliceApiTag]: userSliceApi.reducer,
  //->> loadingBar
  loadingBar: loadingBarReducer,
};
reducer = persistCombineReducers(persistConfig, reducer);

export const store = (context) =>
  configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat([
        homeSliceApi.middleware,
        checkoutSliceApi.middleware,
        authSliceApi.middleware,
        productSliceApi.middleware,
        accountingSliceApi.middleware,
        userSliceApi.middleware,
        blogSliceApi.middleware,
        rtkQueryErrorLogger,
        LoadingHandler,
      ]),
  });

export const wrapper = createWrapper(store, { debug: false });
