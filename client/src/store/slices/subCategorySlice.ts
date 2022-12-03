import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IItem, ISubCategory, ServerResponse } from "../../models/models"
import { MessageType } from "../../types"

interface ServerResponseGetItems {
    result: {
        sub: ISubCategory,
        list: IItem[]
    }
    message: string
    errorMessage: string
}

interface SubCategoryState {
    subCategory: ISubCategory | null
    items: IItem[]
    isLoading: boolean
    type: MessageType
    status: string
}

const initialState: SubCategoryState = {
    subCategory: null,
    items: [],
    isLoading: false,
    type: null,
    status: "",
}

export const subCategorySlice = createSlice({
    name: "subCategory",
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
        receive(state, action: PayloadAction<ServerResponseGetItems>) {
            state.isLoading = false
            state.type = "success"
            state.subCategory = action.payload.result.sub
            state.items = action.payload.result.list
        },
        createItem(state, action: PayloadAction<ServerResponse<IItem>>) {
            state.isLoading = false
            state.items.push(action.payload.result)
            state.type = "success"
            state.status = action.payload.message
        },
        removeItem(state, action: PayloadAction<ServerResponse<IItem>>) {
            state.isLoading = false
            state.items = state.items.filter(item => item._id !== action.payload.result._id)
            state.type = "success"
            state.status = action.payload.message
        },
        updateItem(state, action: PayloadAction<ServerResponse<IItem>>) {
            state.isLoading = false
            const index = state.items.findIndex(item => item._id === action.payload.result._id)
            state.items[index] = action.payload.result
            state.type = "success"
            state.status = action.payload.message
        },
        clearStatus(state) {
            state.status = ""
        }
    }
})

export default subCategorySlice.reducer
