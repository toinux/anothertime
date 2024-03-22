import {useId} from "react";
import {Label} from "@/components/ui/label.jsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import {useConfigMutation} from "@/hooks/useConfig.js";
import {useConfigValue} from "@/hooks/useConfigStore.js";

export function FormSelect({label, values, propertyName, handleChange}) {

    const {postConfig} = useConfigMutation();

    const value = useConfigValue(propertyName);


    const handleValueChange = (value) => {
        if (handleChange !== undefined) {
            handleChange(value);
        }
        postConfig(propertyName, value);
    }

    const id = useId();

    return <div className={"flex mb-4"}>
        <div className={"p-1.5 w-48 bg-accent rounded-tl-md rounded-bl-md border border-r-0 flex"}>
            <Label className={"text-base w-full"} htmlFor={id}>{label}</Label>
        </div>
        <div className={"grow"}>
            <Select value={value} onValueChange={handleValueChange}>
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