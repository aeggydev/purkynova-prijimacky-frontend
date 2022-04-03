import { configureStore } from "@reduxjs/toolkit"
import table from "./table"
import login from "./login"

export const store = configureStore({
    reducer: { table, login }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
