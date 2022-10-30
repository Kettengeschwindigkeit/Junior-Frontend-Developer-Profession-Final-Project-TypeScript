import React from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { authSlice } from '../../store/slices/authSlice'

export function Header() {
    const dispatch = useAppDispatch()
    
    const { email, isAuth } = useAppSelector(state => state.auth)

    const logoutHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        dispatch(authSlice.actions.logout())
        toast("Come again!")
    }

    return (
        <nav className="flex justify-between items-center bg-gray-300 shadow-md">
            <Link to="/" className="m-2 px-4 text-gray-600 font-bold hover:text-black">Wordbook</Link>
            <div>
                {isAuth ?
                    <div className="flex-col">
                        <div className="flex justify-end">
                            <button className="btn m-2" onClick={logoutHandler}>Sign Out</button>
                        </div>
                        <div className="flex justify-end text-xs text-gray-500 font-bold">
                            <span className="p-2">{email}</span>
                        </div>
                    </div>
                    : <Link to="/login"><button className="btn m-4">Sign In</button></Link>
                }
            </div>
        </nav>
    )
}
