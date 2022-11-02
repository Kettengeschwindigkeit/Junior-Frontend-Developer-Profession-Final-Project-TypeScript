import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICategory, ServerResponse, ISubCategory } from "../../models/models"
import { MessageType } from '../../types'

interface CategoryState {
    categories: ICategory[]
    isLoading: boolean
    type: MessageType
    status: string
}

const initialState: CategoryState = {
    categories: [],
    isLoading: false,
    type: null,
    status: "",
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
        receive(state, action: PayloadAction<ServerResponse<ICategory[]>>) {
            state.isLoading = false
            state.type = "success"
            state.categories = action.payload.result
        },
        create(state, action: PayloadAction<ServerResponse<ICategory>>) {
            state.isLoading = false
            state.categories.push(action.payload.result)
            state.type = "success"
            state.status = action.payload.message
        },
        remove(state, action: PayloadAction<ServerResponse<ICategory>>) {
            state.isLoading = false
            state.categories = state.categories.filter(category => category._id !== action.payload.result._id)
            state.type = "success"
            state.status = action.payload.message
        },
        update(state, action: PayloadAction<ServerResponse<ICategory>>) {
            state.isLoading = false
            const index = state.categories.findIndex(category => category._id === action.payload.result._id)
            state.categories[index].title = action.payload.result.title
            state.type = "success"
            state.status = action.payload.message
        },
        createSub(state, action: PayloadAction<ServerResponse<ISubCategory>>) {
            state.isLoading = false
            const index = state.categories.findIndex(category => category._id === action.payload.result.parentCategoryId)
            state.categories[index].subCategories.push(action.payload.result)
            state.type = "success"
            state.status = action.payload.message
        },
        removeSub(state, action: PayloadAction<ServerResponse<ISubCategory>>) {
            state.isLoading = false
            const index = state.categories.findIndex(category => category._id === action.payload.result.parentCategoryId)
            state.categories[index].subCategories = state.categories[index].subCategories.filter(sub => sub._id !== action.payload.result._id)
            state.type = "success"
            state.status = action.payload.message
        },
        updateSub(state, action: PayloadAction<ServerResponse<ISubCategory>>) {
            state.isLoading = false
            const index = state.categories.findIndex(category => category._id === action.payload.result.parentCategoryId)
            const subIndex = state.categories[index].subCategories.findIndex(sub => sub._id === action.payload.result._id)
            state.categories[index].subCategories[subIndex].title = action.payload.result.title
            state.type = "success"
            state.status = action.payload.message
        },
        clearStatus(state) {
            state.status = ""
        }
    }
})

export default categorySlice.reducer
