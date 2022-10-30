import { useEffect, useState } from "react"
import LoadingBar from "react-top-loading-bar"
import { toast, ToastContainer } from "react-toastify"
import { useAppDispatch, useAppSelector } from "./hooks/redux"
import { Header } from "./components/layout/Header"
import { Main } from "./components/layout/Main"
import { Footer } from "./components/layout/Footer"
import "react-toastify/dist/ReactToastify.css"
import { getCategories } from "./store/actions/categoryAction"
import { categorySlice } from "./store/slices/categorySlice"
import { authSlice } from "./store/slices/authSlice"

const App = () => {
  const [showLoader, setshowLoader] = useState(100)

  const { isAuth } = useAppSelector(state => state.auth)

  // const authStatus = 
  // const categoryStatus = useAppSelector(state => state.category.status)

  const isAuthLoading = useAppSelector(state => state.auth.isLoading)
  const isCategoryLoading = useAppSelector(state => state.category.isLoading)

  const dispatch = useAppDispatch()

  const authStatus = useAppSelector(state => state.auth.status)
  const categoryStatus = useAppSelector(state => state.category.status)

  useEffect(() => {
    if (isAuth) {
      dispatch(getCategories())
    }
  }, [isAuth])

  useEffect(() => {
    if (authStatus !== "") {
      toast(authStatus)
      dispatch(authSlice.actions.clearStatus())
    }
  }, [authStatus])

  useEffect(() => {
    if (categoryStatus !== "") {
      toast(categoryStatus)
      dispatch(categorySlice.actions.clearStatus())
    }
  }, [categoryStatus])

  // useEffect(() => {
  //   if (authStatus || categoryStatus) {
  //     const status = authStatus || categoryStatus
  //     console.log(status)
  //     toast(status)
  //   }
  // }, [authStatus, categoryStatus])

  return (
    <>
      <Header />
      <Main />
      <Footer />
      <ToastContainer position="bottom-right" />
      {(isAuthLoading || isCategoryLoading) && <LoadingBar color="black" progress={showLoader} onLoaderFinished={() => setshowLoader(0)} />}
    </>
  )
}

export default App
