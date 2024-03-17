import {useId, useState} from "react";
import {updateAnothertime} from "@/lib/updateAnothertime.js";
import {Switch} from "@/components/ui/switch.jsx";
import {Label} from "@/components/ui/label.jsx";

export function FormBoolean({label, defaultValue, propertyName}) {
    const id = useId();

    const [checked, setChecked] = useState(defaultValue);

    const handleCheck = (checked) => {
        updateAnothertime(propertyName, checked);
        setChecked(checked);
    }

    return <div className="flex items-center space-x-2 mb-4">
        <Switch id={id} checked={checked} onCheckedChange={handleCheck}/>
        <Label htmlFor={id}>{label}</Label>
    </div>

}