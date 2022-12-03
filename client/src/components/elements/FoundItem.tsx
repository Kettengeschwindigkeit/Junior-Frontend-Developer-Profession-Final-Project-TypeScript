
interface FoundItemProps {
    title: string
    startsWith: string
}
export const FoundItem = ({ title, startsWith }: FoundItemProps) => {
    const startsWithCap = startsWith.charAt(0).toUpperCase() + startsWith.slice(1)
    const rest = title.replace(startsWithCap, "")

    return (
        <>
            <strong>{startsWithCap}</strong>{rest}
        </>
    )
}
