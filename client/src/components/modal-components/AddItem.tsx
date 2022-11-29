import React, { Dispatch, SetStateAction, useState } from "react"
import { useAppDispatch } from "../../hooks/redux"
import { createItem } from "../../store/actions/subCategoryActions"
import { Input } from "../common/Input"

interface ModalFormProps {
    id: string
    setShowModal: Dispatch<SetStateAction<boolean>>
}

export const AddItem: React.FC<ModalFormProps> = ({ id, setShowModal }) => {
    const [title, setTitle] = useState("")
    const [translate, setTranslate] = useState("")
    const [titleErrorMessage, setTitleErrorMessage] = useState("")
    const [translateErrorMessage, setTranslateErrorMessage] = useState("")

    const dispatch = useAppDispatch()

    const clearFormHandler = (): void => {
        setTitle("")
        setShowModal(false)
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault()
        try {
            if (title && translate) {
                dispatch(createItem({ subId: id, title, translate }))
                setTitle("")
                setShowModal(false)
            } else if (!title) {
                setTitleErrorMessage("Please enter the title")
            } else {
                setTranslateErrorMessage("Please enter the translate")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form className="mx-auto py-10" onSubmit={handleSubmit}>
            <div className="mb-4">
                <Input label="Title" type="text" value={title} setValue={setTitle} errorMessage={titleErrorMessage} setErrorMessage={setTitleErrorMessage} />
            </div>
            <div>
                <Input label="Translate" type="text" value={translate} setValue={setTranslate} errorMessage={translateErrorMessage} setErrorMessage={setTranslateErrorMessage} />
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
