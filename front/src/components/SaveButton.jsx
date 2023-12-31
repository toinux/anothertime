import {Button} from "react-bootstrap";
import {FaSave} from "react-icons/fa";
import {trackPromise} from "react-promise-tracker";
import {toast} from "react-toastify";

export function SaveButton() {

    const handleClick = (e) => {

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

    return <Button variant="primary" onClick={handleClick}><FaSave/> Save</Button>

}