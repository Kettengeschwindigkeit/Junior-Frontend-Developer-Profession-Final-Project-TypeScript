import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ACCESS_KEY } from "../../constants"
import { IUser } from "../../models/models"
import { MessageType } from "../../types"

interface AuthState {
    access: string
    email: string
    isAuth: boolean
    isLoading: boolean
    type: MessageType
    status: string
}

const initialState: AuthState = {
    access: localStorage.getItem(ACCESS_KEY) ?? "",
    email: localStorage.getItem("email") ?? "",
    isAuth: Boolean(localStorage.getItem(ACCESS_KEY)),
    isLoading: false,
    type: null,
    status: "",
}

interface PayloadSuccess {
    user: IUser
    accessToken: string
    message: string
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        fetching(state) {
            state.isLoading = true
        },
        fetchFailed(state, action: PayloadAction<{ message: string }>) {
            state.status = action.payload.message
            state.isLoading = false
            state.type = "warning"
        },
        fetchError(state, action: PayloadAction<Error>) {
            state.status = action.payload.message
            state.isLoading = false
            state.type = "error"
        },
        serverError(state, action: PayloadAction<{ errorMessage: string }>) {
            state.status = action.payload.errorMessage
            state.isLoading = false
            state.type = "error"
        },
        loginSuccess(state, action: PayloadAction<PayloadSuccess>) {
            state.access = action.payload.accessToken
            state.email = action.payload.user.email
            state.isAuth = Boolean(action.payload.accessToken)
            state.status = action.payload.message
            state.isLoading = false
            state.type = "success"

            localStorage.setItem(ACCESS_KEY, action.payload.accessToken)
            localStorage.setItem("email", action.payload.user.email)
        },
        logout(state) {
            state.access = ""
            state.email = ""
            state.isAuth = false
            state.status = ""

            localStorage.removeItem(ACCESS_KEY)
            localStorage.removeItem("email")
        },
        clearStatus(state) {
            state.status = ""
        }
    }
})

export default authSlice.reducer
