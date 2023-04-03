import {ApiAddress, ApiEndpoint, BASE_API_URL, baseQuery} from "@/utils/api/api";
import {createApi} from "@reduxjs/toolkit/query/react";
import {HYDRATE} from "next-redux-wrapper";
import {fetchBaseQuery} from "@reduxjs/toolkit/query";
import {getCookie} from "cookies-next";

export const uploadSliceApiTag = "upload_api";

const upload_api = createApi({
    extractRehydrationInfo(action, {reducerPath}) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath];
        }
    },
    reducerPath: uploadSliceApiTag,
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_API_URL,
        timeout: 100000,
        prepareHeaders: (headers, {getState}) => {
            const token = getCookie("valavid_token");

            if (token) {
                headers.set("Authorization", `Token ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: [uploadSliceApiTag],
    endpoints: (build) => ({
        //->> uploads
        ProductUpload: build.mutation({
            query: (payload) => ({
                url: ApiAddress(ApiEndpoint.product.account.upload, payload),
                body: payload,
                method: "POST",
            }),
            providesTags: (result, error, id) => [
                {type: uploadSliceApiTag, id: "Upload"},
            ],
        }),
    }),
});

// export endpoints for use in SSR
export const {
    useProductUploadMutation,
} = upload_api;

// export endpoints for use in SSR
export const {
    ProductUpload
} = upload_api.endpoints;

export default upload_api;
