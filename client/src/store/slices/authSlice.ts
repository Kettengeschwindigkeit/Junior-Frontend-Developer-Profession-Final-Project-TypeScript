// import { createSlice, PayloadAction } from "@reduxjs/toolkit"
// import { ACCESS_KEY } from "../../constants"
// import { IUser } from "../../models/models"

// interface AuthState {
//     access: string
//     email: string
//     isAuth: boolean
//     isLoading: boolean
//     status: string
//     warning: string
//     error: string
// }

// const initialState: AuthState = {
//     access: localStorage.getItem(ACCESS_KEY) ?? "",
//     email: localStorage.getItem("email") ?? "",
//     isAuth: Boolean(localStorage.getItem(ACCESS_KEY)),
//     isLoading: false,
//     status: "",
//     warning: "",
//     error: "",
// }

// interface PayloadSuccess {
//     user: IUser 
//     token: string
//     message: string
// }

// export const authSlice = createSlice({
//     name: "auth",
//     initialState,
//     reducers: {
//         fetching(state) {
//             state.isLoading = true
//         },
//         fetchFailed(state, action: PayloadAction<{ message: string }>) {
//             state.isLoading = false
//             state.warning = action.payload.message
//         },
//         fetchError(state, action: PayloadAction<Error>) {
//             state.isLoading = false
//             state.error = action.payload.message
//         },
//         serverError(state, action: PayloadAction<{ errorMessage: string }>) {
//             state.isLoading = false
//             state.error = action.payload.errorMessage
//         },
//         loginSuccess(state, action: PayloadAction<PayloadSuccess>) {
//             state.access = action.payload.token
//             state.email = action.payload.user.email
//             state.isAuth = Boolean(action.payload.token)
//             state.isLoading = false
//             state.status = action.payload.message

//             localStorage.setItem(ACCESS_KEY, action.payload.token)
//             localStorage.setItem("email", action.payload.user.email)
//         },
//         logout(state) {
//             state.access = ""
//             state.email = ""
//             state.isAuth = false
//             state.status = ""

//             localStorage.removeItem(ACCESS_KEY)
//             localStorage.removeItem("email")
//         },
//         statusCleared(state) {
//             state.status = ""
//         },
//         warningCleared(state) {
//             state.warning = ""
//         },
//         errorCleared(state) {
//             state.error = ""
//         }
//     }
// })

// export default authSlice.reducer

// -------------------------------------------------------------------------------------------------------------------------

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
    token: string
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
            state.isLoading = false
            state.type = "warning"
            state.status = action.payload.message
        },
        fetchError(state, action: PayloadAction<Error>) {
            state.isLoading = false
            state.type = "error"
            state.status = action.payload.message
        },
        serverError(state, action: PayloadAction<{ errorMessage: string }>) {
            state.isLoading = false
            state.type = "error"
            state.status = action.payload.errorMessage
        },
        loginSuccess(state, action: PayloadAction<PayloadSuccess>) {
            state.access = action.payload.token
            state.email = action.payload.user.email
            state.isAuth = Boolean(action.payload.token)
            state.isLoading = false
            state.type = "success"
            state.status = action.payload.message

            localStorage.setItem(ACCESS_KEY, action.payload.token)
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
