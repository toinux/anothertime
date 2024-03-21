import {useId} from "react";
import {Switch} from "@/components/ui/switch.jsx";
import {Label} from "@/components/ui/label.jsx";
import {useConfigMutation} from "@/hooks/useConfig.js";
import {useConfigValue} from "@/hooks/useConfigStore.js";

export function FormBoolean({label, propertyName}) {
    const id = useId();
    const value = useConfigValue(propertyName);

    const {postConfig} = useConfigMutation();

    const handleCheck = (checked) => {
        postConfig(propertyName, checked);
    }

    return <div className="flex items-center space-x-2 mb-4">
        <Switch id={id} checked={value} onCheckedChange={handleCheck}/>
        <Label className={"text-base"} htmlFor={id}>{label}</Label>
    </div>

}