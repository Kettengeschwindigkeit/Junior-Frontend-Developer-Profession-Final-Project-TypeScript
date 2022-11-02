import { useState } from "react"
import { useDispatch } from "react-redux"
import { useAppDispatch } from "../../hooks/redux"
import { IItem } from "../../models/models"
import { removeItem } from "../../store/actions/subCategoryActions"
import { ModalWindow } from "../common/ModalWindow"
import { EditItem } from "../modal-components/EditItem"

interface ItemProps {
    item: IItem
}

export const Item = ({ item }: ItemProps) => {
    const [showModal, setShowModal] = useState(false)

    const dispatch = useAppDispatch()

    const removeItemHandler = () => {
        try {
            dispatch(removeItem(item._id))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <li className="flex items-center justify-between hover:bg-blue-50 duration-100">
            <div className="flex m-2 hover:bg-blue-50">
                <div className="p-2 bg-gray-100 text-xs text-gray-600 font-bold hover:text-black cursor-pointer" onClick={() => setShowModal(true)}>
                    {item.title}
                </div>
                &nbsp;
                <div className="p-2 bg-green-100 text-xs text-gray-600 font-bold">
                    {item.translate}
                </div>
            </div>
            <button className="m-2 text-xs text-gray-300 font-bold hover:text-red-500 duration-100" onClick={removeItemHandler}>Delete</button>
            <ModalWindow active={showModal}><EditItem oldTitle={item.title} oldTranslate={item.translate} id={item._id} setShowModal={setShowModal} /></ModalWindow>
        </li>
    )
}
