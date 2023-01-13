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
        addProduct: build.mutation({
            query: (payload) => ({
                url: ApiAddress(ApiEndpoint.product.add, payload),
                body: payload,
                method: 'POST',
            }),
            providesTags: (result, error, id) => [
                { type: productSliceApiTag, id: 'Add' }
            ],
        }),
    })
});


export const {
    useGetProductListQuery,
    useProductDetailsQuery,
    useAddProductMutation
} = product_api;

// export endpoints for use in SSR
export const { GetProductList, ProductDetails, addProduct } = product_api.endpoints;

export default product_api;

