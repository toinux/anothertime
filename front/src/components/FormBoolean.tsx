import { useId } from 'react';
import { Switch } from '@/components/ui/switch.jsx';
import { Label } from '@/components/ui/label.jsx';
import type { BooleanPath } from '@/types/config.ts';
import { useConfigValue } from '@/hooks/useConfigValue.ts';
import { buildConfigPatch } from '@/lib/config-utils.ts';
import { useConfigMutation } from '@/mutations/config.ts';

type FormBooleanProps = {
    label: string;
    path: BooleanPath;
};
export function FormBoolean({ label, path }: FormBooleanProps) {
    const id = useId();
    const value = useConfigValue(path);

    const configMutation = useConfigMutation();

    const handleCheck = (checked: boolean) => {
        configMutation.mutate(buildConfigPatch(path, checked));
    };

    return (
        <div className="mb-4 flex items-center space-x-2">
            <Switch id={id} checked={value} onCheckedChange={handleCheck} />
            <Label className={'text-base'} htmlFor={id}>
                {label}
            </Label>
        </div>
    );
}