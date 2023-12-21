import {toast} from "react-toastify";

export function handleException(title, message) {
    toast.error(`${title} : ${message}`)
}