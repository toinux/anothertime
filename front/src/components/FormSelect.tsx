import { useId } from 'react';
import { Label } from '@/components/ui/label.tsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.tsx';
import type { ConfigPathValue, SelectPath } from '@/types/config.ts';
import { useConfigValue } from '@/hooks/useConfigValue.ts';
import { useConfigMutation } from '@/mutations/config.ts';
import { buildConfigPatch } from '@/lib/config-utils.ts';

type FormSelectProps<P extends SelectPath> = {
    label: string;
    values: ConfigPathValue<P>[];
    path: P;
};
export function FormSelect<P extends SelectPath>({ label, values, path }: FormSelectProps<P>) {
    const configMutation = useConfigMutation();

    const value = useConfigValue(path);

    const handleValueChange = (newValue: ConfigPathValue<P> | ConfigPathValue<P>[] | null) => {
        if (newValue === null || Array.isArray(newValue)) {
            return;
        }
        configMutation.mutate(buildConfigPatch(path, newValue));
    };

    const id = useId();

    return (
        <div className={'mb-4 flex'}>
            <Label
                className={'bg-accent w-48 rounded-tl-md rounded-bl-md border border-r-0 pl-2 text-base'}
                htmlFor={id}
            >
                {label}
            </Label>
            <Select value={value} onValueChange={handleValueChange}>
                <SelectTrigger className={'grow rounded-tl-none rounded-bl-none'} id={id}>
                    <SelectValue placeholder={label} />
                </SelectTrigger>
                <SelectContent>
                    {values.map((o) => {
                        return (
                            <SelectItem key={o} value={o}>
                                {o}
                            </SelectItem>
                        );
                    })}
                </SelectContent>
            </Select>
        </div>
    );
}