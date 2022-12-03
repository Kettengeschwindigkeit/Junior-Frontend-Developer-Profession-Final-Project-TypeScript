import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ModalWindow } from "../components/common/ModalWindow"
import { AddSubCategory } from "../components/modal-components/AddSubCategory"
import { EditCategory } from "../components/modal-components/EditCategory"
import { useAppDispatch, useAppSelector } from "../hooks/redux"
import { removeCategory } from "../store/actions/categoryAction"

export const CategoryPage = () => {
    const [title, setTitle] = useState("")
    const [showAModalAddSub, setShowModalAddSub] = useState(false)
    const [showAModalUpdate, setShowModalUpdate] = useState(false)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const params = useParams()

    const { categories } = useAppSelector(state => state.category)
    const index = categories.findIndex(el => el._id === params.id)
    const category = categories[index]

    const removeCategoryHandler = () => {
        try {
            dispatch(removeCategory(category._id))
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        setTitle(category.title)
    }, [category])

    return (
        <>
            <div className="flex items-center justify-between">
                <ul className="flex gap-8 m-2">
                    <li className="text-xs text-gray-600 font-bold hover:text-black">
                        <button onClick={() => setShowModalAddSub(true)}>Add New SubCategory</button>
                    </li>
                    <li className="text-xs text-gray-600 font-bold hover:text-black">
                        <button onClick={() => setShowModalUpdate(true)}>Update</button>
                    </li>
                    <li className="text-xs text-gray-600 font-bold hover:text-red-500">
                        <button onClick={removeCategoryHandler}>Delete</button>
                    </li>
                </ul>
                <div className="m-2 text-xs text-gray-600 font-bold">
                    {title}
                </div>
            </div>
            <ModalWindow active={showAModalAddSub}>
                <AddSubCategory id={category._id} setShowModal={setShowModalAddSub} />
            </ModalWindow>
            <ModalWindow active={showAModalUpdate}>
                <EditCategory title={title} setOldTitle={setTitle} id={category._id} setShowModal={setShowModalUpdate} />
            </ModalWindow>
        </>
    )
}
