import { createSlice } from '@reduxjs/toolkit';
// import { HYDRATE } from 'next-redux-wrapper';

const initialState = {

};

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {

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

// Action creators are generated for each case reducer function
// export const {  } = productSlice.actions;
export default productSlice.reducer;
