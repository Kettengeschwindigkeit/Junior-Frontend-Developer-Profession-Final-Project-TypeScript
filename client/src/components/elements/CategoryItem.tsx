import { useState } from "react"
import { Link } from "react-router-dom"
import { ICategory } from "../../models/models"
import { SubCategoryItem } from "./SubCategoryItem"

export const CategoryItem: React.FunctionComponent<{ category: ICategory }> = ({ category }) => {
    const [showDropdown, setShowDropdown] = useState(false)
    const sortedSubCategories = [...category.subCategories].sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1)

    return (
        <li>
            <Link to={category._id}>
                <button
                    className="w-[190px] px-1 py-1 border bg-gray-300 text-gray-600 font-bold hover:bg-gray-200 hover:text-black duration-100"
                    onClick={() => setShowDropdown(prev => !prev)}
                >
                    {category.title}
                </button>
            </Link>
            <div>
                {showDropdown && sortedSubCategories.map(sub => <SubCategoryItem key={sub._id} subCategory={sub} />)}
            </div>
        </li>
    )
}
