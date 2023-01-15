import {createApi} from '@reduxjs/toolkit/query/react';
import {ApiAddress, ApiEndpoint, baseQuery} from '@/utils/api/api';
import {HYDRATE} from 'next-redux-wrapper';

export const userSliceApiTag = 'user_api';

const user_api = createApi({
    // extractRehydrationInfo(action, { reducerPath }) {
    //     if (action.type === HYDRATE) {
    //         console.log('HYDRATE', action, reducerPath);
    //         return action.payload[reducerPath];
    //     }
    // },
    reducerPath: userSliceApiTag,
    baseQuery,
    tagTypes: [userSliceApiTag],
    endpoints: (build) => ({
        //->> collections
        getCollection: build.query({
            query: () => ({
                url: ApiAddress(ApiEndpoint.user.collection.get),
                method: 'GET',
                headers: {
                    "Authorization": "Token cca3b7aaddd85d85513f55ddac72b4c5fc26d595",
                },
            }),
            providesTags: (result, error, id) => [
                {type: userSliceApiTag, id: 'CollectionList'}
            ],
        }),
        addCollection: build.mutation({
            query: (query) => ({
                url: ApiAddress(ApiEndpoint.user.collection.add),
                method: 'POST',
                body: query,
                headers: {
                    "Authorization": "Token cca3b7aaddd85d85513f55ddac72b4c5fc26d595",
                },
            }),
            providesTags: (result, error, id) => [
                {type: userSliceApiTag, id: 'Collection' + id}
            ],
            invalidatesTags: [{type: userSliceApiTag, id: 'CollectionList'}]
        }),
        editCollection: build.mutation({
            query: (query) => ({
                url: ApiAddress(ApiEndpoint.user.collection.edit, query[0]),
                method: 'PUT',
                body: query[1],
                headers: {
                    "Authorization": "Token cca3b7aaddd85d85513f55ddac72b4c5fc26d595",
                },
            }),
            providesTags: (result, error, id) => [
                {type: userSliceApiTag, id: 'Collection' + id}
            ],
            invalidatesTags: [{type: userSliceApiTag, id: 'CollectionList'}]
        }),
        removeCollection: build.mutation({
            query: (query) => ({
                url: ApiAddress(ApiEndpoint.user.collection.remove, query),
                method: 'DELETE',
                body: {},
                headers: {
                    "Authorization": "Token cca3b7aaddd85d85513f55ddac72b4c5fc26d595",
                },
            }),
            providesTags: (result, error, id) => [
                {type: userSliceApiTag, id: 'Collection' + id}
            ],
            invalidatesTags: [{type: userSliceApiTag, id: 'CollectionList'}]
        }),
        addProductToCollection: build.mutation({
            query: (query) => ({
                url: ApiAddress(ApiEndpoint.user.collection.add_product),
                method: 'POST',
                body: query,
                headers: {
                    "Authorization": "Token cca3b7aaddd85d85513f55ddac72b4c5fc26d595",
                },
            }),
            providesTags: (result, error, id) => [
                {type: userSliceApiTag, id: 'CollectionProduct' + id}
            ],
            invalidatesTags: [{type: userSliceApiTag, id: 'CollectionList'}]
        }),
        removeProductFromCollection: build.mutation({
            query: (query) => ({
                url: ApiAddress(ApiEndpoint.user.collection.remove_product),
                method: 'POST',
                body: query,
                headers: {
                    "Authorization": "Token cca3b7aaddd85d85513f55ddac72b4c5fc26d595",
                },
            }),
            providesTags: (result, error, id) => [
                {type: userSliceApiTag, id: 'CollectionProduct' + id}
            ],
            invalidatesTags: [{type: userSliceApiTag, id: 'CollectionList'}]
        }),
        //->> favorites

        //->> favorites
        getFavorites: build.query({
            query: () => ({
                url: ApiAddress(ApiEndpoint.user.favorite.get),
                method: 'GET',
                headers: {
                    "Authorization": "Token cca3b7aaddd85d85513f55ddac72b4c5fc26d595",
                },
            }),
            providesTags: (result, error, id) => [
                {type: userSliceApiTag, id: 'FavoritesList'}
            ],
        }),
        addToFavorites:build.mutation({
            query: (query) => ({
                url: ApiAddress(ApiEndpoint.user.favorite.add,query),
                method: 'GET',
                headers: {
                    "Authorization": "Token cca3b7aaddd85d85513f55ddac72b4c5fc26d595",
                },
            }),
            providesTags: (result, error, id) => [
              {type: userSliceApiTag, id: 'Favorite' + id}
            ],
            invalidatesTags: [
                {type: userSliceApiTag, id: 'FavoritesList'}
            ]
        }),
        removeFromFavorites:build.mutation({
            query: (query) => ({
                url: ApiAddress(ApiEndpoint.user.favorite.remove,query),
                method: 'GET',
                headers: {
                    "Authorization": "Token cca3b7aaddd85d85513f55ddac72b4c5fc26d595",
                },
            }),
            providesTags: (result, error, id) => [
                {type: userSliceApiTag, id: 'Favorite' + id}
            ],
            invalidatesTags: [
                {type: userSliceApiTag, id: 'FavoritesList'}
            ]
        }),
        //->> cart
        getCart:build.query({
            query: (query) => ({
                url: ApiAddress(ApiEndpoint.user.cart),
                method: 'GET',
                headers: {
                    "Authorization": "Token cca3b7aaddd85d85513f55ddac72b4c5fc26d595",
                },
            }),
            providesTags: (result, error, id) => [
                {type: userSliceApiTag, id: 'CartList'}
            ],
        }),
        addToCart:build.mutation({
            query: (query) => ({
                url: ApiAddress(ApiEndpoint.user.cart),
                method: 'POST',
                body: query,
                headers: {
                    "Authorization": "Token cca3b7aaddd85d85513f55ddac72b4c5fc26d595",
                },
            }),
            providesTags: (result, error, id) => [
                {type: userSliceApiTag, id: 'Cart' + id}
            ],
            invalidatesTags: [
                {type: userSliceApiTag, id: 'CartList'}
            ]
        }),
        removeFromCart:build.mutation({
            query: (query) => ({
                url: ApiAddress(ApiEndpoint.user.cart),
                method: 'DELETE',
                body: query,
                headers: {
                    "Authorization": "Token cca3b7aaddd85d85513f55ddac72b4c5fc26d595",
                },
            }),
            providesTags: (result, error, id) => [
                {type: userSliceApiTag, id: 'Cart' + id}
            ],
            invalidatesTags: [
                {type: userSliceApiTag, id: 'CartList'}
            ]
        }),
    })
});

export const {
    //->> collections
    useGetCollectionQuery,
    useAddCollectionMutation,
    useEditCollectionMutation,
    useRemoveCollectionMutation,
    useAddProductToCollectionMutation,
    useRemoveProductFromCollectionMutation,
    //->> favorites
    useGetFavoritesQuery,
    useAddToFavoritesMutation,
    useRemoveFromFavoritesMutation,
    //->> carts
    useGetCartQuery,
    useAddToCartMutation,
    useRemoveFromCartMutation
} = user_api;

export default user_api;
