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
        getCartList: build.query({
            query: (query) => ({
                url: ApiAddress(ApiEndpoint.cart.list, query),
                method: 'GET',
            }),
            providesTags: (result, error, id) => [
                { type: checkoutSliceApiTag, id: 'LIST' }
            ],
        }),
    })
});

export const {
    useGetCartListQuery
} = checkout_api;

export default checkout_api;
