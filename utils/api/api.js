import { isEmpty } from "../general";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { getCookie } from "cookies-next";

export const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL + "/aapi";
export const ApiEndpoint = {
  auth: {
    login: "/account/auth/login/",
    logout: "account/auth/logout/",
    signup: "/account/auth/signup/",
    sendCode: "/account/auth/send-code/",
    resetPassword: "/account/auth/reset-password/",
  },
  tags: "/tags/:query",
  cart: {
    detailsByIds: "/basket/",
    offerCode: "/check-discount/",
    payment: "/purchase/",
  },
  product: {
    account: {
      add: "/account/products/",
      upload: "/upload-tmp-media/",
      get: "/account/products/",
      delete: "/account/products/:id/",
      productTags: "/tags/",
      edit: "/account/products/:id/",
    },
    devices: "/devices/",
    details: "/products/:id/",
    report: "/report/",
    get: "/products/:query",
    filter: "/products/filter-values/:query",
    collection: "/collections/:id/",
  },
  accounting: {
    get: "/account/wallet/",
    deposit: "/account/wallet/deposit/",
    withdrawal: "account/wallet/withdraw-request/",
    cancelWithdrawal: "account/wallet/withdraw-cancel-request/:id/",
  },
  pages: {
    home: "/home/",
    publishers: "/publishers/:query",
    plans_join: "/subscription-join/",
    newsletter: "/newsletter/",
    faq: "/faq/",
  },
  payment: {
    bank_gateways: "/bank-gateways/",
    check_transaction: "/check-payment/:id/",
  },
  plans: {
    get: "/subscription-plans/",
    details: "/subscription-plans/:id/",
    payment: "/subscription-join/",
  },
  publisher: {
    profile: "/publishers/:username/",
    collection: "/publishers/:username/collections/",
    product: "/publishers/:username/products/?page=:page",
    achievements: "/publishers/:username/achievements/",
  },
  user: {
    profile: {
      forms: {
        uploadMedia: "/upload-tmp-media/",
        main: "/account/profile/",
        change_password: "/account/auth/change-password/",
      },
      details: "/account/profile/",
    },
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
    achievements: "/account/achievements/",
    downloads: "/account/downloads/",
    cart: "/basket/",
  },
  ticket: {
    get_or_create: "/tickets/",
    details_or_send_message: "/tickets/:id/",
  },
  blog: {
    get: "/blogs/:query",
    categories: "/blogs/categories/",
    singleBlog: "/blogs/:id/",
    addMember: "/newsletter/",
  },
};

export function makeGetQuery(params) {
  return (
    "?" +
    Object.entries(params)
      .filter((v) => !isEmpty(v[1]))
      .map((v) => v[0] + "=" + v[1])
      .join("&")
  );
}

export function ApiAddress(address, params = {}) {
  if (isEmpty(params)) return address;
  if (!isEmpty(params.query)) {
    params = { ...params, query: makeGetQuery(params.query) };
  }
  Object.entries(params).forEach(([index, value]) => {
    const pattern = `:${index}`;
    if (address.includes(pattern)) address = address.replace(pattern, value);
  });
  return address;
}

export const baseQuery = fetchBaseQuery({
  baseUrl: BASE_API_URL,
  timeout: 10000,
  prepareHeaders: (headers, { getState }) => {
    const token = getCookie("valavid_token");

    if (token) {
      headers.set("Authorization", `Token ${token}`);
    }

    // headers.set("Content-Type", "multipart/form-data");
    return headers;
  },
  responseHandler: (response, { getState }) => {
    console.log({ response, getState });
  },
});
