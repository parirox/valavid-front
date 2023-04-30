import {createSlice} from '@reduxjs/toolkit';
// import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
    formData: {
        price: [],
        resolution: [],
        frame_rate: [],
        video_time: [],
        environment: [],
        color_theme: [],
        colors: [],
        people_count: [],
        gender: [],
        camera_angle: [],
        orientation: [],
        aspect_ratio: [],
        country: "",
        state: "",
        city: "",
        shutter_speed: [],
    }
};

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setFormData: (state, action) => {
            const {field, value} = action.payload
            state.formData[field] = value
        }
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
export const productFormData = (state) => state.product.formData
// Action creators are generated for each case reducer function
export const {setFormData} = productSlice.actions;
export default productSlice.reducer;
