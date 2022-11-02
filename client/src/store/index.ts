import { combineReducers, configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/authSlice"
import categoryReducer from "./slices/categorySlice"
import subCategoryReducer from "./slices/subCategorySlice"
// import itemSlice from "./slices/itemSlice"

const rootReducer = combineReducers({
    auth: authReducer,
    category: categoryReducer,
    subCategory: subCategoryReducer,
    // item: itemSlice
})

export function setupStore() {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore["dispatch"]
