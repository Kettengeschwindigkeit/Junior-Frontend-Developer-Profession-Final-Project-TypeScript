import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { updateCategory } from "../../store/actions/categoryAction"
import { authSlice } from "../../store/slices/authSlice"
import { categorySlice } from "../../store/slices/categorySlice"
import { Input } from "../common/Input"

interface ModalProps {
    id: string
    title: string
    setOldTitle: Dispatch<SetStateAction<string>>
    setShowModal: Dispatch<SetStateAction<boolean>>
}

export const EditCategory = ({ id, title, setOldTitle, setShowModal }: ModalProps) => {
    // const [newTitle, setNewTitle] = useState(oldTitle)
    const [errorMessage, setErrorMessage] = useState("")

    // console.log(oldTitle)
    // console.log(newTitle)
    // console.log(title)
    
    const dispatch = useAppDispatch()

    const { status } = useAppSelector(state => state.category)

    const clearFormHandler = () => {
        setShowModal(false)
        setErrorMessage("")
        // setNewTitle("")
    }

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault()
        try {
            if (title) {
                dispatch(updateCategory(id, { newTitle: title }))
                setShowModal(false)
                // setNewTitle("")
            } else {
                setErrorMessage("Please enter the new category title")
            }
        } catch (error) {
            console.log(error)
        }
    }

    // useEffect(() => {
    //     if (status !== "") {
    //         toast(status)
    //         dispatch(categorySlice.actions.clearStatus())
    //     }
    // }, [status])

    return (
        <form className="mx-auto py-10" onSubmit={submitHandler}>
            <div className="mb-4">
                <Input label="Title:" type="text" value={title} setValue={setOldTitle} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
            </div>
            <div className="flex gap-8 items-center justify-center mt-4">
                <button type="submit" className="btn">
                    Update
                </button>
                <button type="button" className="btn-cancel" onClick={clearFormHandler}>
                    Cancel
                </button>
            </div>
        </form>
    )
}
