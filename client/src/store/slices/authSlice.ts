import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ACCESS_KEY } from "../../constants"
import { IUser } from "../../models/models"

interface AuthState {
    access: string
    email: string
    error: string
    isAuth: boolean
    isLoading: boolean
    status: string
}

const initialState: AuthState = {
    access: localStorage.getItem(ACCESS_KEY) ?? "",
    email: localStorage.getItem("email") ?? "",
    error: "",
    isAuth: Boolean(localStorage.getItem(ACCESS_KEY)),
    isLoading: false,
    status: ""
}

interface AuthPayloadSuccess {
    user: IUser 
    token: string
    message: string
}

interface AuthPayloadFail {
    message: string
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        fetching(state) {
            state.isLoading = true
        },
        loginSuccess(state, action: PayloadAction<AuthPayloadSuccess>) {
            state.access = action.payload.token
            state.email = action.payload.user.email
            state.isAuth = Boolean(action.payload.token)
            state.isLoading = false
            state.status = action.payload.message

            localStorage.setItem(ACCESS_KEY, action.payload.token)
            localStorage.setItem("email", action.payload.user.email)
        },
        loginFailed(state, action: PayloadAction<AuthPayloadFail>) {
            state.isLoading = false
            state.status = action.payload.message
        },
        fetchError(state, action: PayloadAction<Error>) {
            state.isLoading = false
            state.error = action.payload.message
        },
        clearStatus(state) {
            state.status = ""
        },
        logout(state) {
            state.access = ""
            state.email = ""
            state.isAuth = false
            state.status = ""

            localStorage.removeItem(ACCESS_KEY)
            localStorage.removeItem("email")
        }
    }
})

export default authSlice.reducer
