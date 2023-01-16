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
        getListTicket: build.query({
            query: () => ({
                url: ApiAddress(ApiEndpoint.ticket.getList),
                method: 'GET',
                headers: {
                    "Authorization": "Token cca3b7aaddd85d85513f55ddac72b4c5fc26d595",
                },
            }),
            providesTags: (result, error, id) => [
                {type: ticketSliceApiTag, id: 'TicketList'}
            ],
        }),
        addTicket: build.mutation({
            query: (query) => ({
                url: ApiAddress(ApiEndpoint.ticket.getTicket),
                method: 'POST',
                body: query,
                headers: {
                    "Authorization": "Token cca3b7aaddd85d85513f55ddac72b4c5fc26d595",
                },
            }),
            providesTags: (result, error, id) => [
                {type: ticketSliceApiTag, id: 'ticket' + id}
            ],
            invalidatesTags: [{type: ticketSliceApiTag, id: 'getList'}]
        }),
        getTicket: build.query({
            query: () => ({
                url: ApiAddress(ApiEndpoint.ticket.getTicket),
                method: 'GET',
                headers: {
                    "Authorization": "Token cca3b7aaddd85d85513f55ddac72b4c5fc26d595",
                },
            }),
            providesTags: (result, error, id) => [
                {type: ticketSliceApiTag, id: 'Ticket'}
            ],
        }),
        addMessage: build.mutation({
            query: (query) => ({
                url: ApiAddress(ApiEndpoint.ticket.addMessage),
                method: 'POST',
                body: query,
                headers: {
                    "Authorization": "Token cca3b7aaddd85d85513f55ddac72b4c5fc26d595",
                },
            }),
            providesTags: (result, error, id) => [
                {type: ticketSliceApiTag, id: 'ticket' + id}
            ],
            invalidatesTags: [{type: ticketSliceApiTag, id: 'Ticket'}]
        }),
    })
});

export const {
    useGetListTicketQuery,
    useAddTicketMutation,
    useGetTicketQuery,
    useAddMessageMutation,
} = ticket_api;

export default ticket_api;
