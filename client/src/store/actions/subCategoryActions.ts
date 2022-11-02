import { AppDispatch } from "../index"
import axios from "../../axios/index"
import { IItem, ISubCategory, ServerResponse } from "../../models/models"
// import { itemSlice } from "../slices/itemSlice"
import { subCategorySlice } from "../slices/subCategorySlice"

interface ServerResponseGetItems {
    result: {
        sub: ISubCategory,
        list: IItem[]
    }
    message: string
    errorMessage: string
}

// Get SubCategory
export const getItems = (id: string) => {
    return async (dispatch: AppDispatch) => {
        dispatch(subCategorySlice.actions.fetching())
        try {
            const { data } = await axios.get<ServerResponseGetItems>(`sub/${id}`)
            if (data.result) {
                dispatch(subCategorySlice.actions.receive(data))
            } else if (data.message) {
                dispatch(subCategorySlice.actions.fetchFailed(data))
            } else {
                dispatch(subCategorySlice.actions.serverError(data))
            }
        } catch (error) {
            dispatch(subCategorySlice.actions.fetchError(error as Error))
        }
    }
}

// Create New Item
export const createItem = (requestData: { title: string, translate: string, subId: string }) => {
    return async (dispatch: AppDispatch) => {
        dispatch(subCategorySlice.actions.fetching())
        try {
            const { data } = await axios.post<ServerResponse<IItem>>("items", requestData)
            if (data.result) {
                dispatch(subCategorySlice.actions.create(data))
            } else if (data.message) {
                dispatch(subCategorySlice.actions.fetchFailed(data))
            } else {
                dispatch(subCategorySlice.actions.serverError(data))
            }
        } catch (error) {
            dispatch(subCategorySlice.actions.fetchError(error as Error))
        }
    }
}

// Remove Item
export const removeItem = (id: string) => {
    return async (dispatch: AppDispatch) => {
        dispatch(subCategorySlice.actions.fetching())
        try {
            const { data } = await axios.delete<ServerResponse<IItem>>(`items/${id}`)
            if (data.result) {
                dispatch(subCategorySlice.actions.removeItem(data))
            } else if (data.message) {
                dispatch(subCategorySlice.actions.fetchFailed(data))
            } else {
                dispatch(subCategorySlice.actions.serverError(data))
            }
        } catch (error) {
            dispatch(subCategorySlice.actions.fetchError(error as Error))
        }
    }
}

// Update Item
export const updateItem = (id: string, requestData: { newTitle: string, newTranslate: string }) => {
    return async (dispatch: AppDispatch) => {
        dispatch(subCategorySlice.actions.fetching())
        try {
            const { data } = await axios.put<ServerResponse<IItem>>(`items/${id}`, requestData)
            if (data.result) {
                dispatch(subCategorySlice.actions.updateItem(data))
            } else if (data.message) {
                dispatch(subCategorySlice.actions.fetchFailed(data))
            } else {
                dispatch(subCategorySlice.actions.serverError(data))
            }
        } catch (error) {
            dispatch(subCategorySlice.actions.fetchError(error as Error))
        }
    }
}

// // Create New SubCategory
// export const createSubCategory = (requestData: { id: string, title: string }) => {
//     return async (dispatch: AppDispatch) => {
//         dispatch(categorySlice.actions.fetching())
//         try {
//             const { data } = await axios.post<ServerResponse<ISubCategory>>("sub", requestData)
//             if (data.result) {
//                 dispatch(categorySlice.actions.createSub(data))
//             } else if (data.message) {
//                 dispatch(categorySlice.actions.fetchFailed(data))
//             } else {
//                 dispatch(categorySlice.actions.serverError(data))
//             }
//         } catch (error) {
//             dispatch(categorySlice.actions.fetchError(error as Error))
//         }
//     }
// }

// // Remove SubCategory
// export const removeSubCategory = (id: string) => {
//     return async (dispatch: AppDispatch) => {
//         dispatch(categorySlice.actions.fetching())
//         try {
//             const { data } = await axios.delete<ServerResponse<ISubCategory>>(`sub/${id}`)
//             if (data.result) {
//                 dispatch(categorySlice.actions.removeSub(data))
//             } else if (data.message) {
//                 dispatch(categorySlice.actions.fetchFailed(data))
//             } else {
//                 dispatch(categorySlice.actions.serverError(data))
//             }
//         } catch (error) {
//             dispatch(categorySlice.actions.fetchError(error as Error))
//         }
//     }
// }

// // Update SubCategory
// export const updateSubCategory = (id: string, requestData: { newTitle: string }) => {
//     return async (dispatch: AppDispatch) => {
//         dispatch(subCategorySlice.actions.fetching())
//         try {
//             const { data } = await axios.put<ServerResponse<ISubCategory>>(`sub/${id}`, requestData)
//             if (data.result) {
//                 dispatch(subCategorySlice.actions.update(data))
//             } else if (data.message) {
//                 dispatch(subCategorySlice.actions.fetchFailed(data))
//             } else {
//                 dispatch(subCategorySlice.actions.serverError(data))
//             }
//         } catch (error) {
//             dispatch(subCategorySlice.actions.fetchError(error as Error))
//         }
//     }
// }
