// import { useEffect, useState } from "react"
// import LoadingBar from "react-top-loading-bar"
// import { toast, ToastContainer } from "react-toastify"
// import { useAppDispatch, useAppSelector } from "./hooks/redux"
// import { Header } from "./components/layout/Header"
// import { Main } from "./components/layout/Main"
// import { Footer } from "./components/layout/Footer"
// import "react-toastify/dist/ReactToastify.css"
// import { getCategories } from "./store/actions/categoryAction"
// import { categorySlice } from "./store/slices/categorySlice"
// import { authSlice } from "./store/slices/authSlice"
// import { useMessage } from "./hooks/useMessage"

// const App = () => {
//   const [showLoader, setshowLoader] = useState(100)

//   const { isAuth } = useAppSelector(state => state.auth)

//   const { error } = useAppSelector(state => state.auth)

//   // const authStatus = 
//   // const categoryStatus = useAppSelector(state => state.category.status)

//   const authLoading = useAppSelector(state => state.auth.isLoading)
//   const categoryLoading = useAppSelector(state => state.category.isLoading)

//   const dispatch = useAppDispatch()

//   const authStatus = useAppSelector(state => state.auth.status)
//   const authWarning = useAppSelector(state => state.auth.warning)
//   const authError = useAppSelector(state => state.auth.error)

//   const categoryStatus = useAppSelector(state => state.category.status)
//   const categoryWarning = useAppSelector(state => state.category.warning)
//   const categoryError = useAppSelector(state => state.category.error)

//   useEffect(() => {
//     if (isAuth) {
//       dispatch(getCategories())
//     }
//   }, [isAuth, dispatch])

//   // useEffect(() => {
//   //   if (authStatus !== "") {
//   //     toast(authStatus)
//   //     dispatch(authSlice.actions.clearStatus())
//   //   }
//   // }, [authStatus, dispatch])

//   // useEffect(() => {
//   //   if (categoryStatus !== "") {
//   //     toast(categoryStatus)
//   //     dispatch(categorySlice.actions.clearStatus())
//   //   }
//   // }, [categoryStatus, dispatch])

//   // useEffect(() => {
//   //   showStatus(authStatus, categoryStatus)
//   // }, [authStatus, categoryStatus])

//   // useEffect(() => {
//   //   if (error !== "") {
//   //     toast.error(error)
//   //     dispatch(authSlice.actions.clearError())
//   //   }
//   // }, [error, dispatch])

//   // useEffect(() => {
//   //   if ((authStatus !== "") || (categoryStatus !== "")) {
//   //     let actualStatus
//   //     if (authStatus !== "") {
//   //       actualStatus = authStatus
//   //     } else {
//   //       actualStatus = categoryStatus
//   //     }
//   //     switch (actualStatus) {
//   //       case authStatus:
//   //         toast(authStatus)
//   //         dispatch(authSlice.actions.clearStatus())
//   //         break;
//   //       case categoryStatus:
//   //         toast(categoryStatus)
//   //         dispatch(categorySlice.actions.clearStatus())
//   //         break;
//   //     }
//   //   }
//   // }, [authStatus, categoryStatus, dispatch])

//   useMessage({authStatus, authWarning, authError, categoryStatus, categoryWarning, categoryError})

//   return (
//     <>
//       <Header />
//       <Main />
//       <Footer />
//       <ToastContainer position="bottom-right" />
//       {(authLoading || categoryLoading) && <LoadingBar color="black" progress={showLoader} onLoaderFinished={() => setshowLoader(0)} />}
//     </>
//   )
// }

// export default App

// --------------------------------------------------------------------------------------------------------------------------------------------------

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
      {(authLoading || categoryLoading) && <LoadingBar color="black" progress={showLoader} onLoaderFinished={() => setshowLoader(0)} />}
    </>
  )
}

export default App
