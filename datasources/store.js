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
//-->> blog slices
import blogSliceApi, { blogSliceApiTag } from "./blog/remote/BlogSliceApi";
//-->> plan slices
import planSliceApi, {planSliceApiTag} from '@/datasources/plans/remote/PlansSliceApi';
//-->> payment slices
import paymentSliceApi, {paymentSliceApiTag} from '@/datasources/payment/remote/PaymentSliceApi';
//-->> other page slices
import pageSliceApi, {pageSliceApiTag} from '@/datasources/pages/remote/PageSliceApi';
//-->> ticket slices
import ticketSliceApi, { ticketSliceApiTag } from "./ticket/remote/TicketSliceApi";
//-->> loading slices
import { loadingBarReducer } from "react-redux-loading-bar";
//-->> middlewares
import { rtkQueryErrorLogger } from "@/datasources/errorHandler";
import { LoadingHandler } from "@/datasources/loadingHandler";
import storage from "@/datasources/storage";

const persistConfig = {
  key: "VALAVID",
  timeout: 1000,
  storage,
  whitelist: ["checkout", "user"],
};

let reducer = {
  //->> pages
  [pageSliceApiTag]: pageSliceApi.reducer,
  //->> payment
  [paymentSliceApiTag]: paymentSliceApi.reducer,
  //->> plan
  [planSliceApiTag]: planSliceApi.reducer,
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
  //->> ticket
  // ticket: ticketSlice,
  [ticketSliceApiTag]: ticketSliceApi.reducer,
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
        serializableCheck: true,
      }).concat([
        LoadingHandler,
        pageSliceApi.middleware,
        planSliceApi.middleware,
        paymentSliceApi.middleware,
        checkoutSliceApi.middleware,
        authSliceApi.middleware,
        productSliceApi.middleware,
        accountingSliceApi.middleware,
        ticketSliceApi.middleware,
        userSliceApi.middleware,
        blogSliceApi.middleware,
        rtkQueryErrorLogger,
      ]),
  });

export const wrapper = createWrapper(store, { debug: false });
