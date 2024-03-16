import {FormColor} from "@/components/FormColor.jsx";
import {SettingsContainer} from "@/components/SettingsContainer.jsx";
import {FormBoolean} from "@/components/FormBoolean.jsx";
import {FormIcon} from "@/components/FormIcon.jsx";
import useConfig from "@/hooks/useConfig.js";

export function HumidityWidget() {

    const {data: props} = useConfig();

     return <SettingsContainer title="Humidity widget">
        <FormBoolean defaultValue={props.widgets.humidity.enabled} label="Enabled" propertyName="widgets.humidity.enabled"/>
        <FormIcon defaultValue={props.widgets.humidity.icon} label={'Icon'} propertyName="widgets.humidity.icon"/>
        <FormColor defaultValue={props.widgets.humidity.color} label={'Color'} propertyName="widgets.humidity.color"/>
     </SettingsContainer>

}