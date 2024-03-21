import {useCallback, useEffect, useId, useRef, useState} from "react";
import {Settings2} from "lucide-react";
import debounce from "debounce";
import {Label} from "@/components/ui/label.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible.jsx";
import {Slider} from "@/components/ui/slider.jsx";
import {useImmer} from "use-immer";
import {useConfigMutation} from "@/hooks/useConfig.js";
import {useConfigValue} from "@/hooks/useConfigStore.js";

export function FormIcon({label, propertyName}) {

    /** @type Icon */
    const {name, x, y} = useConfigValue(propertyName);
    const iconRef = useRef();
    const [offset, setOffset] = useImmer({x, y})
    const xId = useId();
    const yId = useId();

    const {postConfig} = useConfigMutation();


    const [inputValue, setInputValue] = useState(name);

    useEffect(() => {
        setInputValue(name);
    }, [name]);

    useEffect(() => {
        setOffset((draft) => {
            draft.x = x;
            draft.y = y;
        });
    }, [x, y]);



    const handleChange = (e) => {
        setInputValue(e.target.value)

    }

    const handleKey = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            postConfig(propertyName + ".name", e.target.value);
        }
    }

    const handleClick = () => {
        postConfig(propertyName + ".name", iconRef.current.value);
    }

    const handleOffsetX = useCallback(debounce((value) =>
        setOffset((draft) => {
            draft.x = value[0];
            postConfig(propertyName+".x", value[0]);
        }), 100), []);
    const handleOffsetY = useCallback(debounce((value) =>
        setOffset((draft) => {
            draft.y = value[0];
            postConfig(propertyName+".y", value[0]);
        }), 100), []);

    const id = useId();
    return <Collapsible className={"mb-4"}>
        <div className={"flex"}>
            <div className={"p-1.5 bg-accent rounded-tl-md rounded-bl-md border border-r-0"}>
                <Label className={"text-base"} htmlFor={id}>{label}</Label>
            </div>
            <Input type="text" ref={iconRef} id={id} placeholder={inputValue}
                   className={"rounded-none shrink"}
                   value={inputValue} onKeyDown={handleKey} onChange={handleChange}/>
            <CollapsibleTrigger asChild={true}>
                <Button className={"h-10 rounded-none"} title={"Change position"}><Settings2 className={"size-4"}/></Button>
            </CollapsibleTrigger>
            <Button className={"h-10 rounded-tl-none rounded-bl-none text-base"} onClick={handleClick}>Ok</Button>
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
