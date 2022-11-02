// import axios from "../axios/index"
// import React, { useEffect, useCallback, useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { Link, useNavigate, useParams } from "react-router-dom"
// import { toast } from "react-toastify"
// import { ModalWindow } from "../components/common/ModalWindow"
// import { EditSubCategory } from "../components/modal-components/EditSubCategory"
// import { useAppDispatch, useAppSelector } from "../hooks/redux"
// import { removeSubCategory } from "../store/actions/categoryAction"
// import { Item } from "../components/elements/Item"
// import { AddItem } from "../components/modal-components/AddItem"
// import itemSlice from "../store/slices/itemSlice"
// import { getItems } from "../store/actions/itemsActions"
// // import { AddItem } from "../components/modalComponents/AddItem"
// // import { Item } from "../components/Item"
// // import { ModalWindow } from "../components/common/ModalWindow"
// // import { getItems } from "../redux/features/item/itemSlice"
// // import { removeSubCategory } from "../redux/features/subCategory/subCategorySlice"
// // import { removeSubCategory } from "../redux/features/category/categorySlice"

// export const SubCategoryPage = () => {
//     const [title, setTitle] = useState("")
//     const [showModal, setShowModal] = useState(false)
//     const [showAModalUpdate, setShowModalUpdate] = useState(false)

//     const dispatch = useAppDispatch()
//     const navigate = useNavigate()
//     const params = useParams()

//     // console.log(title)
//     // const { categories } = useAppSelector(state => state.category)
//     // categories.findIndex
//     // console.log(categories)
//     const { items } = useAppSelector(state => state.item)
//     const { subCategory } = useAppSelector(state => state.item)
//     console.log(items)
//     console.log(subCategory)
//     // const sortedItems = [...items].sort((a, b) => a.title > b.title ? 1 : -1)

//     const fetchSub = async () => {
//         try {
//             if (params.id) {
//                 dispatch(getItems(params.id))
//             }
//             // const { data } = await axios.get(`sub/${params.id}`)
//             // setTitle(data.title)
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     // const fetchItems = useCallback(async () => {
//     //     try {
//     //         dispatch(getItems(params.id))
//     //     } catch (error) {
//     //         console.log(error)
//     //     }
//     // }, [dispatch, params.id])

//     const removeSubCategoryHandler = () => {
//         try {
//             if (params.id) {
//                 dispatch(removeSubCategory(params.id))
//                 // navigate("/")
//             } else {
//                 toast.warning("Not found...")
//             }

//         } catch (error) {
//             console.log(error)
//         }
//     }

//     // useEffect(() => {
//     //     fetchItems()
//     // }, [fetchItems])

//     useEffect(() => {
//         fetchSub()
//     }, [params.id])

//     return (
//         <div>
//             <div className="flex items-center justify-between">
//                 <ul className="flex gap-8 m-2">
//                     <li className="text-xs text-gray-600 font-bold hover:text-black">
//                         <button onClick={() => setShowModal(true)}>Add New Item</button>
//                     </li>
//                     <li className="text-xs text-gray-600 font-bold hover:text-black">
//                         <button onClick={() => setShowModalUpdate(true)}>Update</button>
//                     </li>
//                     <li className="text-xs text-gray-600 font-bold hover:text-red-500">
//                         <button onClick={removeSubCategoryHandler}>Delete</button>
//                     </li>
//                 </ul>
//                 <div className="m-2 text-xs text-gray-600 font-bold">SUB</div>
//             </div>
//             <ul>
//                 {items.map(item => <Item key={item._id} item={item} />)}
//             </ul>
//             {params.id && <ModalWindow active={showModal}><AddItem id={params.id} setShowModal={setShowModal} /></ModalWindow>}
//             {params.id && <ModalWindow active={showAModalUpdate}><EditSubCategory title={title} id={params.id} setOldTitle={setTitle} setShowModal={setShowModalUpdate} /></ModalWindow>}
//         </div>

//     )
// }

// ====================================================================================================================================================================== WITH SUB-CATEGORY STATE

import axios from "../axios/index"
import React, { useEffect, useCallback, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { ModalWindow } from "../components/common/ModalWindow"
import { EditSubCategory } from "../components/modal-components/EditSubCategory"
import { useAppDispatch, useAppSelector } from "../hooks/redux"
import { removeSubCategory } from "../store/actions/categoryAction"
import { Item } from "../components/elements/Item"
import { AddItem } from "../components/modal-components/AddItem"
// import itemSlice from "../store/slices/itemSlice"
import { getItems } from "../store/actions/subCategoryActions"
// import { AddItem } from "../components/modalComponents/AddItem"
// import { Item } from "../components/Item"
// import { ModalWindow } from "../components/common/ModalWindow"
// import { getItems } from "../redux/features/item/itemSlice"
// import { removeSubCategory } from "../redux/features/subCategory/subCategorySlice"
// import { removeSubCategory } from "../redux/features/category/categorySlice"

export const SubCategoryPage = () => {
    const [title, setTitle] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [showAModalUpdate, setShowModalUpdate] = useState(false)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const params = useParams()

    // console.log(title)
    // const { categories } = useAppSelector(state => state.category)
    // categories.findIndex
    // console.log(categories)
    const { items } = useAppSelector(state => state.subCategory)
    const { subCategory } = useAppSelector(state => state.subCategory)
    // console.log(items)
    console.log(subCategory)
    // const sortedItems = [...items].sort((a, b) => a.title > b.title ? 1 : -1)

    const fetchSub = async () => {
        try {
            if (params.id) {
                dispatch(getItems(params.id))
                // setTitle(subCategory?.title)
            }
            // const { data } = await axios.get(`sub/${params.id}`)
            // setTitle(data.title)
        } catch (error) {
            console.log(error)
        }
    }

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
                <div className="m-2 text-xs text-gray-600 font-bold">SUB</div>
            </div>
            <ul>
                {items.map(item => <Item key={item._id} item={item} />)}
            </ul>
            {params.id && <ModalWindow active={showModal}><AddItem id={params.id} setShowModal={setShowModal} /></ModalWindow>}
            {params.id && <ModalWindow active={showAModalUpdate}><EditSubCategory title={title} id={params.id} setOldTitle={setTitle} setShowModal={setShowModalUpdate} /></ModalWindow>}
        </div>

    )
}
