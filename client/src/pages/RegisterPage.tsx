import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../hooks/redux"
import { register } from "../store/actions/authActions"
import { Input } from "../components/common/Input"

export const RegisterPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorEmailMessage, setErrorEmailMessage] = useState("")
    const [errorPasswordMessage, setErrorPasswordMessage] = useState("")

    const { isAuth } = useAppSelector(state => state.auth)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault()
        if (email && password) {
            dispatch(register({ email, password }))
        } else if (!email) {
            setErrorEmailMessage("Please enter your email")
        } else {
            setErrorPasswordMessage("Please enter the password")
        }
    }

    useEffect(() => {
        if (isAuth) {
            navigate("/")
        }
    }, [isAuth, navigate])

    return (
        <>
            <form className="w-1/4 h-60 mx-auto mt-40" onSubmit={submitHandler}>
                <h1 className="text-lg text-center text-gray-600 font-bold drop-shadow">
                    Registration
                </h1>
                <div className="mb-4">
                    <Input label="Email:" type="text" value={email} setValue={setEmail} errorMessage={errorEmailMessage} setErrorMessage={setErrorEmailMessage} />
                </div>
                <div>
                    <Input label="Password:" type="password" value={password} setValue={setPassword} errorMessage={errorPasswordMessage} setErrorMessage={setErrorPasswordMessage} />
                </div>
                <div className="flex gap-8 justify-center mt-4">
                    <button type="submit" className="btn">
                        Sign Up
                    </button>
                    <Link to="/login" className="flex justify-center items-center text-sm text-gray-600 font-bold drop-shadow hover:text-black focus:outline-none">
                        Already have account?
                    </Link>
                </div>
            </form>
        </>
    )
}
