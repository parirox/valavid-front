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
    add:"/account/products/",
    details: "/product/:id/",
    get: "/products/:query",
    filter: "/products/filter-values/:query",
    collection: "/collection/:query",
    details: "/products/:id/",
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
      add_product: "/collections/add/",
      remove_product: "/collections/pop/",
    },
    favorite: {
      get: "/account/products/favorites/",
      add: "/account/products/:id/like/",
      remove: "/account/products/:id/unlike/",
    },
    cart: "/basket/"
  }
};

export function makeGetQuery(params) {
  return "?"+(Object.entries(params).filter((v) => !isEmpty(v[1])).map((v) => v[0] + "=" + v[1]).join("&"))

}
export function ApiAddress(address, params = {}) {
  if (isEmpty(params)) return address;
  if (!isEmpty(params.query)) params = {...params, query: makeGetQuery(params.query)}
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
      headers.set("Authorization", `Token ${token}`);
    }

    // headers.set("Content-Type", "multipart/form-data");
    return headers;
  },
});
