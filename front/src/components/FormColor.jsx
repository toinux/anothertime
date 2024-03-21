import {useCallback, useId, useMemo, useState} from "react";
import {HexColorInput, HexColorPicker} from "react-colorful";
import debounce from "debounce";
import {Button} from "@/components/ui/button.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Switch} from "@/components/ui/switch.jsx";
import {Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger} from "@/components/ui/dialog.jsx";
import {useConfigMutation} from "@/hooks/useConfig.js";
import {useConfigValue} from "@/hooks/useConfigStore.js";

export function FormColor({label, propertyName}) {

    const id = useId();
    const idHexColorInput = useId();

    const value = useConfigValue(propertyName);

    const checked = useMemo(() => value !== null && value !== "default", [value]);
    // TODO : mettre le previousColor dans le localstorage ? ou le gérer en backend ?
    const [previousColor, setPreviousColor] = useState((value === null || value === "default") ? "#ffffff" : value);
    const color = useMemo(() => (value === null || value === "default") ? previousColor : value, [value]);



    const {postConfig} = useConfigMutation();

    const handleCheck = (checked) => {
        postConfig(propertyName, checked ? color : "default");
    }

    const handleChange = useCallback(debounce((color) => {
        postConfig(propertyName, color);
    }, 100), []);


    const handleClick = () => {
        setPreviousColor(color);
    }

    const handleSave = () => {
        if (color !== previousColor) {
            setPreviousColor(color);
            postConfig(propertyName, color);
        }
    }
    const handleCancel = () => {
        if (color !== previousColor) {
            // setColor(previousColor);
            postConfig(propertyName, previousColor);
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
            <Dialog>
                <DialogTrigger asChild={true}>
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
                </DialogTrigger>
                <DialogContent className={"w-80 p-4 rounded-lg"} onPointerDownOutside={handleCancel} onEscapeKeyDown={handleCancel}
                               addCloseButton={false}>
                    <DialogTitle>{label}</DialogTitle>
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
                    <div className={"flex justify-end"}>
                        <DialogClose asChild={true}>
                            <Button  className={"mr-4"} variant="outline" onClick={handleCancel}>
                                Cancel
                            </Button>
                        </DialogClose>
                        <DialogClose asChild={true}>
                            <Button onClick={handleSave}>
                                Apply
                            </Button>
                        </DialogClose>
                    </div>
                </DialogContent>
            </Dialog>

        }

    </div>
}