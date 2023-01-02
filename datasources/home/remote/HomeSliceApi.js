import { ApiAddress, ApiEndpoint, baseQuery } from '@/utils/api/api';
import { createApi } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

export const homeSliceApiTag = 'home_api';

const home_api = createApi({
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath];
        }
    },
    reducerPath: homeSliceApiTag,
    baseQuery,
    tagTypes: [homeSliceApiTag],
    endpoints: (build) => ({
        GetHomeData: build.query({
            query: () => ({
                url: ApiAddress(ApiEndpoint.home.main),
                method: 'GET',
            }),
            providesTags: (result, error, id) => [
                { type: homeSliceApiTag, id: 'HOME' }
            ],
        }),
    })
});


export const {
    useGetHomeDataQuery
} = home_api;

// export endpoints for use in SSR
export const { GetHomeData } = home_api.endpoints;

export default home_api;

