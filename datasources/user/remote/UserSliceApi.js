import {createApi} from '@reduxjs/toolkit/query/react';
import {ApiAddress, ApiEndpoint, baseQuery} from '@/utils/api/api';
import {HYDRATE} from 'next-redux-wrapper';

export const userSliceApiTag = 'user_api';

const user_api = createApi({
    // extractRehydrationInfo(action, { reducerPath }) {
    //     if (action.type === HYDRATE) {
    //         console.log('HYDRATE', action, reducerPath);
    //         return action.payload[reducerPath];
    //     }
    // },
    reducerPath: userSliceApiTag,
    baseQuery,
    tagTypes: [userSliceApiTag],
    endpoints: (build) => ({
        getCollection: build.query({
            query: () => ({
                url: ApiAddress(ApiEndpoint.user.collection.get),
                method: 'GET',
                headers: {
                    "Authorization": "Token cca3b7aaddd85d85513f55ddac72b4c5fc26d595",
                },
            }),
            providesTags: (result, error, id) => [
                {type: userSliceApiTag, id: 'CollectionList'}
            ],
        }),
        addCollection: build.mutation({
            query: (query) => ({
                url: ApiAddress(ApiEndpoint.user.collection.add),
                method: 'POST',
                body: query,
                headers: {
                    "Authorization": "Token cca3b7aaddd85d85513f55ddac72b4c5fc26d595",
                },
            }),
            providesTags: (result, error, id) => [
                {type: userSliceApiTag, id: 'Collection' + id}
            ],
            invalidatesTags: [{type: userSliceApiTag, id: 'CollectionList'}]
        }),
        editCollection: build.mutation({
            query: (query) => ({
                url: ApiAddress(ApiEndpoint.user.collection.edit, query[0]),
                method: 'PUT',
                body: query[1],
                headers: {
                    "Authorization": "Token cca3b7aaddd85d85513f55ddac72b4c5fc26d595",
                },
            }),
            providesTags: (result, error, id) => [
                {type: userSliceApiTag, id: 'Collection' + id}
            ],
            invalidatesTags: [{type: userSliceApiTag, id: 'CollectionList'}]
        }),
        removeCollection: build.mutation({
            query: (query) => ({
                url: ApiAddress(ApiEndpoint.user.collection.remove, query),
                method: 'DELETE',
                body: {},
                headers: {
                    "Authorization": "Token cca3b7aaddd85d85513f55ddac72b4c5fc26d595",
                },
            }),
            providesTags: (result, error, id) => [
                {type: userSliceApiTag, id: 'Collection' + id}
            ],
            invalidatesTags: [{type: userSliceApiTag, id: 'CollectionList'}]
        }),
    })
});

export const {
    useGetCollectionQuery,
    useAddCollectionMutation,
    useEditCollectionMutation,
    useRemoveCollectionMutation,
} = user_api;

export default user_api;
