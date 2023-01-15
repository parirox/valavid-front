import {createApi} from '@reduxjs/toolkit/query/react';
import {ApiAddress, ApiEndpoint, baseQuery} from '@/utils/api/api';
import {HYDRATE} from 'next-redux-wrapper';

export const ticketSliceApiTag = 'ticket_api';

const ticket_api = createApi({
    // extractRehydrationInfo(action, { reducerPath }) {
    //     if (action.type === HYDRATE) {
    //         console.log('HYDRATE', action, reducerPath);
    //         return action.payload[reducerPath];
    //     }
    // },
    reducerPath: ticketSliceApiTag,
    baseQuery,
    tagTypes: [ticketSliceApiTag],
    endpoints: (build) => ({
        getCollection: build.query({
            query: () => ({
                url: ApiAddress(ApiEndpoint.ticket.collection.get),
                method: 'GET',
                headers: {
                    "Authorization": "Token cca3b7aaddd85d85513f55ddac72b4c5fc26d595",
                },
            }),
            providesTags: (result, error, id) => [
                {type: ticketSliceApiTag, id: 'CollectionList'}
            ],
        }),
        addCollection: build.mutation({
            query: (query) => ({
                url: ApiAddress(ApiEndpoint.ticket.collection.add),
                method: 'POST',
                body: query,
                headers: {
                    "Authorization": "Token cca3b7aaddd85d85513f55ddac72b4c5fc26d595",
                },
            }),
            providesTags: (result, error, id) => [
                {type: ticketSliceApiTag, id: 'Collection' + id}
            ],
            invalidatesTags: [{type: ticketSliceApiTag, id: 'CollectionList'}]
        }),
        editCollection: build.mutation({
            query: (query) => ({
                url: ApiAddress(ApiEndpoint.ticket.collection.edit, query[0]),
                method: 'PUT',
                body: query[1],
                headers: {
                    "Authorization": "Token cca3b7aaddd85d85513f55ddac72b4c5fc26d595",
                },
            }),
            providesTags: (result, error, id) => [
                {type: ticketSliceApiTag, id: 'Collection' + id}
            ],
            invalidatesTags: [{type: ticketSliceApiTag, id: 'CollectionList'}]
        }),
        removeCollection: build.mutation({
            query: (query) => ({
                url: ApiAddress(ApiEndpoint.ticket.collection.remove, query),
                method: 'DELETE',
                body: {},
                headers: {
                    "Authorization": "Token cca3b7aaddd85d85513f55ddac72b4c5fc26d595",
                },
            }),
            providesTags: (result, error, id) => [
                {type: ticketSliceApiTag, id: 'Collection' + id}
            ],
            invalidatesTags: [{type: ticketSliceApiTag, id: 'CollectionList'}]
        }),
    })
});

export const {
    useGetCollectionQuery,
    useAddCollectionMutation,
    useEditCollectionMutation,
    ticketemoveCollectionMutation,
} = ticket_api;

export default ticket_api;
