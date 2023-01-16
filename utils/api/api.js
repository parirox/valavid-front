import {getCookieClient, isEmpty} from "../general";
import {fetchBaseQuery} from "@reduxjs/toolkit/query";
import {getCookie} from "cookies-next";

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
    add: "/account/products/",
    details: "/products/:id/",
    get: "/products/:query",
    filter: "/products/filter-values/:query",
    collection: "/collections/:id/",
  },
  accounting: {
    get: "/account/wallet/",
  },
  pages: {
    home: "/home/",
    publishers: "/publishers/:query",
  },
  publisher: {
    profile: "/publishers/:username/",
    collection: "/publishers/:username/collections/",
    product: "/publishers/:username/products/",
    medal: "/publishers/:username/medal/",
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
    cart: "/basket/",
  },
  ticket: {
    get_or_create: "/tickets/",
    details_or_send_message: "/tickets/:id",
  }
};

export function makeGetQuery(params) {
  return "?" + (Object.entries(params).filter((v) => !isEmpty(v[1])).map((v) => v[0] + "=" + v[1]).join("&"))

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
  prepareHeaders: (headers, {getState}) => {
    const token = getCookie("valavid_token");

    if (token) {
      headers.set("Authorization", `Token ${token}`);
    }

    // headers.set("Content-Type", "multipart/form-data");
    return headers;
  },
});
