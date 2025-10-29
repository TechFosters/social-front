import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({

    name: "connections",

    initialState: [],

    reducers:{
        addConnection: (state, action) => action.payload || [],

        removeConnection: (state, action) => []
    }
})

export const {addConnection, removeConnection} = connectionSlice.actions;

export default connectionSlice.reducer