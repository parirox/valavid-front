import {createApi} from '@reduxjs/toolkit/query/react';
import {ApiAddress, ApiEndpoint, baseQuery} from '@/utils/api/api';
import {HYDRATE} from 'next-redux-wrapper';

export const ticketSliceApiTag = 'ticket_api';

const ticket_api = createApi({
    extractRehydrationInfo(action, {reducerPath}) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath];
        }
    },
    reducerPath: ticketSliceApiTag,
    baseQuery,
    tagTypes: [ticketSliceApiTag],
    endpoints: (build) => ({
        GetTicketList: build.query({
            query: () => ({
                url: ApiAddress(ApiEndpoint.ticket.get_or_create),
                method: 'GET',
            }),
            providesTags: (result, error, id) => [
                {type: ticketSliceApiTag, id: 'TicketList'}
            ],
        }),
        CreateTicket: build.mutation({
            query: (query) => ({
                url: ApiAddress(ApiEndpoint.ticket.get_or_create),
                method: 'POST',
                body:query,
            }),
            providesTags: (result, error, id) => [
                {type: ticketSliceApiTag, id: 'CreateTicket-'+ id}
            ],
            invalidatesTags: [{type: ticketSliceApiTag, id: 'TicketList'}]
        }),
        GetTicketDetails: build.mutation({
            query: (query) => ({
                url: ApiAddress(ApiEndpoint.ticket.details_or_send_message,query),
                method: 'GET',
            }),
            providesTags: (result, error, id) => {
                console.log(result,error,id)
                return [
                    {type: ticketSliceApiTag, id: 'TicketDetails'}
                ]
            },
        }),
        AddMessage: build.mutation({
            query: ({id,body}) => ({
                url: ApiAddress(ApiEndpoint.ticket.details_or_send_message,{id}),
                method: 'POST',
                body,
            }),
            providesTags: (result, error, id) => [
                {type: ticketSliceApiTag, id: 'AddMessage' + id}
            ],
            invalidatesTags: [{type: ticketSliceApiTag, id: 'TicketDetails'}]
        }),
    })
});

export const {
    useGetTicketListQuery,
    useCreateTicketMutation,
    useGetTicketDetailsMutation,
    useAddMessageMutation,
} = ticket_api;

export default ticket_api;
