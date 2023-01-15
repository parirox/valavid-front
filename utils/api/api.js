import { getCookieClient, isEmpty } from "../general";  
import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL + "/aapi";
export const ApiEndpoint = {
  auth: {
    login: "/account/auth/login/",
    signup: "/account/auth/signup/",
    sendCode: "/account/auth/send-code/",
    resetPassword: "/account/auth/reset-password/",
  },
  cart: {
    detailsByIds: "/cart/:ids",
    offerCode: "/offerCode/:code",
  },
  product: {
    get: "/videos/",
    details: "/product/:id/",
  },
  home: {
    main: "/home/",
  },
  user: {
    collection: {
      get: "/collections/",
      add: "/collections/",
      edit: "/collections/:id/",
      remove: "/collections/:id/",
    },
  },
  ticket: {
    getList: "/ticket/",
  },
};

export function ApiAddress(address, params = {}) {
  if (isEmpty(params)) return address;
  Object.entries(params).forEach((v) => {
    const pattern = `:${v[0]}`;
    if (address.includes(pattern)) address = address.replace(pattern, v[1]);
  });
  return address;
}

export const baseQuery = fetchBaseQuery({
  baseUrl: BASE_API_URL,
  timeout: 10000,
  prepareHeaders: (headers, { getState }) => {
    const token = getCookieClient("valavid_token");

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    headers.set("Content-Type", "application/json");
    return headers;
  },
});
