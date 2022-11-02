import { useEffect, useState } from "react"
import LoadingBar from "react-top-loading-bar"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useAppDispatch, useAppSelector } from "./hooks/redux"
import { useMessage } from "./hooks/useMessage"
import { getCategories } from "./store/actions/categoryAction"
import { Header } from "./components/layout/Header"
import { Main } from "./components/layout/Main"
import { Footer } from "./components/layout/Footer"

const App = () => {
  const [showLoader, setshowLoader] = useState(100)

  const { isAuth } = useAppSelector(state => state.auth)

  const dispatch = useAppDispatch()

  const authLoading = useAppSelector(state => state.auth.isLoading)
  const categoryLoading = useAppSelector(state => state.category.isLoading)
  const subLoading = useAppSelector(state => state.subCategory.isLoading)

  const authStatus = useAppSelector(state => state.auth.status)
  const authType = useAppSelector(state => state.auth.type)
  const categoryStatus = useAppSelector(state => state.category.status)
  const categoryType = useAppSelector(state => state.category.type)
  const subStatus = useAppSelector(state => state.subCategory.status)
  const subType = useAppSelector(state => state.subCategory.type)

  useEffect(() => {
    if (isAuth) {
      dispatch(getCategories())
    }
  }, [isAuth, dispatch])

  useMessage({ authStatus, authType, categoryStatus, categoryType, subStatus, subType })

  return (
    <>
      <Header />
      <Main />
      <Footer />
      <ToastContainer position="bottom-right" />
      {(authLoading || categoryLoading || subLoading) && <LoadingBar color="black" progress={showLoader} onLoaderFinished={() => setshowLoader(0)} />}
    </>
  )
}

export default App
