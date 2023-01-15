import { createSlice } from '@reduxjs/toolkit';
// import { HYDRATE } from 'next-redux-wrapper';

const initialState = {

};

export const accountingSlice = createSlice({
    name: 'accounting',
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
// export const {  } = accountingSlice.actions;
export default accountingSlice.reducer;
