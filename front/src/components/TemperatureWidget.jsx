import {FormColor} from "@/components/FormColor.jsx";
import {SettingsContainer} from "@/components/SettingsContainer.jsx";
import {FormBoolean} from "@/components/FormBoolean.jsx";
import {FormIcon} from "@/components/FormIcon.jsx";

export function TemperatureWidget() {

    return <SettingsContainer title="Temperature widget">
        <FormBoolean label="Enabled" propertyName="widgets.temperature.enabled"/>
        <FormBoolean label="Fahrenheit" propertyName="widgets.temperature.fahrenheit"/>
        <FormIcon label={'Icon'} propertyName="widgets.temperature.icon"/>
        <FormColor label={'Color'} propertyName="widgets.temperature.color"/>
    </SettingsContainer>

}