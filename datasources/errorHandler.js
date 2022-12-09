import { isRejectedWithValue } from '@reduxjs/toolkit'
import toast from "react-hot-toast";
// import Router from "next/router";

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger = (api) => (next) => (action) => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
        if (action.payload?.status === 404) {
            // await Router.push('/404')
        }
        // toast.error(action.error.data.message)
    }
    return next(action)
}


