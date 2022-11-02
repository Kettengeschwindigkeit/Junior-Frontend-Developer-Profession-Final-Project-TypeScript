import { Dispatch, SetStateAction, useState } from "react"
import { useParams } from "react-router-dom"
import { useAppDispatch } from "../../hooks/redux"
import { createItem } from "../../store/actions/subCategoryActions"
import { Input } from "../common/Input"

interface AddItemModalProps {
    id: string
    setShowModal: Dispatch<SetStateAction<boolean>>
}

export const AddItem = ({ id, setShowModal }: AddItemModalProps) => {
    const [title, setTitle] = useState("")
    const [translate, setTranslate] = useState("")
    const [titleErrorMessage, setTitleErrorMessage] = useState("")
    const [translateErrorMessage, setTranslateErrorMessage] = useState("")

    const dispatch = useAppDispatch()
    const params = useParams()

    const clearFormHandler = () => {
        setTitle("")
        setShowModal(false)
    }

    const handleSubmit = () => {
        try {
            if (title && translate) {
                const subCategoryId = params.id
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
        <form className="mx-auto py-10" onSubmit={e => e.preventDefault()}>
            <div className="mb-4">
                <Input label="Title" type="text" value={title} setValue={setTitle} errorMessage={titleErrorMessage} setErrorMessage={setTitleErrorMessage} />
            </div>
            <div>
                <Input label="Translate" type="text" value={translate} setValue={setTranslate} errorMessage={translateErrorMessage} setErrorMessage={setTranslateErrorMessage} />
            </div>
            <div className="flex gap-8 items-center justify-center mt-4">
                <button className="btn" onClick={handleSubmit}>
                    Add
                </button>
                <button className="btn-cancel" onClick={clearFormHandler}>
                    Cancel
                </button>
            </div>
        </form>
    )
}
