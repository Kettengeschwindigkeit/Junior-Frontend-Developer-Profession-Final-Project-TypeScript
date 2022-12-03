import React, { Dispatch, SetStateAction } from "react"

interface InputProps {
    label: string
    type: string
    value: string
    errorMessage: string
    setValue: Dispatch<SetStateAction<string>>
    setErrorMessage: Dispatch<SetStateAction<string>>
}

export const Input = ({ label, type, value, errorMessage, setValue, setErrorMessage }: InputProps) => {

    const changeHnadler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
        setErrorMessage("")
    }

    return (
        <label className="text-xs text-gray-600 font-bold">
            {label}
            <input
                type={type}
                className="w-full mt-1 px-2 py-1 text-xs text-black bg-gray-300 border border-gray-400 rounded shadow-lg focus:outline-none focus:ring focus:ring-gray-200"
                value={value}
                onChange={changeHnadler}
            />
            {errorMessage && <div className="m-2 text-xs text-red-500 drop-shadow">{errorMessage}</div>}
        </label>
    )
}
