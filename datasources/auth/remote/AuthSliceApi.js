import { ApiAddress, ApiEndpoint, baseQuery } from "@/utils/api/api";
import { createApi } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

export const authSliceApiTag = "auth_api";

const auth_api = createApi({
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  reducerPath: authSliceApiTag,
  baseQuery,
  tagTypes: [authSliceApiTag],
  endpoints: (build) => ({
    signupUser: build.mutation({
      query: (payload) => ({
        url: ApiAddress(ApiEndpoint.auth.signup, payload),
        body: payload,
        method: "POST",
      }),
      providesTags: (result, error, id) => [
        { type: authSliceApiTag, id: "Signup" },
      ],
    }),
    sendVerificationCode: build.mutation({
      query: (payload) => ({
        url: ApiAddress(ApiEndpoint.auth.sendCode, payload),
        body: payload,
        method: "POST",
      }),
      providesTags: (result, error, id) => [
        { type: authSliceApiTag, id: "Code" },
      ],
    }),
    resetUserPassword: build.mutation({
      query: (payload) => ({
        url: ApiAddress(ApiEndpoint.auth.resetPassword, payload),
        body: payload,
        method: "POST",
      }),
      providesTags: (result, error, id) => [
        { type: authSliceApiTag, id: "Reset" },
      ],
    }),
    loginUser: build.mutation({
      query: (payload) => ({
        url: ApiAddress(ApiEndpoint.auth.login, payload),
        body: payload,
        method: "POST",
      }),
      providesTags: (result, error, id) => [
        { type: authSliceApiTag, id: "Login" },
      ],
    }),
    logoutUser: build.mutation({
      query: (payload) => ({
        url: ApiAddress(ApiEndpoint.auth.logout, payload),
        body: payload,
        method: "POST",
      }),
      providesTags: (result, error, id) => [
        { type: authSliceApiTag, id: "Logout" },
      ],
    }),
  }),
});

export const {
  useSignupUserMutation,
  useLoginUserMutation,
  useSendVerificationCodeMutation,
  useResetUserPasswordMutation,
  useLogoutUserMutation
} = auth_api;

// export endpoints for use in SSR
export const { signupUser, loginUser, sendVerificationCode, resetUserPassword, logoutUser } =
  auth_api.endpoints;

export default auth_api;
