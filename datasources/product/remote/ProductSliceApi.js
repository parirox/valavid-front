import {ApiAddress, ApiEndpoint, baseQuery} from '@/utils/api/api';
import {createApi} from '@reduxjs/toolkit/query/react';
import {HYDRATE} from 'next-redux-wrapper';

export const productSliceApiTag = 'product_api';

const product_api = createApi({
  extractRehydrationInfo(action, {reducerPath}) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  reducerPath: productSliceApiTag,
  baseQuery,
  tagTypes: [productSliceApiTag],
  endpoints: (build) => ({
    //->> videos
    GetProductListScroll: build.query({
      query: (query) => ({
        url: ApiAddress(ApiEndpoint.product.get, query),
        method: 'GET',
      }),
      serializeQueryArgs: ({endpointName,queryArgs}) => {
        const _queryArgs = {...queryArgs.query}
        delete _queryArgs['page']
        return endpointName + ApiAddress(ApiEndpoint.product.get, {
          query: _queryArgs
        })
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems) => {
        currentCache.results.push(...newItems.results);
      },
      forceRefetch({currentArg, previousArg}) {
        debugger
        return currentArg !== previousArg
      },
      providesTags: (result, error, {query}) => [
        {type: productSliceApiTag, id: 'ProductListScroll'}
      ],
      // invalidatesTags:[{type:productSliceApiTag,id:'ProductListFilter'}]
    }),
    GetProductListFilter: build.query({
      query: (query) => ({
        url: ApiAddress(ApiEndpoint.product.filter,query),
        method: 'GET',
      }),
      providesTags: (result, error, {query}) => {
        return [
          {type: productSliceApiTag, id: 'ProductListFilter'}
        ]
      },
    }),
    //->> collections
    GetCollectionDetails: build.query({
      query: (query) => ({
        url: ApiAddress(ApiEndpoint.product.collection, query),
        method: 'GET',
      }),
      providesTags: (result, error, id) => [
        {type: productSliceApiTag, id: 'CollectionDetails'}
      ],
    }),
    ProductDetails: build.query({
      query: (query) => ({
        url: ApiAddress(ApiEndpoint.product.details, query),
        method: 'GET',
      }),
      providesTags: (result, error, id) => [
        {type: productSliceApiTag, id: 'ProductDetails'}
      ],
    }),
  })
});


export const {
  useGetProductListScrollQuery,
  useGetProductListFilterQuery,
  useGetCollectionDetailsQuery,
  useProductDetailsQuery,
} = product_api;

// export endpoints for use in SSR
export const {
  GetProductListScroll,
  GetProductListFilter,
  GetCollectionDetails,
  ProductDetails
} = product_api.endpoints;

export default product_api;

