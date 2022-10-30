import React, { useState, useEffect, useCallback } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { ModalWindow } from "../components/common/ModalWindow"
import { EditCategory } from "../components/modal-components/EditCategory"
import { useAppDispatch, useAppSelector } from "../hooks/redux"
import { removeCategory } from "../store/actions/categoryAction"
import { authSlice } from "../store/slices/authSlice"
import { categorySlice } from "../store/slices/categorySlice"
// import axios from "../utils/axios"
// import { getCategoryById, removeCategory } from "../redux/features/category/categorySlice"
// import { ModalWindow } from "../components/common/ModalWindow"
// import { AddSubCategory } from "../components/modalComponents/AddSubCategory"
// import { EditCategoryPage } from "../components/modalComponents/EditCategoryPage"

export const CategoryPage = () => {
    const [showModal, setShowModal] = useState(false)
    const [title, setTitle] = useState("")

    // console.log(title)

    //     // const [category, setCategory] = useState(null)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const params = useParams()

    const { status } = useAppSelector(state => state.category)
    const { categories } = useAppSelector(state => state.category)
    const index = categories.findIndex(el => el._id === params.id)
    const category = categories[index]

    //     console.log(category.title)
    //     console.log(category._id)

    //     // const fetchCategory = useCallback(async () => {
    //     //     const { data } = await axios.get(`/categories/${params.id}`)
    //     //     setCategory(data.category)
    //     // }, [params.id])

    const removeCategoryHandler = () => {
        try {
            // if (params.id) {
            dispatch(removeCategory(category._id))
            navigate("/")
            // } else {
            //     toast("Category not found...")
            // }
        } catch (error) {
            console.log(error)
        }
    }

        useEffect(() => {
            setTitle(category.title)
        }, [category])

    //     useEffect(() => {
    //         dispatch(getCategoryById(params.id))
    //       }, [dispatch, params.id])

    // useEffect(() => {
    //     if (status !== "") {
    //         toast(status)
    //         dispatch(categorySlice.actions.clearStatus())
    //     }
    // }, [status])

    return (
        <>
            <div className="flex items-center justify-between">
                <ul className="flex gap-8 m-2">
                    <li className="text-xs text-gray-600 font-bold hover:text-black">
                        {/* //                             <button onClick={() => setShowModal(true)}>Add New SubCategory</button> */}
                    </li>
                    <li className="text-xs text-gray-600 font-bold hover:text-black">
                        <button onClick={() => setShowModal(true)}>Update</button>
                    </li>
                    <li className="text-xs text-gray-600 font-bold hover:text-red-500">
                        <button onClick={removeCategoryHandler}>Delete</button>
                    </li>
                </ul>
                <div className="m-2 text-xs text-gray-600 font-bold">
                    {title}
                </div>
            </div>
            {/* //             <ModalWindow active={showModal}><AddSubCategory setShowModal={setShowModal} /></ModalWindow> */}
            <ModalWindow active={showModal}><EditCategory title={title} setOldTitle={setTitle} id={category._id} setShowModal={setShowModal} /></ModalWindow>
        </>

    )
}
