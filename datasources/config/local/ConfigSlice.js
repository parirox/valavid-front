import { createSlice } from '@reduxjs/toolkit';

const initialState = {

}

export const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {

    },
});
// shortcut stats
// export const example = (state) => state.config.example;
// Action creators are generated for each case reducer function
// export const {} = configSlice.actions;

export default configSlice.reducer;
