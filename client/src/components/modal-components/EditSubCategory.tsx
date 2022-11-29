import React, { Dispatch, SetStateAction, useState } from "react"
import { useAppDispatch } from "../../hooks/redux"
import { updateSubCategory } from "../../store/actions/categoryAction"
import { Input } from "../common/Input"

interface ModalFormProps {
    id: string
    title: string
    setOldTitle: Dispatch<SetStateAction<string>>
    setShowModal: Dispatch<SetStateAction<boolean>>
}

export const EditSubCategory: React.FC<ModalFormProps> = ({ id, title, setOldTitle, setShowModal }) => {
    const [errorMessage, setErrorMessage] = useState("")

    const dispatch = useAppDispatch()

    const clearFormHandler = () => {
        setShowModal(false)
        setErrorMessage("")
    }

    const submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault()
        try {
            if (title) {
                dispatch(updateSubCategory(id, { newTitle: title }))
                setShowModal(false)
            } else {
                setErrorMessage("Please enter the new sub-category title")
            }
        } catch (error) {
            console.log(error)
        }
    }

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
