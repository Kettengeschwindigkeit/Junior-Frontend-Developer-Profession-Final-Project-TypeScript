import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { createCategory } from "../../store/actions/categoryAction"
import { authSlice } from "../../store/slices/authSlice"
import { Input } from "../common/Input"

interface ModalProps {
    setShowModal: Dispatch<SetStateAction<boolean>>
}

export const AddCategory = ({ setShowModal }: ModalProps) => {
    const [title, setTitle] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const { status } = useAppSelector(state => state.category)

    const dispatch = useAppDispatch()

    const clearFormHandler = () => {
        setShowModal(false)
        setErrorMessage("")
        setTitle("")
    }

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault()
        try {
            if (title) {
                dispatch(createCategory({ title }))
                setShowModal(false)
                setTitle("")
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
    //         dispatch(authSlice.actions.clearStatus())
    //     }
    // }, [status])

    return (
        <form className="mx-auto py-10" onSubmit={submitHandler}>
            <div className="mb-4">
                <Input label="Title:" type="text" value={title} setValue={setTitle} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
            </div>
            <div className="flex gap-8 items-center justify-center mt-4">
                <button type="submit" className="btn">
                    Add
                </button>
                <button type="button" className="btn-cancel" onClick={clearFormHandler}>
                    Cancel
                </button>
            </div>
        </form>
    )
}
