import { FormColor } from '@/components/FormColor';
import { SettingsContainer } from '@/components/SettingsContainer';
import { FormBoolean } from '@/components/FormBoolean';
import { FormIcon } from '@/components/FormIcon';

export function HumidityWidget() {
    return (
        <SettingsContainer title="Humidity widget">
            <FormBoolean label="Enabled" path="widgets.humidity.enabled" />
            <FormIcon label={'Icon'} path="widgets.humidity.icon" />
            <FormColor label={'Color'} path="widgets.humidity.color" />
        </SettingsContainer>
    );
}
