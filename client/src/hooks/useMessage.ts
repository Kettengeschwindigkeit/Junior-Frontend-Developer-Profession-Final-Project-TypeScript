import { useEffect } from "react";
import { toast } from "react-toastify";
import { authSlice } from "../store/slices/authSlice";
import { categorySlice } from "../store/slices/categorySlice";
import { useAppDispatch } from "./redux";

interface useMessageParams {
    authStatus: string
    authWarning: string
    authError: string
    categoryStatus: string
    categoryWarning: string
    categoryError: string
}

export function useMessage({ authStatus, authWarning, authError, categoryStatus, categoryWarning, categoryError }: useMessageParams): void {
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (authStatus !== "") {
            toast.success(authStatus)
            dispatch(authSlice.actions.statusCleared())
        } else if (categoryStatus !== "") {
            toast.success(categoryStatus)
            dispatch(categorySlice.actions.statusCleared())
        }
    }, [authStatus, categoryStatus])

    useEffect(() => {
        if (authWarning !== "") {
            toast.warning(authWarning)
            dispatch(authSlice.actions.warningCleared())
        } else if (categoryWarning !== "") {
            toast.warning(categoryWarning)
            dispatch(categorySlice.actions.warningCleared())
        }
    }, [authWarning, categoryWarning])

    useEffect(() => {
        if (authError !== "") {
            toast.error(authError)
            dispatch(authSlice.actions.errorCleared())
        } else if (categoryError !== "") {
            toast.error(categoryError)
            dispatch(categorySlice.actions.errorCleared())
        }
    }, [authError, categoryError])
}
