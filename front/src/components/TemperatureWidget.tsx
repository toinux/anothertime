import { FormColor } from '@/components/FormColor';
import { SettingsContainer } from '@/components/SettingsContainer';
import { FormBoolean } from '@/components/FormBoolean';
import { FormIcon } from '@/components/FormIcon';

export function TemperatureWidget() {
    return (
        <SettingsContainer title="Temperature widget">
            <FormBoolean label="Enabled" path="widgets.temperature.enabled" />
            <FormBoolean label="Fahrenheit" path="widgets.temperature.fahrenheit" />
            <FormIcon label={'Icon'} path="widgets.temperature.icon" />
            <FormColor label={'Color'} path="widgets.temperature.color" />
        </SettingsContainer>
    );
}
