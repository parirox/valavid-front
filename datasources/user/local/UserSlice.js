import { createSlice } from '@reduxjs/toolkit';
// import { HYDRATE } from 'next-redux-wrapper';

const initialState = {

}

export const userSlice = createSlice({
    name: 'user',
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
// export const example = (state) => state.example;
// Action creators are generated for each case reducer function
// export const {} = userSlice.actions;

export default userSlice.reducer;
