import toast from "@/utils/notification/toast";
import { isRejectedWithValue } from "@reduxjs/toolkit";

// import Router from "next/router";

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger = (api) => (next) => (action) => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
  if (isRejectedWithValue(action)) {
    // if (action.payload?.status === 404) {
    // await Router.push('/404')
    // }
    // toast.error(action.error.data.message)
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
  const statusCode = response && response.status;
  if (statusCode === 500) {
    toast.error("خطايی در سرور رخ داده است. لطفا دوباره تلاش كنيد.");
  } else if (statusCode === 403) {
    toast.error("سطح دسترسی غير مجاز می باشد.");
  } else if (statusCode === 401) {
    toast.error("لطفا ابتدا در سایت ثبت نام و یا وارد حساب کاریری خود شوید.");
  } else if (statusCode === 404) {
    toast.error("محتوايی برای درخواست شما يافت نشد.");
  } else if (statusCode === 400) {
    if (!response.message) {
      handleFormApiResponse(response);
    } else {
      toast.error(response.message);
    }
  }
};
