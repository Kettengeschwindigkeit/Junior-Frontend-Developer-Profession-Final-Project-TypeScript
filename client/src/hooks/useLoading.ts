import { useAppSelector } from "./redux";

export function useLoading(): boolean {
    const authLoading = useAppSelector(state => state.auth.isLoading)
    const categoryLoading = useAppSelector(state => state.category.isLoading)
    const subLoading = useAppSelector(state => state.subCategory.isLoading)

    const isLoading = authLoading || categoryLoading || subLoading

    return isLoading
}
