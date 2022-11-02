import React, { Dispatch, SetStateAction, useState } from "react"
import { useDispatch } from "react-redux"
import { useAppDispatch } from "../../hooks/redux"
import { updateItem } from "../../store/actions/subCategoryActions"
import { Input } from "../common/Input"

interface EditItemModalProps {
    id: string
    oldTitle: string
    oldTranslate: string
    setShowModal: Dispatch<SetStateAction<boolean>>
}

export const EditItem = ({ id, oldTitle, oldTranslate, setShowModal }: EditItemModalProps) => {
    const [newTitle, setNewTitle] = useState(oldTitle)
    const [newTranslate, setNewTranslate] = useState(oldTranslate)
    const [titleErrorMessage, setTitleErrorMessage] = useState("")
    const [translateErrorMessage, setTranslateErrorMessage] = useState("")

    const dispatch = useAppDispatch()

    const clearFormHandler = () => {
        setShowModal(false)
    }

    const handleSubmit = () => {
        try {
            dispatch(updateItem(id, { newTitle, newTranslate }))
            setShowModal(false)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form className="mx-auto py-10" onSubmit={e => e.preventDefault()}>
            <div className="mb-4">
                <Input label="Title" type="text" value={newTitle} setValue={setNewTitle} errorMessage={titleErrorMessage} setErrorMessage={setTitleErrorMessage} />
            </div>
            <div>
                <Input label="Translate" type="text" value={newTranslate} setValue={setNewTranslate} errorMessage={translateErrorMessage} setErrorMessage={setTranslateErrorMessage} />
            </div>
            <div className="flex gap-8 items-center justify-center mt-4">
                <button className="btn" onClick={handleSubmit}>
                    Update
                </button>
                <button className="btn-cancel" onClick={clearFormHandler}>
                    Cancel
                </button>
            </div>
        </form>
    )
}
