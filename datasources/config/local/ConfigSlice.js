import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    collection:{
        modal:false,
        selected_footage:{}
    }
}

export const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        setModalCollectionTo:(state,action)=>{
            state.collection.selected_footage = action.payload.footage_details
            state.collection.modal = action.payload.active
        }
    },
});
// shortcut stats
export const modalCollectionState = (state) => state.config.collection.modal;
export const collectionSelectedFootage = (state) => state.config.collection.selected_footage;
// Action creators are generated for each case reducer function
export const {setModalCollectionTo} = configSlice.actions;

export default configSlice.reducer;
