import React, { useEffect, useCallback, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { useAppDispatch } from "../hooks/redux"
import { removeSubCategory } from "../store/actions/categoryAction"
// import { AddItem } from "../components/modalComponents/AddItem"
// import { Item } from "../components/Item"
// import { ModalWindow } from "../components/common/ModalWindow"
// import { getItems } from "../redux/features/item/itemSlice"
// import { removeSubCategory } from "../redux/features/subCategory/subCategorySlice"
// import { removeSubCategory } from "../redux/features/category/categorySlice"

export const SubCategoryPage = () => {
    const [showModal, setShowModal] = useState(false)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const params = useParams()

    // const { items } = useSelector(state => state.item)
    // console.log(items)
    // const sortedItems = [...items].sort((a, b) => a.title > b.title ? 1 : -1)

    // const fetchItems = useCallback(async () => {
    //     try {
    //         dispatch(getItems(params.id))
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }, [dispatch, params.id])

    const removeSubCategoryHandler = () => {
        try {
            if (params.id) {
                dispatch(removeSubCategory(params.id))
                // navigate("/")
            } else {
                toast.warning("Not found...")
            }

        } catch (error) {
            console.log(error)
        }
    }

    // useEffect(() => {
    //     fetchItems()
    // }, [fetchItems])

    return (
        <div>
            <div className="flex items-center justify-between">
                <ul className="flex gap-8 m-2">
                    <li className="text-xs text-gray-600 font-bold hover:text-black">
                        <button onClick={() => setShowModal(true)}>Add New Item</button>
                    </li>
                    <li className="text-xs text-gray-600 font-bold hover:text-black">
                        <Link to="edit">
                            <button>Update</button>
                        </Link>
                    </li>
                    <li className="text-xs text-gray-600 font-bold hover:text-red-500">
                        <button onClick={removeSubCategoryHandler}>Delete</button>
                    </li>
                </ul>
                <div className="m-2 text-xs text-gray-600 font-bold">SUB</div>
            </div>
            <ul>
                {/* {sortedItems.map(item => <Item key={item._id} item={item} />)} */}
            </ul>
            {/* <ModalWindow active={showModal}><AddItem setShowModal={setShowModal} /></ModalWindow> */}
        </div>

    )
}
