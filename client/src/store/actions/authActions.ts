import axios from "../../axios/index"
import { IUser } from "../../models/models"
import { AppDispatch } from "../index"
import { authSlice } from "../slices/authSlice"

interface AuthResponse {
    user: IUser
    token: string
    message: string
    errorMessage: string
}

// Register
export const register = (requestData: { email: string, password: string}) => {
    return async (dispatch: AppDispatch) => {
        dispatch(authSlice.actions.fetching())
        try {
            const response = await axios.post<AuthResponse>("auth/register", requestData)
            const { user, token, message } = response.data
            if (user && token) {
                dispatch(authSlice.actions.loginSuccess({ user, token, message }))
            } else if (message) {
                dispatch(authSlice.actions.fetchFailed({ message }))
            } else {
                const { errorMessage } = response.data
                dispatch(authSlice.actions.serverError({ errorMessage }))
            }
        } catch (error) {
            dispatch(authSlice.actions.fetchError(error as Error))
        }
    }
}

// Login
export const login = (requestData: { email: string, password: string}) => {
    return async (dispatch: AppDispatch) => {
        dispatch(authSlice.actions.fetching())
        try {
            const response = await axios.post<AuthResponse>("auth/login", requestData)
            const { user, token, message } = response.data
            if (user && token) {
                dispatch(authSlice.actions.loginSuccess({ user, token, message }))
            } else if (message) {
                dispatch(authSlice.actions.fetchFailed({ message }))
            } else {
                const { errorMessage } = response.data
                dispatch(authSlice.actions.serverError({ errorMessage }))
            }
        } catch (error) {
            dispatch(authSlice.actions.fetchError(error as Error))
        }
    }
}
