import {ApiAddress, ApiEndpoint, baseQuery} from "@/utils/api/api";
import {createApi} from "@reduxjs/toolkit/query/react";
import {HYDRATE} from "next-redux-wrapper";

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
    SearchProduct: build.mutation({
      query: (query) => ({
        url: ApiAddress(ApiEndpoint.product.get, {query:query}),
        method: "GET",
      }),
      providesTags: (result, error, { query }) => {
        return [
          {
            type: productSliceApiTag,
            id: "ProductSearch-"+query,
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
    Report: build.mutation({
      query: (body) => ({
        url: ApiAddress(ApiEndpoint.product.report),
        method: "POST",
        body
      }),
      providesTags: (result, error, id) => [
        { type: productSliceApiTag, id: "ProductReport" },
      ],
    }),
    SearchTags: build.mutation({
      query: (query) => ({
        url: ApiAddress(ApiEndpoint.tags, {query: query}),
        method: "GET",
      }),
      providesTags: (result, error, {query}) => {
        return [
          {
            type: productSliceApiTag,
            id: "TagsSearch-" + query,
          },
        ];
      },
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
    uploadProduct: build.mutation({
      query: (payload) => ({
        url: ApiAddress(ApiEndpoint.product.account.upload, payload),
        body: payload,
        method: "POST",
      }),
      providesTags: (result, error, id) => [
        { type: productSliceApiTag, id: "Upload" },
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
        method: "DELETE",
      }),
      providesTags: (result, error, id) => [
        { type: productSliceApiTag, id: "Delete" },
      ],
    }),
    editAccountProduct: build.mutation({
      query: (query) => ({
        url: ApiAddress(ApiEndpoint.product.account.edit, query[0]),
        method: "PATCH",
        body: query[1],
      }),
      providesTags: (result, error, id) => [
        { type: productSliceApiTag, id: "Edit" },
      ],
    }),
  }),
});

// export endpoints for use in SSR
export const {
  useGetProductListScrollQuery,
  useGetProductListFilterQuery,
  useSearchProductMutation,
  useSearchTagsMutation,
  useGetCollectionDetailsQuery,
  useReportMutation,
  useProductDetailsQuery,
  useUploadProductMutation,
  useGetAccountProductListMutation,
  useGetProductTagsMutation,
  useDeleteAccountProductMutation,
  useEditAccountProductMutation,
  useAddProductMutation
} = product_api;

// export endpoints for use in SSR
export const {
  GetProductListScroll,
  GetProductListFilter,
  GetCollectionDetails,
  ProductDetails,
  uploadProduct,
  getAccountProductList,
  getProductTags,
  deleteAccountProduct,
  editAccountProduct,
  addProduct
} = product_api.endpoints;

export default product_api;
