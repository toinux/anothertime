import {useId} from "react";
import {updateAnothertime} from "@/lib/updateAnothertime.js";
import {Label} from "@/components/ui/label.jsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";

export function FormSelect({label, defaultValue, values, propertyName}) {
    const handleChange = (value) => {
        updateAnothertime(propertyName, value);
    }

    const id = useId();

    return <>
        <Label htmlFor={id}>{label}</Label>
        <Select defaultValue={defaultValue} onValueChange={handleChange}>
            <SelectTrigger id={id}>
                <SelectValue placeholder={label}/>
            </SelectTrigger>
            <SelectContent>
                {
                    values.map(o => {
                        return (<SelectItem key={o} value={o}>{o}</SelectItem>)
                    })
                }
            </SelectContent>
        </Select>
    </>;

}