import { configureStore } from "@reduxjs/toolkit";
import { calendarSlice } from "./calendar/calendarSlice";
import { uiSlice } from "./ui/uiSlice";

export const store = configureStore({
    reducer:{
        calendar : calendarSlice.reducer, 
        ui: uiSlice.reducer, 
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})
