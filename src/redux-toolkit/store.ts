import { configureStore } from "@reduxjs/toolkit";

import resultReducer from './slices/resultSlice'
export const store = configureStore({
    reducer: {
        result: resultReducer
    }

})

export type rootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch