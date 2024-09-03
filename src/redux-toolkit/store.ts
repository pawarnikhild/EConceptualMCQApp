import { configureStore } from "@reduxjs/toolkit";

import authReducer from './slices/authSlice'
import questionReducer from './slices/questionSlice'
import resultReducer from './slices/resultSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        question: questionReducer,
        result: resultReducer,
    }

})

export type rootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch