import { useEffect, useState } from "react"
import LoadingBar from "react-top-loading-bar"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useAppDispatch, useAppSelector } from "./hooks/redux"
import { useLoading } from "./hooks/useLoading"
import { useMessage } from "./hooks/useMessage"
import { getCategories } from "./store/actions/categoryAction"
import { Header } from "./components/layout/Header"
import { Main } from "./components/layout/Main"
import { Footer } from "./components/layout/Footer"

const App = () => {
  const [showLoader, setshowLoader] = useState(100)

  const { isAuth } = useAppSelector(state => state.auth)

  const dispatch = useAppDispatch()
  const isLoading = useLoading()

  useEffect(() => {
    if (isAuth) {
      dispatch(getCategories())
    }
  }, [isAuth, dispatch])

  useMessage()

  return (
    <>
      <Header />
      <Main />
      <Footer />
      <ToastContainer position="bottom-right" />
      {isLoading && <LoadingBar color="black" progress={showLoader} onLoaderFinished={() => setshowLoader(0)} />}
    </>
  )
}

export default App
