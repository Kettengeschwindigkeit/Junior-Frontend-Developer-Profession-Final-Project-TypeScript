import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../hooks/redux"
import { login } from "../store/actions/authActions"
import { Input } from "../components/common/Input"
import { getCategories } from "../store/actions/categoryAction"
import { toast } from "react-toastify"
import { authSlice } from "../store/slices/authSlice"

export const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorEmailMessage, setErrorEmailMessage] = useState("")
    const [errorPasswordMessage, setErrorPasswordMessage] = useState("")

    const { isAuth, status } = useAppSelector(state => state.auth)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault()
        if (email && password) {
            dispatch(login({ email, password }))
        } else if (!email) {
            setErrorEmailMessage("Please enter your email")
        } else if (!password) {
            setErrorPasswordMessage("Please enter the password")
        }
    }

    useEffect(() => {
        if (isAuth) {
            // dispatch(getCategories())
            navigate("/")
        }
    }, [isAuth, navigate])

    // useEffect(() => {
    //     if (status !== "") {
    //         toast(status)
    //         dispatch(authSlice.actions.clearStatus())
    //     }
    // }, [status])

    return (
        <>
            <form className="w-1/4 h-60 mx-auto mt-40" onSubmit={submitHandler}>
                <h1 className="text-lg text-center text-gray-600 font-bold drop-shadow">
                    Authorization
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
                    <Link to="/register" className="flex justify-center items-center text-sm text-gray-600 font-bold drop-shadow hover:text-black focus:outline-none">
                        Have no account?
                    </Link>
                </div>
            </form>
        </>
    )
}
