import React from "react"

interface ModalWindowProps {
    active: boolean
    children: React.ReactNode
}

export const ModalWindow = ({ active, children }: ModalWindowProps) => {
    return (
        <div className={
            active
                ? "flex items-center justify-center fixed w-screen h-screen top-0 left-0 bg-black/[.30] opacity-100 pointer-events-auto duration-500"
                : "flex items-center justify-center fixed w-screen h-screen top-0 left-0 opacity-0 pointer-events-none duration-500"
        }>
            <div className="w-1/4 p-5 bg-gray-100 rounded scale-100 duration-500 transition-all shadow-md">
                {children}
            </div>
        </div>
    )
}
