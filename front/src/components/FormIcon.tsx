import { useEffect, useId, useMemo, useState } from 'react';
import { Settings2 } from 'lucide-react';
import { Label } from '@/components/ui/label.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible.tsx';
import { Slider } from '@/components/ui/slider.tsx';
import { useImmer } from 'use-immer';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectSeparator,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select.jsx';

import IconInfo from '@/components/IconInfo.tsx';
import { useConfigValue } from '@/hooks/useConfigValue.ts';
import { type Icon, type IconPath } from '@/types/config.ts';
import { useDebouncedCallback } from 'use-debounce';
import { useConfigMutation } from '@/mutations/config.ts';
import { buildConfigPatch } from '@/lib/config-utils.ts';
import { useQuery } from '@tanstack/react-query';
import { iconQueries } from '@/queries/icon.ts';
import { ButtonGroup } from '@/components/ui/button-group.tsx';

type FormIconProps = {
    label: string;
    path: IconPath;
};
export function FormIcon({ label, path }: FormIconProps) {
    const { name, x, y } = useConfigValue(path);
    const [offset, setOffset] = useImmer({ x, y });
    const xId = useId();
    const yId = useId();

    const configMutation = useConfigMutation();

    const { data } = useQuery(iconQueries.get());
    const icons = data || [];

    // Map pemettant de retrouver l'url d'un icon par rapport à son nom
    const iconsMap = useMemo(()=>{
        const map = new Map<string, string>();
        if (!data) return map;
        data.forEach((item) => {
            map.set(item.name, item.url);
        });
        return map;
    }, [data]);

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

    const handleValueChange = (value: string | null) => {
        mutateIcon({ name: value, x, y });
    };

    const mutateIcon = (payload: Icon) => {
        configMutation.mutate(buildConfigPatch(path, payload));
    };

    const postConfigDebounce = useDebouncedCallback((payload: Icon) => {
        mutateIcon(payload);
    }, 100);

    const handleOffsetX = (value: number | readonly number[]) => {
        if (typeof value === 'number') {
            setOffset((draft) => {
                draft.x = value;
                postConfigDebounce({ name, x: value, y: draft.y });
            });
        }
    };

    const handleOffsetY = (value: number | readonly number[]) => {
        if (typeof value === 'number') {
            setOffset((draft) => {
                draft.y = value;
                postConfigDebounce({ name, x: draft.x, y: value });
            });
        }
    };

    const id = useId();

    return (
        <Collapsible className={'mb-4'}>
            <div className={'flex'}>
                <Label
                    className={'bg-accent w-48 rounded-tl-md rounded-bl-md border border-r-0 pl-2 text-base'}
                    htmlFor={id}
                >
                    {label}
                </Label>
                <Select value={selectValue} onValueChange={handleValueChange} disabled={icons.length === 0}>
                    <SelectTrigger className={'grow rounded-none'} id={id}>
                        <SelectValue
                            placeholder={label}
                            render={
                                <div>
                                    {iconsMap.get(selectValue ?? '') && (
                                        <img
                                            className={'size-6 [image-rendering:pixelated] mr-2'}
                                            alt={selectValue??''}
                                            src={iconsMap.get(selectValue ?? '')}
                                        />
                                    )}
                                    <div>{selectValue}</div>
                                </div>
                            }
                        />
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
                                            className={'size-8 [image-rendering:pixelated]'}
                                            alt={i.name}
                                            src={i.url}
                                        />
                                        <span className={'text-base'}>{i.name}</span>
                                    </div>
                                </SelectItem>
                            );
                        })}
                    </SelectContent>
                </Select>
                <ButtonGroup>
                    <CollapsibleTrigger
                        render={
                            <Button
                                variant={'outline'}
                                size="icon"
                                className={'rounded-tl-none rounded-bl-none border-l-0'}
                                title={'Change position'}
                            >
                                <Settings2 className={'size-4'} />
                            </Button>
                        }
                    />
                    <Button variant={'outline'} size={'icon'}>
                        <IconInfo />
                    </Button>
                </ButtonGroup>
            </div>
            {/*TODO: voir plus tard pour les animations, pour l'instant ça marche qu'avec radix*/}
            <CollapsibleContent
                className={
                    'data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down overflow-hidden'
                }
            >
                <div className={'my-4 flex flex-col gap-2'}>
                    <Label htmlFor={xId}>X offset : {offset.x}</Label>
                    <Slider id={xId} value={[offset.x]} min={-32} max={32} step={1} onValueChange={handleOffsetX} />
                    <Label htmlFor={yId}>Y offset : {offset.y}</Label>
                    <Slider id={yId} value={[offset.y]} min={-8} max={8} step={1} onValueChange={handleOffsetY} />
                </div>
            </CollapsibleContent>
        </Collapsible>
    );
}
