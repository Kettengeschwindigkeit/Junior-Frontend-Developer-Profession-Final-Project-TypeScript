import { useEffect } from "react"
import { authSlice } from "../store/slices/authSlice"
import { categorySlice } from "../store/slices/categorySlice"
import { subCategorySlice } from "../store/slices/subCategorySlice"
import { showMessage } from "../utils/showMessage"
import { useAppDispatch, useAppSelector } from "./redux"

export function useMessage(): void {
    const dispatch = useAppDispatch()

    const authStatus = useAppSelector(state => state.auth.status)
    const authType = useAppSelector(state => state.auth.type)
    const categoryStatus = useAppSelector(state => state.category.status)
    const categoryType = useAppSelector(state => state.category.type)
    const subStatus = useAppSelector(state => state.subCategory.status)
    const subType = useAppSelector(state => state.subCategory.type)

    useEffect(() => {
        if (authStatus !== "") {
            showMessage(authType, authStatus)
            dispatch(authSlice.actions.clearStatus())
        } else if (categoryStatus !== "") {
            showMessage(categoryType, categoryStatus)
            dispatch(categorySlice.actions.clearStatus())
        } else if (subStatus !== "") {
            showMessage(subType, subStatus)
            dispatch(subCategorySlice.actions.clearStatus())
        }
    }, [authStatus, categoryStatus, subStatus])
}
