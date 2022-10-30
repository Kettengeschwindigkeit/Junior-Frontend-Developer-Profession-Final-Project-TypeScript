import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useAppDispatch, useAppSelector } from "../hooks/redux"
import { ModalWindow } from "../components/common/ModalWindow"
import { AddCategory } from "../components/modal-components/AddCategory"
import { authSlice } from "../store/slices/authSlice"
import { categorySlice } from "../store/slices/categorySlice"

export const MainPage = () => {
    const [showModal, setShowModal] = useState(false)

    const dispatch = useAppDispatch()

    const { isAuth } = useAppSelector(state => state.auth)
    const { status } = useAppSelector(state => state.category)

    // useEffect(() => {
    //     if (status !== "") {
    //         toast(status)
    //         dispatch(categorySlice.actions.clearStatus())
    //     }
    // }, [status])

    return (
        <div>
            {isAuth && <button className="m-2 text-xs text-gray-600 font-bold hover:text-black duration-100" onClick={() => setShowModal(true)}>Add New Category</button>}
            <ModalWindow active={showModal}><AddCategory setShowModal={setShowModal} /></ModalWindow>
        </div>
    )
}
