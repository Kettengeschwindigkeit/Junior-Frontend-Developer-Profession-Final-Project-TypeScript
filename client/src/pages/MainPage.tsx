import { useState } from "react"
import { useAppSelector } from "../hooks/redux"
import { ModalWindow } from "../components/common/ModalWindow"
import { AddCategory } from "../components/modal-components/AddCategory"

export const MainPage = () => {
    const [showModal, setShowModal] = useState(false)
    const { isAuth } = useAppSelector(state => state.auth)

    return (
        <div>
            {isAuth
                ? <button className="m-2 text-xs text-gray-600 font-bold hover:text-black duration-100" onClick={() => setShowModal(true)}>Add New Category</button>
                : <div className="text-center">
                    <h2 className="m-10 text-4xl font-extrabold text-gray-400 drop-shadow-xl">Wordbook React App v1.0.0</h2>
                    <div className="mb-4 text-sm text-gray-600 font-bold">
                        <a href="https://result.school" className="hover:text-orange-600" target="_blank">RESULT SCHOOL</a>&nbsp;Junior-Frontend-Developer-Profession course Final Project
                    </div>
                    <div className="text-sm text-gray-600 font-bold">
                        Fullstack Single Page Application using&nbsp;
                        <a href="https://reactjs.org" className="hover:text-blue-800" target="_blank">React,</a>&nbsp;
                        <a href="https://www.typescriptlang.org" className="hover:text-blue-500" target="_blank">TypeScript,</a>&nbsp;
                        <a href="https://nodejs.org/en" className="hover:text-green-700" target="_blank">NodeJS,</a>&nbsp;
                        <a href="https://expressjs.com" className="hover:text-yellow-500" target="_blank">ExpressJS,</a>&nbsp;
                        <a href="https://redux-toolkit.js.org" className="hover:text-indigo-600" target="_blank">Redux-Toolkit,</a>&nbsp;
                        <a href="https://tailwindcss.com" className="hover:text-cyan-500" target="_blank">TailwindCSS</a>&nbsp;stack
                    </div>
                </div>
            }
            <ModalWindow active={showModal}><AddCategory setShowModal={setShowModal} /></ModalWindow>
        </div>
    )
}
