import {createApi} from '@reduxjs/toolkit/query/react';
import {ApiAddress, ApiEndpoint, baseQuery} from '@/utils/api/api';
import {HYDRATE} from 'next-redux-wrapper';

export const checkoutSliceApiTag = 'checkout_api';

const checkout_api = createApi({
    // extractRehydrationInfo(action, { reducerPath }) {
    //     if (action.type === HYDRATE) {
    //         console.log('HYDRATE', action, reducerPath);
    //         return action.payload[reducerPath];
    //     }
    // },
    reducerPath: checkoutSliceApiTag,
    baseQuery,
    tagTypes: [checkoutSliceApiTag],
    endpoints: (build) => ({
        getCartDetailsByIds: build.mutation({
            query: (query) => ({
                url: ApiAddress(ApiEndpoint.user.cart, query),
                method: 'POST',
                body:query
            }),
            providesTags: (result, error, id) => [
                { type: checkoutSliceApiTag, id: 'Cart' }
            ],
        }),
        checkOfferCode: build.mutation({
            query: (query) => ({
                url: ApiAddress(ApiEndpoint.cart.offerCode, query),
                method: 'GET',
            }),
            providesTags: (result, error, id) => [
                { type: checkoutSliceApiTag, id: 'OfferCode' }
            ],
        }),
    })
});

export const {
    useGetCartDetailsByIdsMutation,
    useCheckOfferCodeMutation,
} = checkout_api;

export default checkout_api;
