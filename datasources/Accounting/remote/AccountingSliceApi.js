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
  }),
});

export const {
    useGetAccountingListQuery
} = accounting_api;

// export endpoints for use in SSR
export const {
    getAccountingList
} = accounting_api.endpoints;

export default accounting_api;
