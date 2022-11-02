import React, { ChangeEvent, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import axios from "../../axios/index"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { useDebounce } from "../../hooks/useDebounce"
import { IItem, ServerResponse } from "../../models/models"
import { authSlice } from "../../store/slices/authSlice"

export function Header() {
    const [dropdown, setDropdown] = useState(false)
    const [items, setItems] = useState<IItem[]>([])
    const [value, setValue] = useState("")

    const debounced = useDebounce<string>(value)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const { email, isAuth } = useAppSelector(state => state.auth)

    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }

    const closeDropdown = (item: IItem) => {
        navigate(`sub/${item.parentSubId}`)
        setDropdown(false)
        setValue("")
    }

    async function search() {
        const response = await axios.post<ServerResponse<IItem[]>>("/items/search", { starts_with: value })
        console.log(response)
        setItems(response.data.result)
    }

    const logoutHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        dispatch(authSlice.actions.logout())
        toast("Come again!")
    }

    useEffect(() => {
        if (debounced.length >= 2) {
            search().then(() => setDropdown(true))
        } else {
            setDropdown(false)
        }
    }, [debounced])

    return (
        <nav className="flex justify-between items-center bg-gray-300 shadow-md">
            <Link to="/" className="m-2 px-4 text-gray-600 font-bold hover:text-black">Wordbook</Link>
            {isAuth && <div className="relative">
                <input type="text" className="h-[42px] px-4 py-2 border rounded shadow-lg focus:outline-none focus:ring focus:ring-gray-200" value={value} onChange={changeHandler} placeholder="Search..." />
                {dropdown && <ul className="absolute h-[200px] top-[42px] left-0 right-0 bg-white shadow-md list-none overflow-y-scroll">
                    {items
                        // .filter(item => item.title.indexOf(value) !== -1)
                        .map(item => <li key={item._id} className="hover:text-white hover:bg-gray-300 hover:transition-colors cursor-pointer" onClick={() => closeDropdown(item)}>{item.title}</li>)
                    }
                </ul>}
            </div>}
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
        </nav>
    )
}
