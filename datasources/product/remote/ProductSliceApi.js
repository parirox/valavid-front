import { ApiAddress, ApiEndpoint, baseQuery } from '@/utils/api/api';
import { createApi } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

export const productSliceApiTag = 'product_api';

const product_api = createApi({
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath];
        }
    },
    reducerPath: productSliceApiTag,
    baseQuery,
    tagTypes: [productSliceApiTag],
    endpoints: (build) => ({
        GetProductList: build.query({
            query: (query) => ({
                url: ApiAddress(ApiEndpoint.product.get, query),
                method: 'GET',
            }),
            providesTags: (result, error, id) => [
                { type: productSliceApiTag, id: 'LIST' }
            ],
        }),
        ProductDetails: build.query({
            query: (query) => ({
                url: ApiAddress(ApiEndpoint.product.details, query),
                method: 'GET',
            }),
            providesTags: (result, error, id) => [
                { type: productSliceApiTag, id: 'LIST' }
            ],
        }),
    })
});


export const {
    useGetProductListQuery,
    useProductDetailsQuery,
} = product_api;

// export endpoints for use in SSR
export const { GetProductList, ProductDetails } = product_api.endpoints;

export default product_api;

