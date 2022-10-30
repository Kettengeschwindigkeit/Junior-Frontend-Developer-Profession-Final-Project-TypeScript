import React from "react"
import { Route, Routes } from "react-router-dom"
import { CategoryPage } from "../../pages/CategoryPage"
import { LoginPage } from "../../pages/LoginPage"
import { MainPage } from "../../pages/MainPage"
import { RegisterPage } from "../../pages/RegisterPage"
import { SubCategoryPage } from "../../pages/SubCategoryPage"

export function Content() {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path=':id' element={<CategoryPage />} />
            <Route path=':id/:id' element={<SubCategoryPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="login" element={<LoginPage />} />
        </Routes>
    )
}
