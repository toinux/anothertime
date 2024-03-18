import {useId, useState} from "react";
import {Switch} from "@/components/ui/switch.jsx";
import {Label} from "@/components/ui/label.jsx";
import {useConfigMutation} from "@/hooks/useConfig.js";

export function FormBoolean({label, defaultValue, propertyName}) {
    const id = useId();

    const [checked, setChecked] = useState(defaultValue);

    const {postConfig} = useConfigMutation();

    const handleCheck = (checked) => {
        postConfig(propertyName, checked);
        setChecked(checked);
    }

    return <div className="flex items-center space-x-2 mb-4">
        <Switch id={id} checked={checked} onCheckedChange={handleCheck}/>
        <Label className={"text-base"} htmlFor={id}>{label}</Label>
    </div>

}