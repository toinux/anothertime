import {RotateCcw} from "lucide-react";
import {useReloadMutation} from "@/hooks/useConfig.js";
import {ResponsiveButton} from "@/components/ResponsiveButton.jsx";

export function ReloadButton({...props}) {

    // const {refetch} = useConfig();
    const reloadMutation = useReloadMutation();

    const handleClick = () => {
        reloadMutation.mutate();
    }

    return <ResponsiveButton variant={"outline"} tooltip={"Reload"} onClick={handleClick} {...props}>
        <RotateCcw/>
    </ResponsiveButton>;

}