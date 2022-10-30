import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICategory } from "../../models/models"

interface CategoryState {
    categories: ICategory[]
    error: string
    isLoading: boolean
    status: string
}

interface PayloadSuccess<T> {
    result: T
    message: string
}

interface PayloadFail {
    message: string
}

const initialState: CategoryState = {
    categories: [],
    error: "",
    isLoading: false,
    status: ""
}

export const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        fetching(state) {
            state.isLoading = true
        },
        get(state, action: PayloadAction<PayloadSuccess<ICategory[]>>) {
            state.isLoading = false
            state.categories = action.payload.result
        },
        create(state, action: PayloadAction<PayloadSuccess<ICategory>>) {
            state.isLoading = false
            state.categories.push(action.payload.result)
            state.status = action.payload.message
        },
        remove(state, action: PayloadAction<PayloadSuccess<ICategory>>) {
            state.isLoading = false
            state.categories = state.categories.filter(category => category._id !== action.payload.result._id)
            state.status = action.payload.message
        },
        update(state, action: PayloadAction<PayloadSuccess<ICategory>>) {
            state.isLoading = false
            const index = state.categories.findIndex((category) => category._id === action.payload.result._id)
            state.categories[index] = action.payload.result
            state.status = action.payload.message
        },
        failed(state, action: PayloadAction<PayloadFail>) {
            state.isLoading = false
            state.status = action.payload.message
        },
        clearStatus(state) {
            state.status = ""
        },
        fetchError(state, action: PayloadAction<Error>) {
            state.isLoading = false
            state.error = action.payload.message
        }
    }
})

export default categorySlice.reducer
