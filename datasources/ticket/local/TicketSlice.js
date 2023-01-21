import {createSlice} from '@reduxjs/toolkit';
import toast from "@/utils/notification/toast";
import {isEmpty} from "@/utils/general";
// import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
    favorite: [],
    collection: [

    ]
}

export function checkInFavorite(cart, id) {
    return cart.some(item => (item.id === id))
}

export const ticketSlice = createSlice({
    name: 'ticket',
    initialState,
    reducers: {
        addToFavorite: (state, action) => {
            const has_product_in_favorite = state.favorite.some(item => (item.id === action.payload.id))
            if (has_product_in_favorite) {
                const index = state.favorite.findIndex((item) => item.id === action.payload.id);
                state.favorite.splice(index, 1);
                toast.info("محصول از لیست علاقه مندی های شما حذف شد.")
            } else {
                state.favorite.push({...action.payload, quantity: 1});
                toast.success("با موفقیت به لیست علاقه مندی های شما اضافه شد!")
            }
        },
        addCollection: (state, action) => {
            const {collection_name} = action.payload
            const nextLocalId = !isEmpty(state.collection) ? state.collection[state.collection.length - 1].localId + 1 : 1

            state.collection.push({localId: nextLocalId, name: collection_name,items:[]});
            toast.success(`مجموعه با موفقیت ایجاد شد!`)

        },
        addOrRemoveFootageInCollection: (state, action) => {
            const {localId, footage_details, type} = action.payload
            let collection_target = state.collection.find(c => c.localId === localId)
            switch (type) {
                case "add":
                    collection_target.items.push({id: footage_details.id, title: footage_details.title, media: footage_details.media})
                    toast.success(`مجموعه با موفقیت ایجاد شد!`)
                    break;
                case "remove":
                    const index = collection_target.items.findIndex((item) => item.id === footage_details.id);
                    collection_target.items.splice(index, 1);
                    toast.info(`با موفقیت حذف شد.`)
                    break;
            }
        },
    },
    // extraReducers: {
    //     [HYDRATE]: (state, action) => {
    //         return {
    //             ...state,
    //             ...action.payload
    //         };
    //     }
    // }
});
// shortcut stats
export const favoriteItems = (state) => state.ticket.favorite;
export const collectionItems = (state) => state.ticket.collection;
// Action creators are generated for each case reducer function
export const {addToFavorite, addCollection, addOrRemoveFootageInCollection} = ticketSlice.actions;

export default ticketSlice.reducer;
