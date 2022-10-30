import axios from "../../axios/index"
import { IUser } from "../../models/models"
import { AppDispatch } from "../index"
import { authSlice } from "../slices/authSlice"

interface AuthRequest {
    email: string
    password: string
}

interface AuthResponse {
    user: IUser
    token: string
    message: string
}

export const register = (data: AuthRequest) => {
    return async (dispatch: AppDispatch) => {
        dispatch(authSlice.actions.fetching())
        try {
            const response = await axios.post<AuthResponse>("auth/register", data)
            const { user, token, message } = response.data
            if (user && token) {
                dispatch(authSlice.actions.loginSuccess({ user, token, message }))
            } else {
                dispatch(authSlice.actions.loginFailed({ message }))
            }
        } catch (error) {
            dispatch(authSlice.actions.fetchError(error as Error))
        }
    }
}

export const login = (data: AuthRequest) => {
    return async (dispatch: AppDispatch) => {
        dispatch(authSlice.actions.fetching())
        try {
            const response = await axios.post<AuthResponse>("auth/login", data)
            const { user, token, message } = response.data
            if (user && token) {
                dispatch(authSlice.actions.loginSuccess({ user, token, message }))
            } else {
                dispatch(authSlice.actions.loginFailed({ message }))
            }
        } catch (error) {
            dispatch(authSlice.actions.fetchError(error as Error))
        }
    }
}
