import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({

    name: "requests",

    initialState: [],

    reducers: {
        addRequest: (state, action)=> action.payload || [],

        removeRequest: (state, action) => []
    }
})

export const {addRequest, removeRequest} = requestSlice.actions;
export default requestSlice.reducer;