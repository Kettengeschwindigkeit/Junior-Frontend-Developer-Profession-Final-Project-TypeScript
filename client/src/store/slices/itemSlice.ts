import { createSlice, PayloadAction } from "@reduxjs/toolkit"
// import { IItem, ISubCategory, ServerResponse } from "../../models/models"
// import { MessageType } from "../../types"

// interface ServerResponseGetItems {
//     result: {
//         sub: ISubCategory,
//         list: IItem[]
//     }
//     message: string
//     errorMessage: string
// }

// interface ItemState {
//     subCategory: ISubCategory | null
//     items: IItem[]
//     isLoading: boolean
//     type: MessageType
//     status: string
// }

// const initialState: ItemState = {
//     subCategory: null,
//     items: [],
//     isLoading: false,
//     type: null,
//     status: "",
// }

// export const itemSlice = createSlice({
//     name: "item",
//     initialState,
//     reducers: {
//         fetching(state) {
//             state.isLoading = true
//         },
//         fetchFailed(state, action: PayloadAction<{ message: string }>) {
//             state.isLoading = false
//             state.type = "warning"
//             state.status = action.payload.message
//         },
//         fetchError(state, action: PayloadAction<Error>) {
//             state.isLoading = false
//             state.type = "error"
//             state.status = action.payload.message
//         },
//         serverError(state, action: PayloadAction<{ errorMessage: string }>) {
//             state.isLoading = false
//             state.type = "error"
//             state.status = action.payload.errorMessage
//         },
//         receive(state, action: PayloadAction<ServerResponseGetItems>) {
//             state.isLoading = false
//             state.type = "success"
//             state.subCategory = action.payload.result.sub
//             state.items = action.payload.result.list
//         },
//         create(state, action: PayloadAction<ServerResponse<IItem>>) {
//             state.isLoading = false
//             state.items.push(action.payload.result)
//             state.type = "success"
//             state.status = action.payload.message
//         },
//         // remove(state, action: PayloadAction<ServerResponse<ICategory>>) {
//         //     state.isLoading = false
//         //     state.categories = state.categories.filter(category => category._id !== action.payload.result._id)
//         //     state.type = "success"
//         //     state.status = action.payload.message
//         // },
//         // update(state, action: PayloadAction<ServerResponse<ICategory>>) {
//         //     state.isLoading = false
//         //     const index = state.categories.findIndex(category => category._id === action.payload.result._id)
//         //     state.categories[index].title = action.payload.result.title
//         //     state.type = "success"
//         //     state.status = action.payload.message
//         // },
//         // createSub(state, action: PayloadAction<ServerResponse<ISubCategory>>) {
//         //     state.isLoading = false
//         //     const index = state.categories.findIndex(category => category._id === action.payload.result.parentCategoryId)
//         //     state.categories[index].subCategories.push(action.payload.result)
//         //     state.type = "success"
//         //     state.status = action.payload.message
//         // },
//         // removeSub(state, action: PayloadAction<ServerResponse<ISubCategory>>) {
//         //     state.isLoading = false
//         //     const index = state.categories.findIndex(category => category._id === action.payload.result.parentCategoryId)
//         //     state.categories[index].subCategories = state.categories[index].subCategories.filter(sub => sub._id !== action.payload.result._id)
//         //     state.type = "success"
//         //     state.status = action.payload.message
//         // },
//         // updateSub(state, action: PayloadAction<ServerResponse<ISubCategory>>) {
//         //     state.isLoading = false
//         //     const index = state.categories.findIndex(category => category._id === action.payload.result.parentCategoryId)
//         //     const subIndex = state.categories[index].subCategories.findIndex(sub => sub._id === action.payload.result._id)
//         //     state.categories[index].subCategories[subIndex].title = action.payload.result.title
//         //     state.type = "success"
//         //     state.status = action.payload.message
//         // },
//         // clearStatus(state) {
//         //     state.status = ""
//         // }
//     }
// })

// export default itemSlice.reducer
