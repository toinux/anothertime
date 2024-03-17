import {useId, useMemo, useState} from "react";
import {HexColorInput, HexColorPicker} from "react-colorful";
import debounce from "debounce";
import {updateAnothertime} from "@/lib/updateAnothertime.js";
import {Button} from "@/components/ui/button.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Popover, PopoverClose, PopoverContent, PopoverTrigger} from "@/components/ui/popover.jsx";
import {Switch} from "@/components/ui/switch.jsx";

export function FormColor({label, defaultValue, propertyName}) {
    const id = useId();
    const idHexColorInput = useId();

    const [checked, setChecked] = useState(defaultValue !== null);
    const [color, setColor] = useState(defaultValue == null ? "#ffffff" : defaultValue);
    const [previousColor, setPreviousColor] = useState(defaultValue == null ? "#ffffff" : defaultValue);

    const handleCheck = (checked) => {
        updateAnothertime(propertyName, checked ? color : "default");
        setChecked(checked);
    }

    const handleChange = debounce((color) => {
        setColor(color);
        updateAnothertime(propertyName, color);
    }, 100);

    const handleClick = () => {
        //e.preventDefault();
        console.log("setPreviousColor");
        setPreviousColor(color);
    }

    const handleSave = () => {
        console.log("save");
        if (color !== previousColor) {
            setPreviousColor(color);
            updateAnothertime(propertyName, color);
        }
    }
    const handleCancel = () => {
        console.log("cancel");
        if (color !== previousColor) {
            setColor(previousColor);
            updateAnothertime(propertyName, previousColor);
        }
    }

    const colorList = useMemo(() => {

        const presetColors = [
            '#000000', '#333333', '#4D4D4D', '#666666', '#808080', '#999999', '#B3B3B3', '#cccccc', '#FFFFFF', '#9F0500', '#D33115', '#F44E3B',
            '#C45100', '#E27300', '#FE9200', '#FB9E00', '#FCC400', '#FCDC00', '#808900', '#B0BC00', '#DBDF00', '#194D33', '#68BC00', '#A4DD00',
            '#0C797D', '#16A5A5', '#68CCCA', '#0062B1', '#009CE0', '#73D8FF', '#653294', '#7B64FF', '#AEA1FF', '#AB149E', '#FA28FF', '#FDA1FF'];

        return presetColors.map((presetColor) => (

            <div key={presetColor}
                 style={{background: presetColor}}
                 className={"rounded-md border size-6 cursor-pointer active:scale-105"}
                 onClick={() => handleChange(presetColor)}
            />
        ))
    }, [handleChange]);

    return <div className={"flex gap-1 sm:gap-2 mb-2"}>
        <div className={"w-48 py-2"}>
            <Switch id={id} checked={checked} onCheckedChange={handleCheck}/>
            <Label htmlFor={id} className={"ml-2 align-top text-base"}>{label}</Label>
        </div>
        {checked &&
            <Popover>
                <PopoverTrigger asChild={true}>
                    <Button
                        className={"group p-2 sm:p-4"}
                        variant={"outline"}
                        onClick={handleClick}
                        title="Choose your color"
                    >
                        <div style={{
                            background: color
                        }}
                             className={"rounded-md size-6 border mr-4 group-hover:scale-105"}
                             title="Choose your color"
                        />
                        <span className={"font-mono uppercase"}>{color}</span>
                    </Button>
                </PopoverTrigger>
                <PopoverContent onPointerDownOutside={handleCancel} onEscapeKeyDown={handleCancel} asChild={true}>
                    <div className={"w-80 mr-4 sm:mr-0"}>
                        <div>
                            <HexColorPicker className={"min-w-full mb-2"} color={color} onChange={handleChange}/>
                            <div className={"w-72 grid grid-cols-9 gap-2"}>
                                {colorList}
                            </div>
                            <div className={"flex py-2 mb-4"}>
                                <div className={"py-2"}>
                                    <Label htmlFor={idHexColorInput}
                                           className={"mr-2 text-base align-bottom"}>Hexadecimal color :</Label>
                                </div>
                                <div>
                                    <HexColorInput
                                        id={idHexColorInput}
                                        className={"flex uppercase font-mono h-10 w-24 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"}
                                        color={color} onChange={handleChange} prefixed={true}/>
                                </div>
                            </div>
                        </div>
                        <div>
                            <PopoverClose asChild={true}>
                                <div className={"flex justify-end"}>
                                    <Button  className={"mr-4"} variant="outline" onClick={handleCancel}>
                                        Cancel
                                    </Button>
                                    <Button onClick={handleSave}>
                                        Apply
                                    </Button>
                                </div>
                            </PopoverClose>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>

        }

    </div>
}