
export interface IUser {
    readonly _id: string
    email: string
    password: string
    categories: ICategory[]
    createdAt: Date
    updatedAt: Date
    __v: number
}

export interface ICategory {
    readonly _id: string
    readonly userId: string
    title: string
    subCategories: ISubCategory[]
    createdAt: Date
    updatedAt: Date
    __v: number
}

export interface ISubCategory {
    readonly _id: string
    readonly parentCategoryId: string
    title: string
    items: IItem[]
    createdAt: Date
    updatedAt: Date
    __v: number
}

export interface IItem {
    title: string
    translate: string
}

export interface ServerResponse<T> {
    result: T
    message: string
    errorMessage: string
}
