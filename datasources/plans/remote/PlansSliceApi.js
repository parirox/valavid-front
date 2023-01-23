import { ApiAddress, ApiEndpoint, baseQuery } from '@/utils/api/api';
import { createApi } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

export const planSliceApiTag = 'plan_api';

const plan_api = createApi({
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath];
        }
    },
    reducerPath: planSliceApiTag,
    baseQuery,
    tagTypes: [planSliceApiTag],
    endpoints: (build) => ({
        GetPlans: build.query({
            query: (query) => ({
                url: ApiAddress(ApiEndpoint.plans.get),
                method: 'GET',
            }),
        }),
        GetPlanDetails: build.query({
            query: (query) => ({
                url: ApiAddress(ApiEndpoint.plans.details, query),
                method: 'GET',
            })
        }),
        PayThePlan: build.mutation({
            query: (body) => ({
                url: ApiAddress(ApiEndpoint.plans.payment),
                method: 'POST',
                body
            })
        }),
    })
});


export const {
    useGetPlansQuery,
    useGetPlanDetailsQuery,
    usePayThePlanMutation,
} = plan_api;

// export endpoints for use in SSR
export const { GetPlans,GetPlanDetails} = plan_api.endpoints;

export default plan_api;

