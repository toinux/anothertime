import {useId, useMemo, useState} from "react";
import {HexColorInput, HexColorPicker} from "react-colorful";
import debounce from "debounce";
import {updateAnothertime} from "@/lib/updateAnothertime.js";
import {Button} from "@/components/ui/button.jsx";
import {Checkbox} from "@/components/ui/checkbox.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Popover, PopoverClose, PopoverContent, PopoverTrigger} from "@/components/ui/popover.jsx";

export function FormColor({label, defaultValue, propertyName}) {
    const id = useId();

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
                    style={{ background: presetColor }}
                    className={"rounded-md size-6 cursor-pointer active:scale-105"}
                    onClick={() => handleChange(presetColor)}
            />
        ))
    }, [handleChange]);

    return <>
                <Checkbox id={id} label={label} checked={checked} onCheckedChange={handleCheck}/>
                <Label htmlFor={id}>{label}</Label>
                {checked &&
                    <Popover>
                        <PopoverTrigger asChild={true}>
                            <div style={{
                                background: color
                            }}
                                    className={"rounded-md size-6 cursor-pointer active:scale-105 border"}
                                    onClick={handleClick}
                                    title="Choose your color"
                            />
                        </PopoverTrigger>
                        <PopoverContent onPointerDownOutside={handleCancel} onEscapeKeyDown={handleCancel} className={"w-96"}>
                            <div>
                                <HexColorPicker className={"min-w-full"} color={color} onChange={handleChange}/>
                                <div className={"w-96 flex flex-wrap gap-1 mt-0"}>
                                    {colorList}
                                </div>
                                <HexColorInput color={color} onChange={handleChange} prefixed={true}/>
                            </div>
                            <div>
                                <PopoverClose asChild={true}>
                                    <div>
                                        <Button variant="secondary" onClick={handleCancel}>
                                            Cancel
                                        </Button>
                                        <Button onClick={handleSave}>
                                            Apply
                                        </Button>
                                    </div>
                                </PopoverClose>

                            </div>
                        </PopoverContent>
                    </Popover>

                }

    </>
}