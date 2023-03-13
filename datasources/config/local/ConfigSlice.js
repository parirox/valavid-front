import {createSlice} from '@reduxjs/toolkit';
import {getCookie} from "cookies-next";
import toast from "@/utils/notification/toast";

const initialState = {
    collection: {
        modal: false,
        selected_footage: {}
    }
}

export const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        setModalCollectionTo: (state, action) => {
            if (getCookie("valavid_token")) {
                state.collection.selected_footage = action.payload.footage_details
                state.collection.modal = action.payload.active
            }
            else {
                toast.error("لطفا ابتدا در سایت ثبت نام و یا وارد حساب کاریری خود شوید.");
            }
        },
    },
});
// shortcut stats
export const modalCollectionState = (state) => state.config.collection.modal;
export const collectionSelectedFootage = (state) => state.config.collection.selected_footage;
// Action creators are generated for each case reducer function
export const {setModalCollectionTo} = configSlice.actions;

export default configSlice.reducer;
