import { ApiAddress, ApiEndpoint, baseQuery } from "@/utils/api/api";
import { createApi } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

export const accountingSliceApiTag = "accounting_api";

const accounting_api = createApi({
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  reducerPath: accountingSliceApiTag,
  baseQuery,
  tagTypes: [accountingSliceApiTag],
  endpoints: (build) => ({
    getAccountingList: build.query({
      query: (query) => ({
        url: ApiAddress(ApiEndpoint.accounting.get, query),
        method: "GET",
      }),
      providesTags: (result, error, id) => [
        { type: accountingSliceApiTag, id: "accountingList" },
      ],
    }),
    deposite: build.mutation({
      query: (payload) => ({
        url: ApiAddress(ApiEndpoint.accounting.deposit, payload),
        body: payload,
        method: "POST",
      }),
      providesTags: (result, error, id) => [
        { type: accountingSliceApiTag, id: "deposit" },
      ],
    }),
    withdrawal: build.mutation({
      query: (payload) => ({
        url: ApiAddress(ApiEndpoint.accounting.withdrawal, payload),
        body: payload,
        method: "POST",
      }),
      providesTags: (result, error, id) => [
        { type: accountingSliceApiTag, id: "withdrawal" },
      ],
    }),
    cancelWithdrawal: build.mutation({
      query: (query) => ({
        url: ApiAddress(ApiEndpoint.accounting.cancelWithdrawal, query),
        body: query,
        method: "POST",
      }),
      providesTags: (result, error, id) => [
        { type: accountingSliceApiTag, id: "cancelWithdrawal" + id },
      ],
      invalidatesTags: [{type: accountingSliceApiTag, id: 'cancelWithdrawal'}]
    }),
  }),
});

export const {
  useGetAccountingListQuery,
  useDepositeMutation,
  useWithdrawalMutation,
  useCancelWithdrawalMutation,
} = accounting_api;

// export endpoints for use in SSR
export const { getAccountingList, deposite, withdrawal, cancelWithdrawal } =
  accounting_api.endpoints;

export default accounting_api;
