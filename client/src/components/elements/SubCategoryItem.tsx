import React from "react"
import { Link } from "react-router-dom"
import { ISubCategory } from "../../models/models"

export const SubCategoryItem: React.FunctionComponent<{ subCategory: ISubCategory }> = ({ subCategory }) => {
    return (
        <Link to={`sub/${subCategory._id}`}>
            <button className="w-[190px] border border-gray-300 bg-gray-200 text-center font-bold text-gray-600 hover:bg-gray-300 hover:text-white duration-100">
                {subCategory.title}
            </button>
        </Link>
    )
}
