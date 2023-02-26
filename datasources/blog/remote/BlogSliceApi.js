import {ApiAddress, ApiEndpoint, baseQuery} from "@/utils/api/api";
import {createApi} from "@reduxjs/toolkit/query/react";
import {HYDRATE} from "next-redux-wrapper";

export const blogSliceApiTag = "blog_api";

const blog_api = createApi({
  extractRehydrationInfo(action, {reducerPath}) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  reducerPath: blogSliceApiTag,
  baseQuery,
  tagTypes: [blogSliceApiTag],
  endpoints: (build) => ({
    GetBlogData: build.query({
      query: (query) => ({
        url: ApiAddress(ApiEndpoint.blog.get, {query: {tag: "", ...query}}),
        method: "GET",
      }),
      providesTags: (result, error, id) => [
        {type: blogSliceApiTag, id: "Blog"},
      ],
    }),
    GetBlogCategories: build.query({
      query: () => ({
        url: ApiAddress(ApiEndpoint.blog.categories),
        method: "GET",
      }),
      providesTags: (result, error, id) => [
        {type: blogSliceApiTag, id: "Categories"},
      ],
    }),
    GetSingleBlog: build.query({
      query: (query) => ({
        url: ApiAddress(ApiEndpoint.blog.singleBlog, query),
        method: "GET",
      }),
      providesTags: (result, error, id) => [
        {type: blogSliceApiTag, id: "SingleBlog"},
      ],
    }),
  }),
});

export const {
  useGetBlogDataQuery,
  useGetBlogCategoriesQuery,
  useGetSingleBlogQuery,
} = blog_api;

// export endpoints for use in SSR
export const {GetBlogData, GetBlogCategories, GetSingleBlog} =
  blog_api.endpoints;

export default blog_api;
