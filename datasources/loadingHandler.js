import {isFulfilled, isPending, isRejected, isRejectedWithValue} from '@reduxjs/toolkit'
import {hideLoading, showLoading} from "react-redux-loading-bar";

/**
 * Log a warning and show a toast!
 */
export const LoadingHandler = (api) => (next) => (action) => {
    if (isPending(action) && !api.getState().loadingBar?.default) {
        api.dispatch(showLoading());
    }
    if (isFulfilled(action) || isRejected(action) || isRejectedWithValue(action) && api.getState().loadingBar?.default) {
        api.dispatch(hideLoading());
    }
    return next(action)
}


