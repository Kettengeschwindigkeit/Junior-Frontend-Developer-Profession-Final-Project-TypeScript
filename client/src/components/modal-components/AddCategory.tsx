import React, { Dispatch, SetStateAction, useState } from "react"
import { useAppDispatch } from "../../hooks/redux"
import { createCategory } from "../../store/actions/categoryAction"
import { Input } from "../common/Input"

export const AddCategory: React.FC<{ setShowModal: Dispatch<SetStateAction<boolean>> }> = ({ setShowModal }) => {
    const [title, setTitle] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const dispatch = useAppDispatch()

    const clearFormHandler = (): void => {
        setShowModal(false)
        setErrorMessage("")
        setTitle("")
    }

    const submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
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
