import {useCallback, useEffect, useId, useState} from "react";
import {Settings2} from "lucide-react";
import debounce from "debounce";
import {Label} from "@/components/ui/label.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible.jsx";
import {Slider} from "@/components/ui/slider.jsx";
import {useImmer} from "use-immer";
import {useConfigMutation} from "@/hooks/useConfig.js";
import {useConfigValue} from "@/hooks/useConfigStore.js";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import useIcons from "@/hooks/useIcons.js";

//import NoIconInfo from "@/components/NoIconInfo.jsx";

export function FormIcon({label, propertyName}) {

    /** @type Icon */
    const {name, x, y} = useConfigValue(propertyName);
    const [offset, setOffset] = useImmer({x, y})
    const xId = useId();
    const yId = useId();

    const {postConfig} = useConfigMutation();

    const {data: icons} = useIcons();

    const [selectValue, setSelectValue] = useState(name);

    useEffect(() => {
        setSelectValue(name);
    }, [name]);

    useEffect(() => {
        setOffset((draft) => {
            draft.x = x;
            draft.y = y;
        });
    }, [x, y, setOffset]);

    const handleValueChange = (value) => {
        postConfig(propertyName, {name: value, x, y});
    }

    const postConfigDebounce = useCallback(debounce((propertyName, payload) => postConfig(propertyName, payload)), []);

    const handleOffsetX = (value) =>
        setOffset((draft) => {
            draft.x = value[0];
            postConfigDebounce(propertyName, {name, x: value[0], y: draft.y});
        });
    const handleOffsetY = (value) =>
        setOffset((draft) => {
            draft.y = value[0];
            postConfigDebounce(propertyName, {name, x: draft.x, y: value[0]});
        });



    const id = useId();
    return <Collapsible className={"mb-4"}>
        <div className={"flex"}>
            <div className={"p-1.5 w-48 bg-accent rounded-tl-md rounded-bl-md border border-r-0 flex"}>
                <Label className={"text-base w-full"} htmlFor={id}>{label}</Label>
            </div>
            <Select value={selectValue} onValueChange={handleValueChange}>
                <SelectTrigger className={"rounded-none shrink"} id={id}>
                    <SelectValue placeholder={label}/>
                </SelectTrigger>
                <SelectContent>
                    {
                        icons.map(i => {
                            return (<SelectItem key={i.name} value={i.name}>
                                <div className={"flex space-x-2"}>
                                    <img className={"size-8 [image-rendering:pixelated] rounded-md"} alt={i.name} src={i.url}/>
                                    <span className={"text-base"}>{i.name}</span>
                                </div>
                            </SelectItem>)
                        })
                    }
                </SelectContent>
            </Select>
            <CollapsibleTrigger asChild={true}>
                <Button className={"h-10 rounded-tl-none rounded-bl-none"} title={"Change position"}><Settings2
                    className={"size-4"}/></Button>
            </CollapsibleTrigger>
        </div>
        <CollapsibleContent
            className={'overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up'}>
            <div className={"my-2"}>
                <Label htmlFor={xId}>X offset : {offset.x}</Label>
                <Slider id={xId} value={[offset.x]} min={-32} max={32} step={1}
                        onValueChange={handleOffsetX}/>
                <Label htmlFor={yId}>Y offset : {offset.y}</Label>
                <Slider id={yId} value={[offset.y]} min={-8} max={8} step={1} onValueChange={handleOffsetY}/>
            </div>
        </CollapsibleContent>
    </Collapsible>
}
