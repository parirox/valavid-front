import {createApi} from '@reduxjs/toolkit/query/react';
import {ApiAddress, ApiEndpoint, baseQuery} from '@/utils/api/api';
import {HYDRATE} from 'next-redux-wrapper';

export const userSliceApiTag = 'user_api';

const user_api = createApi({
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath];
        }
    },
    reducerPath: userSliceApiTag,
    baseQuery,
    tagTypes: [userSliceApiTag],
    endpoints: (build) => ({
        //->> profile information
        GetProfileDetails: build.query({
            query: () => ({
                url: ApiAddress(ApiEndpoint.user.profile.details),
                method: 'GET',
            }),
            providesTags: (result, error, id) => [
                {type: userSliceApiTag, id: 'ProfileDetails'}
            ],
        }),
        //->> downloads
        GetDownloads: build.query({
            query: () => ({
                url: ApiAddress(ApiEndpoint.user.downloads),
                method: 'GET',
            }),
            providesTags: (result, error, id) => [
                {type: userSliceApiTag, id: 'DownloadsList'}
            ],
        }),
        //->> collections
        getCollection: build.query({
            query: () => ({
                url: ApiAddress(ApiEndpoint.user.collection.get),
                method: 'GET',
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
            }),
            providesTags: (result, error, id) => [
                {type: userSliceApiTag, id: 'CollectionProduct' + id}
            ],
            invalidatesTags: [{type: userSliceApiTag, id: 'CollectionList'}]
        }),
        //->> favorites
        getFavorites: build.query({
            query: () => ({
                url: ApiAddress(ApiEndpoint.user.favorite.get),
                method: 'GET',
            }),
            providesTags: (result, error, id) => [
                {type: userSliceApiTag, id: 'FavoritesList'}
            ],
        }),
        addToFavorites:build.mutation({
            query: (query) => ({
                url: ApiAddress(ApiEndpoint.user.favorite.add,query),
                method: 'GET',
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
            }),
            providesTags: (result, error, id) => [
                {type: userSliceApiTag, id: 'Cart' + id}
            ],
            invalidatesTags: [
                {type: userSliceApiTag, id: 'CartList'}
            ]
        }),
        //->> achievements
        GetMyAchievements: build.query({
            query: () => ({
                url: ApiAddress(ApiEndpoint.user.achievements),
                method: 'GET',
            }),
            providesTags: (result, error, id) => [
                {type: userSliceApiTag, id: 'MyAchievementsList'}
            ],
        }),
        //->> publishers
        GetPublisherProfile: build.query({
            query: (query) => ({
                url: ApiAddress(ApiEndpoint.publisher.profile,query),
                method: 'GET',
            }),
            providesTags: (result, error, id) => [
                {type: userSliceApiTag, id: 'PublisherProfile'}
            ],
        }),
        GetPublisherCollection: build.query({
            query: (query) => ({
                url: ApiAddress(ApiEndpoint.publisher.collection,query),
                method: 'GET',
            }),
            providesTags: (result, error, id) => [
                {type: userSliceApiTag, id: 'PublisherCollectionList'}
            ],
        }),
        GetPublisherProduct: build.query({
            query: (query) => ({
                url: ApiAddress(ApiEndpoint.publisher.product,query),
                method: 'GET',
            }),
            providesTags: (result, error, id) => [
                {type: userSliceApiTag, id: 'PublisherProductList'}
            ],
        }),
        GetPublisherAchievements: build.query({
            query: (query) => ({
                url: ApiAddress(ApiEndpoint.publisher.achievements,query),
                method: 'GET',
            }),
        }),
        //->> user forms endpoints
        UpdateUserInformation:build.mutation({
            query: (query) => ({
                url: ApiAddress(ApiEndpoint.user.profile.forms.main,query),
                method: 'PATCH',
                body:query,
            }),
            invalidatesTags: [
                {type: userSliceApiTag, id: 'ProfileDetails'}
            ]
        }),
        ChangePassword:build.mutation({
            query: (query) => ({
                url: ApiAddress(ApiEndpoint.user.profile.forms.change_password,query),
                method: 'POST',
                body:query
            }),
            invalidatesTags: [
                {type: userSliceApiTag, id: 'ProfileDetails'}
            ]
        })
    })
});

export const {
    //->> user
    useGetProfileDetailsQuery,
    //->> downloads
    useGetDownloadsQuery,
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
    //->> achievements
    useGetMyAchievementsQuery,
    //->> carts
    useGetCartQuery,
    useAddToCartMutation,
    useRemoveFromCartMutation,
    //->> publishers
    useGetPublisherProfileQuery,
    useGetPublisherCollectionQuery,
    useGetPublisherProductQuery,
    useGetPublisherAchievementsQuery,
    //->> user forms
    useUpdateUserInformationMutation,
    useChangePasswordMutation,
} = user_api;


export const {
    GetPublisherProfile,
    GetPublisherCollection,
    GetPublisherProduct,
    GetPublisherAchievements,
} = user_api.endpoints

export default user_api;
