import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import toast from "@/utils/notification/toast";

const initialState = {
    showSearch: false
}

export const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        setShowSearch: (state, action) => {
            state.showSearch = action.payload
        },
    },
});

export const showSearch = (state) => state.blog.showSearch;
// Action creators are generated for each case reducer function
export const {
    setShowSearch,
} = blogSlice.actions;

export default blogSlice.reducer;
