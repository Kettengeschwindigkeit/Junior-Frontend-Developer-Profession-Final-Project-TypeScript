import { useState } from "react"
import { useAppSelector } from "../hooks/redux"
import { ModalWindow } from "../components/common/ModalWindow"
import { AddCategory } from "../components/modal-components/AddCategory"

export const MainPage = () => {
    const [showModal, setShowModal] = useState(false)
    const { isAuth } = useAppSelector(state => state.auth)

    return (
        <div>
            {isAuth && <button className="m-2 text-xs text-gray-600 font-bold hover:text-black duration-100" onClick={() => setShowModal(true)}>Add New Category</button>}
            <ModalWindow active={showModal}><AddCategory setShowModal={setShowModal} /></ModalWindow>
        </div>
    )
}
