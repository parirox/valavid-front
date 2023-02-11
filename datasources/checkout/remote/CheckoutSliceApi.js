import {createApi} from '@reduxjs/toolkit/query/react';
import {ApiAddress, ApiEndpoint, baseQuery} from '@/utils/api/api';
import {HYDRATE} from 'next-redux-wrapper';

export const checkoutSliceApiTag = 'checkout_api';

const checkout_api = createApi({
    extractRehydrationInfo(action, {reducerPath}) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath];
        }
    },
    reducerPath: checkoutSliceApiTag,
    baseQuery,
    tagTypes: [checkoutSliceApiTag],
    endpoints: (build) => ({
        getCartDetailsByIds: build.mutation({
            query: (query) => ({
                url: ApiAddress(ApiEndpoint.user.cart, query),
                method: 'PUT',
                body:query
            }),
            providesTags: (result, error, id) => [
                { type: checkoutSliceApiTag, id: 'Cart' }
            ],
        }),
        checkOfferCode: build.mutation({
            query: (payload) => ({
                url: ApiAddress(ApiEndpoint.cart.offerCode, payload),
                method: 'POST',
                body:payload
            }),
            providesTags: (result, error, id) => [
                { type: checkoutSliceApiTag, id: 'OfferCode' }
            ],
        }),
        payment: build.mutation({
            query: (payload) => ({
                url: ApiAddress(ApiEndpoint.cart.payment, payload),
                method: 'POST',
                body:payload
            }),
            providesTags: (result, error, id) => [
                { type: checkoutSliceApiTag, id: 'Payment' }
            ],
        }),
    })
});

export const {
    useGetCartDetailsByIdsMutation,
    useCheckOfferCodeMutation,
    usePaymentMutation
} = checkout_api;

export default checkout_api;
