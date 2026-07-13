import { SettingsContainer } from '@/components/SettingsContainer.tsx';
import { FormColor } from '@/components/FormColor.tsx';

export function Seconds() {
    return (
        <SettingsContainer title="Seconds">
            <FormColor label={'Seconds color'} path="seconds.color" />
            <FormColor label={'Background color'} path="seconds.backgroundColor" />
        </SettingsContainer>
    );
}
