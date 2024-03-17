import {useId, useRef} from "react";
import {FaGear} from "react-icons/fa6";
import debounce from "debounce";
import {Label} from "@/components/ui/label.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible.jsx";
import {Slider} from "@/components/ui/slider.jsx";
import {useImmer} from "use-immer";
import {useConfigMutation} from "@/hooks/useConfig.js";

export function FormIcon({label, defaultValue, propertyName}) {

    const iconRef = useRef();
    const [offset, setOffset] = useImmer({x: defaultValue.x, y: defaultValue.y})
    const xId = useId();
    const yId = useId();

    const {postConfig} = useConfigMutation();

    const handleKey = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            postConfig(propertyName + ".name", e.target.value);
        }
    }

    const handleClick = () => {
        postConfig(propertyName + ".name", iconRef.current.value);
    }

    const handleOffsetX = debounce((value) =>
        setOffset((draft) => {
            draft.x = value[0];
            postConfig(propertyName, draft);
        }), 100);
    const handleOffsetY = debounce((value) =>
        setOffset((draft) => {
            draft.y = value[0];
            postConfig(propertyName, draft);
        }), 100);

    const id = useId();
    return <Collapsible className={"mb-4"}>
        <div className={"flex"}>
            <div className={"p-1.5 bg-accent rounded-tl-md rounded-bl-md border border-r-0"}>
                <Label className={"text-base"} htmlFor={id}>{label}</Label>
            </div>
            <Input type="text" ref={iconRef} id={id} placeholder={defaultValue.name}
                   className={"rounded-none shrink"}
                   defaultValue={defaultValue.name} onKeyDown={handleKey}/>
            <CollapsibleTrigger asChild={true}>
                <Button className={"h-10 rounded-none"} title={"Change position"}><FaGear/></Button>
            </CollapsibleTrigger>
            <Button className={"h-10 rounded-tl-none rounded-bl-none"} onClick={handleClick}>Ok</Button>
        </div>
        <CollapsibleContent
            className={'overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up'}>
            <div className={"my-2"}>
                <Label htmlFor={xId}>X offset : {offset.x}</Label>
                <Slider id={xId} defaultValue={[offset.x]} min={-32} max={32} step={1}
                        onValueChange={handleOffsetX}/>
                <Label htmlFor={yId}>Y offset : {offset.y}</Label>
                <Slider id={yId} defaultValue={[offset.y]} min={-8} max={8} step={1} onValueChange={handleOffsetY}/>
            </div>
        </CollapsibleContent>
    </Collapsible>
}
