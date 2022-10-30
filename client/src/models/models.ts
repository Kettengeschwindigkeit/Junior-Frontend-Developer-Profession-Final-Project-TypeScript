import { Dispatch, SetStateAction } from "react"

export interface IUser {
    _id: string
    email: string
    password: string
    categories: ICategory[]
    createdAt: Date
    updatedAt: Date
    __v: number
}

export interface ICategory {
    _id: string
    title: string
    subCategories: ISubCategory[]
}

export interface ISubCategory {
    _id: string
    title: string
    items: IItem[]
}

export interface IItem {
    title: string
    translate: string
}

export interface IServerResponse<T> {
    result: T
    message: string
}

// export interface IAddModalChildProps {
//     setShowModal: Dispatch<SetStateAction<boolean>>
// }
