import { toast } from "react-toastify"
// import { MessageType } from "../types"

export function showMessage<MessageType>(type: MessageType, status: string): void {
    switch (type) {
        case "success":
            toast.success(status)
            break;
        case "warning":
            toast.warning(status)
            break;
        case "error":
            toast.error(status)
            break;
        default:
            toast(status)
    }
}
