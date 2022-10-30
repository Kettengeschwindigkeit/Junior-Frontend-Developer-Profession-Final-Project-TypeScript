// import { toast } from "react-toastify"
import { AppDispatch } from "../index"
import axios from "../../axios"
import { categorySlice } from "../slices/categorySlice"
import { ICategory, IServerResponse } from "../../models/models"

// Get My Categories
export const getCategories = () => {
    return async (dispatch: AppDispatch) => {
        dispatch(categorySlice.actions.fetching())
        try {
            const { data } = await axios.get<IServerResponse<ICategory[]>>("categories")
            if (data.result) {
                dispatch(categorySlice.actions.get(data))
            } else {
                dispatch(categorySlice.actions.failed(data))
                // toast(data.message)
            }
        } catch (error) {
            dispatch(categorySlice.actions.fetchError(error as Error))
        }
    }
}

// Create New Category
export const createCategory = (requestData: { title: string }) => {
    return async (dispatch: AppDispatch) => {
        dispatch(categorySlice.actions.fetching())
        try {
            const { data } = await axios.post<IServerResponse<ICategory>>("categories", requestData)
            if (data.result) {
                dispatch(categorySlice.actions.create(data))
                // toast(data.message)
            } else {
                dispatch(categorySlice.actions.failed(data))
                // toast(data.message)
            }
        } catch (error) {
            dispatch(categorySlice.actions.fetchError(error as Error))
        }
    }
}

// Remove Category
export const removeCategory = (id: string) => {
    return async (dispatch: AppDispatch) => {
        dispatch(categorySlice.actions.fetching())
        try {
            const { data } = await axios.delete<IServerResponse<ICategory>>(`categories/${id}`)
            if (data.result) {
                dispatch(categorySlice.actions.remove(data))
                // toast(data.message)
            } else {
                dispatch(categorySlice.actions.failed(data))
                // toast(data.message)
            }
        } catch (error) {
            dispatch(categorySlice.actions.fetchError(error as Error))
        }
    }
}

// Update Category
export const updateCategory = (id: string, requestData: {newTitle: string}) => {
    return async (dispatch: AppDispatch) => {
        dispatch(categorySlice.actions.fetching())
        try {
            const { data } = await axios.put<IServerResponse<ICategory>>(`categories/${id}`, requestData)
            if (data.result) {
                dispatch(categorySlice.actions.update(data))
                // toast(data.message)
            } else {
                dispatch(categorySlice.actions.failed(data))
                // toast(data.message)
            }
        } catch (error) {
            dispatch(categorySlice.actions.fetchError(error as Error))
        }
    }
}
