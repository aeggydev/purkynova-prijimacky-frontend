import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface LoginState {
    loggedIn: boolean
}

const initialState: LoginState = {
    loggedIn: false
}

export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        setLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.loggedIn = action.payload
        }
    }
})


export default loginSlice.reducer
export const { setLoggedIn } = loginSlice.actions
