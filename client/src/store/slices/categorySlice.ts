import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICategory, ServerResponse, ISubCategory } from "../../models/models"

interface CategoryState {
    categories: ICategory[]
    isLoading: boolean
    status: string
    warning: string
    error: string
}

const initialState: CategoryState = {
    categories: [],
    isLoading: false,
    status: "",
    warning: "",
    error: ""
}

export const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        fetching(state) {
            state.isLoading = true
        },
        fetchFailed(state, action: PayloadAction<{ message: string }>) {
            state.isLoading = false
            state.warning = action.payload.message
        },
        fetchError(state, action: PayloadAction<Error>) {
            state.isLoading = false
            state.error = action.payload.message
        },
        serverError(state, action: PayloadAction<{ errorMessage: string }>) {
            state.isLoading = false
            state.error = action.payload.errorMessage
        },
        received(state, action: PayloadAction<ServerResponse<ICategory[]>>) {
            state.isLoading = false
            state.categories = action.payload.result
        },
        created(state, action: PayloadAction<ServerResponse<ICategory>>) {
            state.isLoading = false
            state.categories.push(action.payload.result)
            state.status = action.payload.message
        },
        removed(state, action: PayloadAction<ServerResponse<ICategory>>) {
            state.isLoading = false
            state.categories = state.categories.filter(category => category._id !== action.payload.result._id)
            state.status = action.payload.message
        },
        updated(state, action: PayloadAction<ServerResponse<ICategory>>) {
            state.isLoading = false
            const index = state.categories.findIndex(category => category._id === action.payload.result._id)
            state.categories[index].title = action.payload.result.title
            state.status = action.payload.message
        },
        subCreated(state, action: PayloadAction<ServerResponse<ISubCategory>>) {
            state.isLoading = false
            const index = state.categories.findIndex(category => category._id === action.payload.result.parentCategoryId)
            state.categories[index].subCategories.push(action.payload.result)
            state.status = action.payload.message
        },
        subRemoved(state, action: PayloadAction<ServerResponse<ISubCategory>>) {
            state.isLoading = false
            const index = state.categories.findIndex(category => category._id === action.payload.result.parentCategoryId)
            state.categories[index].subCategories = state.categories[index].subCategories.filter(sub => sub._id !== action.payload.result._id)
            state.status = action.payload.message
        },
        statusCleared(state) {
            state.status = ""
        },
        warningCleared(state) {
            state.warning = ""
        },
        errorCleared(state) {
            state.error = ""
        }
    }
})

export default categorySlice.reducer
