import {FaSave} from "react-icons/fa";
import {Button} from "@/components/ui/button.jsx";
import {useSaveMutation} from "@/hooks/useConfig.js";

export function SaveButton() {

    const {mutate} = useSaveMutation();

    const handleClick = () => {
        mutate();
    }

    return <Button onClick={handleClick}><FaSave className={"mr-2 size-4"}/><span
        className={"text-lg"}>Save</span></Button>

}