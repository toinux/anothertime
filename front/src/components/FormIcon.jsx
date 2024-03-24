import { useCallback, useEffect, useId, useState } from 'react';
import { Settings2 } from 'lucide-react';
import debounce from 'debounce';
import { Label } from '@/components/ui/label.jsx';
import { Button } from '@/components/ui/button.jsx';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger
} from '@/components/ui/collapsible.jsx';
import { Slider } from '@/components/ui/slider.jsx';
import { useImmer } from 'use-immer';
import { useConfigMutation } from '@/hooks/useConfig.js';
import { useConfigValue } from '@/hooks/useConfigStore.js';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectSeparator,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select.jsx';
import useIcons from '@/hooks/useIcons.js';

import IconInfo from '@/components/IconInfo.jsx';

export function FormIcon({ label, propertyName }) {
    /** @type Icon */
    const { name, x, y } = useConfigValue(propertyName);
    const [offset, setOffset] = useImmer({ x, y });
    const xId = useId();
    const yId = useId();

    const { postConfig } = useConfigMutation();

    const { data: icons } = useIcons();

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
        postConfig(propertyName, { name: value, x, y });
    };

    const postConfigDebounce = useCallback(
        debounce((propertyName, payload) => postConfig(propertyName, payload)),
        []
    );

    const handleOffsetX = (value) =>
        setOffset((draft) => {
            draft.x = value[0];
            postConfigDebounce(propertyName, { name, x: value[0], y: draft.y });
        });
    const handleOffsetY = (value) =>
        setOffset((draft) => {
            draft.y = value[0];
            postConfigDebounce(propertyName, { name, x: draft.x, y: value[0] });
        });

    const id = useId();

    return (
        <Collapsible className={'mb-4'}>
            <div className={'flex'}>
                <div
                    className={
                        'left flex w-48 rounded-bl-md rounded-tl-md border border-r-0 bg-accent p-1.5'
                    }
                >
                    <Label className={'w-full text-base'} htmlFor={id}>
                        {label}
                    </Label>
                </div>
                <Select
                    value={selectValue}
                    onValueChange={handleValueChange}
                    disabled={icons.length === 0}
                >
                    <SelectTrigger className={'shrink rounded-none'} id={id}>
                        <SelectValue placeholder={label} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem key={'defaultIcon'} value={'default'}>
                            <span className={'text-base'}>Default</span>
                        </SelectItem>
                        <SelectSeparator />
                        {icons.map((i) => {
                            return (
                                <SelectItem key={i.name} value={i.name}>
                                    <div className={'flex space-x-2'}>
                                        <img
                                            className={
                                                'size-8 rounded-md [image-rendering:pixelated]'
                                            }
                                            alt={i.name}
                                            src={i.url}
                                        />
                                        <span className={'text-base'}>
                                            {i.name}
                                        </span>
                                    </div>
                                </SelectItem>
                            );
                        })}
                    </SelectContent>
                </Select>
                <CollapsibleTrigger asChild={true}>
                    <Button
                        className={'h-10 rounded-bl-none rounded-tl-none'}
                        title={'Change position'}
                    >
                        <Settings2 className={'size-4'} />
                    </Button>
                </CollapsibleTrigger>
                <IconInfo className={'ml-2 size-8 hover:fill-accent'} />
            </div>
            <CollapsibleContent
                className={
                    'overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down'
                }
            >
                <div className={'my-2'}>
                    <Label htmlFor={xId}>X offset : {offset.x}</Label>
                    <Slider
                        id={xId}
                        value={[offset.x]}
                        min={-32}
                        max={32}
                        step={1}
                        onValueChange={handleOffsetX}
                    />
                    <Label htmlFor={yId}>Y offset : {offset.y}</Label>
                    <Slider
                        id={yId}
                        value={[offset.y]}
                        min={-8}
                        max={8}
                        step={1}
                        onValueChange={handleOffsetY}
                    />
                </div>
            </CollapsibleContent>
        </Collapsible>
    );
}
