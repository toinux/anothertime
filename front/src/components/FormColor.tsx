import { useId, useMemo, useState } from 'react';
import { HexColorInput, HexColorPicker } from 'react-colorful';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useConfigValue } from '@/hooks/useConfigValue.ts';
import { type ColorPath, isColor } from '@/types/config.ts';
import { buildConfigPatch } from '@/lib/config-utils.ts';
import { useConfigMutation } from '@/mutations/config.ts';
import { useDebouncedCallback } from 'use-debounce';

type FormColorProps = {
    label: string;
    path: ColorPath;
};
export function FormColor({ label, path }: FormColorProps) {
    const id = useId();
    const idHexColorInput = useId();

    const value = useConfigValue(path);

    const checked = useMemo(() => value !== null && value !== 'default', [value]);
    // TODO : mettre le previousColor dans le localstorage ? ou le gérer en backend ?
    const [previousColor, setPreviousColor] = useState(value === null || value === 'default' ? '#ffffff' : value);
    const color = useMemo(
        () => (value === null || value === 'default' ? previousColor : value),
        [value, previousColor]
    );

    const configMutation = useConfigMutation();

    const mutateColor = (color: string) => {
        if (isColor(color)) {
            configMutation.mutate(buildConfigPatch(path, color));
        }
    };

    const handleCheck = (checked: boolean) => {
        mutateColor(checked ? color : 'default');
    };

    const handleChange = useDebouncedCallback((color: string) => {
        mutateColor(color);
    }, 100);

    const handleClick = () => {
        setPreviousColor(color);
    };

    const handleSave = () => {
        if (color !== previousColor) {
            setPreviousColor(color);
            mutateColor(color);
        }
    };
    const handleCancel = () => {
        console.log(color, previousColor);
        if (color !== previousColor) {
            mutateColor(previousColor);
        }
    };

    const colorList = useMemo(() => {
        const presetColors = [
            '#000000',
            '#333333',
            '#4D4D4D',
            '#666666',
            '#808080',
            '#999999',
            '#B3B3B3',
            '#cccccc',
            '#FFFFFF',
            '#9F0500',
            '#D33115',
            '#F44E3B',
            '#C45100',
            '#E27300',
            '#FE9200',
            '#FB9E00',
            '#FCC400',
            '#FCDC00',
            '#808900',
            '#B0BC00',
            '#DBDF00',
            '#194D33',
            '#68BC00',
            '#A4DD00',
            '#0C797D',
            '#16A5A5',
            '#68CCCA',
            '#0062B1',
            '#009CE0',
            '#73D8FF',
            '#653294',
            '#7B64FF',
            '#AEA1FF',
            '#AB149E',
            '#FA28FF',
            '#FDA1FF'
        ];

        return presetColors.map((presetColor) => (
            <div
                key={presetColor}
                style={{ background: presetColor }}
                className={'size-6 cursor-pointer rounded-md border active:scale-105'}
                onClick={() => handleChange(presetColor)}
            />
        ));
    }, [handleChange]);

    return (
        <div className={'mb-2 flex gap-1 sm:gap-2'}>
            <div className={'flex w-48 items-center gap-2 py-2'}>
                <Switch id={id} checked={checked} onCheckedChange={handleCheck} />
                <Label htmlFor={id} className={'text-base'}>
                    {label}
                </Label>
            </div>
            {checked && (
                <Dialog
                    onOpenChange={(_open, eventDetails) => {
                        if (eventDetails.reason == 'escape-key' || eventDetails.reason == 'outside-press') {
                            handleCancel();
                        }
                    }}
                >
                    <DialogTrigger
                        render={
                            <Button
                                className={'group p-2 sm:p-4'}
                                variant={'outline'}
                                onClick={handleClick}
                                title="Choose your color"
                            >
                                <div
                                    style={{
                                        background: color
                                    }}
                                    className={'mr-4 size-6 rounded-md border group-hover:scale-105'}
                                    title="Choose your color"
                                />
                                <span className={'font-mono uppercase'}>{color}</span>
                            </Button>
                        }
                    />
                    <DialogContent className={'w-80 rounded-lg p-4'} showCloseButton={false}>
                        <DialogTitle>{label}</DialogTitle>
                        <HexColorPicker className={'mb-2 min-w-full'} color={color} onChange={handleChange} />
                        <div className={'grid w-72 grid-cols-9 gap-2'}>{colorList}</div>
                        <div className={'mb-4 flex py-2'}>
                            <div className={'py-2'}>
                                <Label htmlFor={idHexColorInput} className={'mr-2 align-bottom text-base'}>
                                    Hexadecimal color :
                                </Label>
                            </div>
                            <div>
                                <HexColorInput
                                    id={idHexColorInput}
                                    className={
                                        'border-input bg-background ring-offset-background focus-visible:ring-ring flex h-10 w-24 rounded-md border px-3 py-2 font-mono text-sm uppercase focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none'
                                    }
                                    color={color}
                                    onChange={handleChange}
                                    prefixed={true}
                                />
                            </div>
                        </div>
                        <div className={'flex justify-end'}>
                            <DialogClose
                                render={
                                    <Button className={'mr-4'} variant="outline" onClick={handleCancel}>
                                        Cancel
                                    </Button>
                                }
                            />
                            <DialogClose render={<Button onClick={handleSave}>Apply</Button>} />
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
}