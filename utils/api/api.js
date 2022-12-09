import {isEmpty} from "../general";
import { fetchBaseQuery } from '@reduxjs/toolkit/query'

export const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL
export const ApiEndpoint = {
    cart: {
        get: "/cart/",
    },
    product: {
        get: "/product/",
        details: "/product/:id/",
    }
}

export function ApiAddress(address, params = {}) {
    address = BASE_API_URL + address
    if (isEmpty(params)) return address;
    Object.entries(params).forEach((v) => {
        const pattern = `:${v[0]}`;
        if (address.includes(pattern)) address = address.replace(pattern, v[1])
    })
    return address;
}


export const baseQuery = fetchBaseQuery({
    baseUrl: BASE_API_URL,
    prepareHeaders: (headers, { getState }) => {
    //     const token = getState().auth.token
    //
    //     // If we have a token set in state, let's assume that we should be passing it.
    //     if (token) {
    //         headers.set('authorization', `Bearer ${token}`)
    //     }
    //
        return headers
    },
})