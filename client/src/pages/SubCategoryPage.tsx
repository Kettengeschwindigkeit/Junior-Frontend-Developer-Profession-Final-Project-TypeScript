import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { useAppDispatch, useAppSelector } from "../hooks/redux"
import { getItems } from "../store/actions/subCategoryActions"
import { removeSubCategory } from "../store/actions/categoryAction"
import { ModalWindow } from "../components/common/ModalWindow"
import { EditSubCategory } from "../components/modal-components/EditSubCategory"
import { Item } from "../components/elements/Item"
import { AddItem } from "../components/modal-components/AddItem"

export const SubCategoryPage = () => {
    const [title, setTitle] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [showAModalUpdate, setShowModalUpdate] = useState(false)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const params = useParams()

    const { items } = useAppSelector(state => state.subCategory)
    const { subCategory } = useAppSelector(state => state.subCategory)

    const sortedItems = [...items].sort((a, b) => a.title > b.title ? 1 : -1)

    const fetchSub = async () => {
        try {
            if (params.id) {
                dispatch(getItems(params.id))
            }
        } catch (error) {
            console.log(error)
        }
    }

    const removeSubCategoryHandler = () => {
        try {
            if (params.id) {
                dispatch(removeSubCategory(params.id))
                navigate("/")
            } else {
                toast.warning("Not found...")
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchSub()
    }, [params.id])

    useEffect(() => {
        if (subCategory) setTitle(subCategory.title)
    }, [subCategory])

    return (
        <div>
            <div className="flex items-center justify-between">
                <ul className="flex gap-8 m-2">
                    <li className="text-xs text-gray-600 font-bold hover:text-black">
                        <button onClick={() => setShowModal(true)}>Add New Item</button>
                    </li>
                    <li className="text-xs text-gray-600 font-bold hover:text-black">
                        <button onClick={() => setShowModalUpdate(true)}>Update</button>
                    </li>
                    <li className="text-xs text-gray-600 font-bold hover:text-red-500">
                        <button onClick={removeSubCategoryHandler}>Delete</button>
                    </li>
                </ul>
                <div className="m-2 text-xs text-gray-600 font-bold">{title}</div>
            </div>
            <ul>
                {sortedItems.map(item => <Item key={item._id} item={item} />)}
            </ul>
            {params.id && <ModalWindow active={showModal}><AddItem id={params.id} setShowModal={setShowModal} /></ModalWindow>}
            {params.id && <ModalWindow active={showAModalUpdate}><EditSubCategory title={title} id={params.id} setOldTitle={setTitle} setShowModal={setShowModalUpdate} /></ModalWindow>}
        </div>
    )
}
