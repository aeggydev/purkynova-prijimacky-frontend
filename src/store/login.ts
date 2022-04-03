import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface LoginState {
    showLogin: boolean
    loggedIn: boolean
}

const initialState: LoginState = {
    showLogin: false,
    loggedIn: false
}

export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        setShowLogin: (state, action: PayloadAction<boolean>) => {
            state.showLogin = action.payload
        },
        setLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.loggedIn = action.payload
        }
    }
})


export default loginSlice.reducer
export const { setLoggedIn, setShowLogin } = loginSlice.actions
