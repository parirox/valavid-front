import { ApiAddress, ApiEndpoint, baseQuery } from '@/utils/api/api';
import { createApi } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

export const pageSliceApiTag = 'page_api';

const page_api = createApi({
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath];
        }
    },
    reducerPath: pageSliceApiTag,
    baseQuery,
    tagTypes: [pageSliceApiTag],
    endpoints: (build) => ({
        GetHomeData: build.query({
            query: () => ({
                url: ApiAddress(ApiEndpoint.pages.home),
                method: 'GET',
            }),
            providesTags: (result, error, id) => [
                { type: pageSliceApiTag, id: 'HOME' }
            ],
        }),
        GetPublishers: build.query({
            query: (query) => ({
                url: ApiAddress(ApiEndpoint.pages.publishers,query),
                method: 'GET',
            }),
            providesTags: (result, error, id) => [
                { type: pageSliceApiTag, id: 'Publishers' }
            ],
        }),
        GetFaq: build.query({
            query: (query) => ({
                url: ApiAddress(ApiEndpoint.pages.faq),
                method: 'GET',
            }),
            providesTags: (result, error, id) => [
                { type: pageSliceApiTag, id: 'Faq' }
            ],
        }),
    })
});


export const {
    useGetHomeDataQuery,
    useGetPublishersQuery,
    useGetFaqQuery,
} = page_api;

// export endpoints for use in SSR
export const { GetHomeData,GetPublishers } = page_api.endpoints;

export default page_api;

