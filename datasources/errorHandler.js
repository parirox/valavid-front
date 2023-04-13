import toast from "@/utils/notification/toast";
import {isRejectedWithValue} from "@reduxjs/toolkit";
import {getCookie, hasCookie, removeCookies} from "cookies-next";
import Router from "next/router";

// import Router from "next/router";

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger = (api) => (next) => (action) => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!

  if (isRejectedWithValue(action)) {
    if (action.payload?.status === 401) {
      if(!!getCookie("valavid_token")){
        removeCookies("valavid_token");
        Router.push("/auth")
      }
    }
  }
  return next(action);
};

export const handleFormApiResponse = (response) => {
  Object.keys(response.data).map((item) => {
    response.data[item].forEach((err) => {
        toast.error(`${err}`);
    });
  });
};

export const handleApiError = (response) => {
  let statusCode;
  if(typeof response.status === "number") statusCode = response.status
  else if(typeof response.originalStatus === "number") statusCode = response.originalStatus
  else statusCode = ""

  if (statusCode === 500) {
    toast.error("خطايی در سرور رخ داده است. لطفا دوباره تلاش كنيد.");
  } else if (statusCode === 403) {
    toast.error("سطح دسترسی غير مجاز می باشد.");
  } else if (statusCode === 401) {
    if(hasCookie("valavid_token")) removeCookies("valavid_token");
    toast.error("لطفا ابتدا در سایت ثبت نام و یا وارد حساب کاریری خود شوید.");
  } else if (statusCode === 404) {
    toast.error("محتوايی برای درخواست شما يافت نشد.");
  } else if (statusCode === 400) {
    if (!response.message && response.data) {
      handleFormApiResponse(response);
    } else {
      toast.error(response.message);
    }
  }
};
