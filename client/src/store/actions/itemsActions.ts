import { AppDispatch } from "../index"
// import axios from "../../axios/index"
// import { IItem, ISubCategory, ServerResponse } from "../../models/models"
// import { itemSlice } from "../slices/itemSlice"

// interface ServerResponseGetItems {
//     result: {
//         sub: ISubCategory,
//         list: IItem[]
//     }
//     message: string
//     errorMessage: string
// }

// // Get Items
// export const getItems = (id: string) => {
//     return async (dispatch: AppDispatch) => {
//         dispatch(itemSlice.actions.fetching())
//         try {
//             const { data } = await axios.get<ServerResponseGetItems>(`sub/${id}`)
//             if (data.result) {
//                 dispatch(itemSlice.actions.receive(data))
//             } else if (data.message) {
//                 dispatch(itemSlice.actions.fetchFailed(data))
//             } else {
//                 dispatch(itemSlice.actions.serverError(data))
//             }
//         } catch (error) {
//             dispatch(itemSlice.actions.fetchError(error as Error))
//         }
//     }
// }

// // Create New Item
// export const createItem = (requestData: { title: string, translate: string, subId: string }) => {
//     return async (dispatch: AppDispatch) => {
//         dispatch(itemSlice.actions.fetching())
//         try {
//             const { data } = await axios.post<ServerResponse<IItem>>("items", requestData)
//             if (data.result) {
//                 dispatch(itemSlice.actions.create(data))
//             } else if (data.message) {
//                 dispatch(itemSlice.actions.fetchFailed(data))
//             } else {
//                 dispatch(itemSlice.actions.serverError(data))
//             }
//         } catch (error) {
//             dispatch(itemSlice.actions.fetchError(error as Error))
//         }
//     }
// }

// // // Remove Category
// // export const removeCategory = (id: string) => {
// //     return async (dispatch: AppDispatch) => {
// //         dispatch(categorySlice.actions.fetching())
// //         try {
// //             const { data } = await axios.delete<ServerResponse<ICategory>>(`categories/${id}`)
// //             if (data.result) {
// //                 dispatch(categorySlice.actions.remove(data))
// //             } else if (data.message) {
// //                 dispatch(categorySlice.actions.fetchFailed(data))
// //             } else {
// //                 dispatch(categorySlice.actions.serverError(data))
// //             }
// //         } catch (error) {
// //             dispatch(categorySlice.actions.fetchError(error as Error))
// //         }
// //     }
// // }

// // // Update Category
// // export const updateCategory = (id: string, requestData: { newTitle: string }) => {
// //     return async (dispatch: AppDispatch) => {
// //         dispatch(categorySlice.actions.fetching())
// //         try {
// //             const { data } = await axios.put<ServerResponse<ICategory>>(`categories/${id}`, requestData)
// //             if (data.result) {
// //                 dispatch(categorySlice.actions.update(data))
// //             } else if (data.message) {
// //                 dispatch(categorySlice.actions.fetchFailed(data))
// //             } else {
// //                 dispatch(categorySlice.actions.serverError(data))
// //             }
// //         } catch (error) {
// //             dispatch(categorySlice.actions.fetchError(error as Error))
// //         }
// //     }
// // }

// // // Create New SubCategory
// // export const createSubCategory = (requestData: { id: string, title: string }) => {
// //     return async (dispatch: AppDispatch) => {
// //         dispatch(categorySlice.actions.fetching())
// //         try {
// //             const { data } = await axios.post<ServerResponse<ISubCategory>>("sub", requestData)
// //             if (data.result) {
// //                 dispatch(categorySlice.actions.createSub(data))
// //             } else if (data.message) {
// //                 dispatch(categorySlice.actions.fetchFailed(data))
// //             } else {
// //                 dispatch(categorySlice.actions.serverError(data))
// //             }
// //         } catch (error) {
// //             dispatch(categorySlice.actions.fetchError(error as Error))
// //         }
// //     }
// // }

// // // Remove SubCategory
// // export const removeSubCategory = (id: string) => {
// //     return async (dispatch: AppDispatch) => {
// //         dispatch(categorySlice.actions.fetching())
// //         try {
// //             const { data } = await axios.delete<ServerResponse<ISubCategory>>(`sub/${id}`)
// //             if (data.result) {
// //                 dispatch(categorySlice.actions.removeSub(data))
// //             } else if (data.message) {
// //                 dispatch(categorySlice.actions.fetchFailed(data))
// //             } else {
// //                 dispatch(categorySlice.actions.serverError(data))
// //             }
// //         } catch (error) {
// //             dispatch(categorySlice.actions.fetchError(error as Error))
// //         }
// //     }
// // }

// // // Update SubCategory
// // export const updateSubCategory = (id: string, requestData: { newTitle: string }) => {
// //     return async (dispatch: AppDispatch) => {
// //         dispatch(categorySlice.actions.fetching())
// //         try {
// //             const { data } = await axios.put<ServerResponse<ISubCategory>>(`sub/${id}`, requestData)
// //             if (data.result) {
// //                 dispatch(categorySlice.actions.updateSub(data))
// //             } else if (data.message) {
// //                 dispatch(categorySlice.actions.fetchFailed(data))
// //             } else {
// //                 dispatch(categorySlice.actions.serverError(data))
// //             }
// //         } catch (error) {
// //             dispatch(categorySlice.actions.fetchError(error as Error))
// //         }
// //     }
// // }
