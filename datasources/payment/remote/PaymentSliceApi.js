import { ApiAddress, ApiEndpoint, baseQuery } from '@/utils/api/api';
import { createApi } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

export const paymentSliceApiTag = 'payment_api';

const payment_api = createApi({
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath];
        }
    },
    reducerPath: paymentSliceApiTag,
    baseQuery,
    tagTypes: [paymentSliceApiTag],
    endpoints: (build) => ({
        GetGatewaysList: build.query({
            query: (query) => ({
                url: ApiAddress(ApiEndpoint.payment.bank_gateways, query),
                method: 'GET',
            })
        }),
        CheckTransaction: build.query({
            async queryFn(id, _queryApi, _extraOptions, fetchWithBQ) {
                const result = await fetchWithBQ(ApiAddress(ApiEndpoint.payment.check_transaction, {id}))
                if (result.error) return { error: result.error }
                if (!result.data.success) return { error: result.data }
                return { data: result.data }
            },
        }),
    })
});


export const {
    useGetGatewaysListQuery,
    useCheckTransactionQuery,
} = payment_api;

// export endpoints for use in SSR
export const { CheckTransaction,GetGatewaysList} = payment_api.endpoints;

export default payment_api;

