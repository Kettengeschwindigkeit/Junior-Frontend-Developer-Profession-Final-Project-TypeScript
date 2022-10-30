import { useAppSelector } from "../../hooks/redux"
import { Content } from "./Content"
import { Navbar } from "./Navbar"

export function Main() {
    const { isAuth } = useAppSelector(state => state.auth)

    return (
        <div className="flex">
            <div>
                {isAuth && <Navbar />}
            </div>
            <div className="w-full h-screen">
                <Content />
            </div>
        </div>
    )
}
