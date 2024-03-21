import {Save} from "lucide-react";
import {useSaveMutation} from "@/hooks/useConfig.js";
import {ResponsiveButton} from "@/components/ResponsiveButton.jsx";

export function SaveButton({...props}) {

    const {mutate} = useSaveMutation();

    const handleClick = () => {
        mutate();
    }

    return <ResponsiveButton onClick={handleClick} tooltip={"Save"} {...props}>
        <Save/>
    </ResponsiveButton>;

}