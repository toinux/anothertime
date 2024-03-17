import {useId} from "react";
import {updateAnothertime} from "@/lib/updateAnothertime.js";
import {Label} from "@/components/ui/label.jsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";

export function FormSelect({label, defaultValue, values, propertyName, handleChange}) {
    const handleValueChange = (value) => {
        if (handleChange !== undefined) {
            handleChange(value);
        }
        updateAnothertime(propertyName, value);
    }

    const id = useId();

    return <div className={"flex mb-4"}>
        <div className={"p-1.5 w-48 bg-accent rounded-tl-md rounded-bl-md border border-r-0"}>
            <Label className={"text-base"} htmlFor={id}>{label}</Label>
        </div>
        <div className={"grow"}>
            <Select defaultValue={defaultValue} onValueChange={handleValueChange}>
                <SelectTrigger className={"rounded-tl-none rounded-bl-none"} id={id}>
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
        </div>
    </div>;

}