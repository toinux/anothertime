import {FormColor} from "@/components/FormColor.jsx";
import {SettingsContainer} from "@/components/SettingsContainer.jsx";
import {FormBoolean} from "@/components/FormBoolean.jsx";
import {FormIcon} from "@/components/FormIcon.jsx";

export function HumidityWidget() {

    return <SettingsContainer title="Humidity widget">
        <FormBoolean label="Enabled" propertyName="widgets.humidity.enabled"/>
        <FormIcon label={'Icon'} propertyName="widgets.humidity.icon"/>
        <FormColor label={'Color'} propertyName="widgets.humidity.color"/>
    </SettingsContainer>

}