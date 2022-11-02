// import { useEffect } from "react";
// import { toast } from "react-toastify";
// import { authSlice } from "../store/slices/authSlice";
// import { categorySlice } from "../store/slices/categorySlice";
// import { useAppDispatch } from "./redux";

// interface useMessageParams {
//     authStatus: string
//     authWarning: string
//     authError: string
//     categoryStatus: string
//     categoryWarning: string
//     categoryError: string
// }

// export function useMessage({ authStatus, authWarning, authError, categoryStatus, categoryWarning, categoryError }: useMessageParams): void {
//     const dispatch = useAppDispatch()

//     useEffect(() => {
//         if (authStatus !== "") {
//             toast.success(authStatus)
//             dispatch(authSlice.actions.statusCleared())
//         } else if (categoryStatus !== "") {
//             toast.success(categoryStatus)
//             dispatch(categorySlice.actions.statusCleared())
//         }
//     }, [authStatus, categoryStatus])

//     useEffect(() => {
//         if (authWarning !== "") {
//             toast.warning(authWarning)
//             dispatch(authSlice.actions.warningCleared())
//         } else if (categoryWarning !== "") {
//             toast.warning(categoryWarning)
//             dispatch(categorySlice.actions.warningCleared())
//         }
//     }, [authWarning, categoryWarning])

//     useEffect(() => {
//         if (authError !== "") {
//             toast.error(authError)
//             dispatch(authSlice.actions.errorCleared())
//         } else if (categoryError !== "") {
//             toast.error(categoryError)
//             dispatch(categorySlice.actions.errorCleared())
//         }
//     }, [authError, categoryError])
// }

// ----------------------------------------------------------------------------------------------------

import { useEffect } from "react"
import { authSlice } from "../store/slices/authSlice"
import { categorySlice } from "../store/slices/categorySlice"
import { subCategorySlice } from "../store/slices/subCategorySlice"
import { MessageType } from "../types"
import { showMessage } from "../utils/showMessage"
import { useAppDispatch } from "./redux"

interface useMessageParams {
    authStatus: string
    authType: MessageType
    categoryStatus: string
    categoryType: MessageType
    subStatus: string
    subType: MessageType
}

export function useMessage({ authStatus, authType, categoryStatus, categoryType, subStatus, subType }: useMessageParams): void {
    const dispatch = useAppDispatch()

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
