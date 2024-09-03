import { configureStore } from "@reduxjs/toolkit";

import resultReducer from './slices/resultSlice'
import questionReducer from './slices/questionSlice'

export const store = configureStore({
    reducer: {
        result: resultReducer,
        question: questionReducer
    }

})

export type rootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch