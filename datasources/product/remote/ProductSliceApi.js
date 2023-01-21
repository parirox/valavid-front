import { ApiAddress, ApiEndpoint, baseQuery } from "@/utils/api/api";
import { createApi } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

export const productSliceApiTag = "product_api";

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
    //->> videos
    GetProductListScroll: build.query({
      query: (query) => ({
        url: ApiAddress(ApiEndpoint.product.get, query),
        method: "GET",
      }),
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        const _queryArgs = { ...queryArgs.query };
        delete _queryArgs["page"];
        return (
          endpointName +
          ApiAddress(ApiEndpoint.product.get, {
            query: _queryArgs,
          })
        );
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems) => {
        currentCache.results.push(...newItems.results);
      },
      forceRefetch({ currentArg, previousArg }) {
        return JSON.stringify(currentArg) !== JSON.stringify(previousArg);
      },
      providesTags: (result, error, { query }) => [
        { type: productSliceApiTag, id: "ProductListScroll" },
      ],
      // invalidatesTags:[{type:productSliceApiTag,id:'ProductListFilter'}]
    }),
    GetProductListFilter: build.query({
      query: (query) => ({
        url: ApiAddress(ApiEndpoint.product.filter, query),
        method: "GET",
      }),
      providesTags: (result, error, { query }) => {
        return [
          {
            type: productSliceApiTag,
            id: "ProductListFilter-" + JSON.stringify(query),
          },
        ];
      },
    }),
    //->> collections
    GetCollectionDetails: build.query({
      query: (query) => ({
        url: ApiAddress(ApiEndpoint.product.collection, query),
        method: "GET",
      }),
      providesTags: (result, error, id) => [
        { type: productSliceApiTag, id: "CollectionDetails" },
      ],
    }),
    ProductDetails: build.query({
      query: (query) => ({
        url: ApiAddress(ApiEndpoint.product.details, query),
        method: "GET",
      }),
      providesTags: (result, error, id) => [
        { type: productSliceApiTag, id: "ProductDetails" },
      ],
    }),
    addProduct: build.mutation({
      query: (payload) => ({
        url: ApiAddress(ApiEndpoint.product.account.add, payload),
        body: payload,
        method: "POST",
      }),
      providesTags: (result, error, id) => [
        { type: productSliceApiTag, id: "Add" },
      ],
    }),
    getAccountProductList: build.mutation({
      query: (query) => ({
        url: ApiAddress(ApiEndpoint.product.account.get, query),
        method: "GET",
      }),
      providesTags: (result, error, id) => [
        { type: productSliceApiTag, id: "getAccountProducts" },
      ],
    }),
    getProductTags: build.mutation({
      query: (query) => ({
        url: ApiAddress(ApiEndpoint.product.account.productTags, query),
        method: "GET",
        params: query,
      }),
      providesTags: (result, error, id) => [
        { type: productSliceApiTag, id: "tags" },
      ],
    }),
    deleteAccountProduct: build.mutation({
      query: (query) => ({
        url: ApiAddress(ApiEndpoint.product.account.delete, query),
        method: "GET",
      }),
      providesTags: (result, error, id) => [
        { type: productSliceApiTag, id: "Delete" },
      ],
    }),
  }),
});

// export endpoints for use in SSR
export const {
  useGetProductListScrollQuery,
  useGetProductListFilterQuery,
  useGetCollectionDetailsQuery,
  useProductDetailsQuery,
  useAddProductMutation,
  useGetAccountProductListMutation,
  useGetProductTagsMutation,
  useDeleteAccountProductMutation
} = product_api;

// export endpoints for use in SSR
export const {
  GetProductListScroll,
  GetProductListFilter,
  GetCollectionDetails,
  ProductDetails,
  addProduct,
  getAccountProductList,
  getProductTags,
  deleteAccountProduct
} = product_api.endpoints;

export default product_api;
