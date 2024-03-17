import {FaSave} from "react-icons/fa";
import {trackPromise} from "react-promise-tracker";
import {toast} from "react-toastify";
import {Button} from "@/components/ui/button.jsx";

export function SaveButton() {

    const handleClick = () => {

        async function promise() {
            const response = await fetch("/save", {
                method: "POST"
            });
            return response.ok ? Promise.resolve(response) : Promise.reject(response);
        }

        trackPromise(
            toast.promise(promise, {
                pending: "Saving settings...",
                error: {
                    render({data}) {
                        return `Impossible to save settings : ${data.statusText}`
                    }
                },
                success: "Settings saved !"
            })
        );

    }

    return <Button onClick={handleClick}><FaSave className={"mr-2 size-4"}/><span className={"text-lg"}>Save</span></Button>

}