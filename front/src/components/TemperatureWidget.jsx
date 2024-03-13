import {Form} from "react-bootstrap";
import {FormColor} from "@/components/FormColor.jsx";
import {SettingsContainer} from "@/components/SettingsContainer.jsx";
import {FormBoolean} from "@/components/FormBoolean.jsx";
import {FormIcon} from "@/components/FormIcon.jsx";
import useConfig from "@/hooks/useConfig.js";

export function TemperatureWidget() {

    const {data: props} = useConfig();

     return <SettingsContainer title="Temperature widget">
        <Form>
            <FormBoolean defaultValue={props.widgets.temperature.enabled} label="Enabled" propertyName="widgets.temperature.enabled"/>
            <FormBoolean defaultValue={props.widgets.temperature.fahrenheit} label="Fahrenheit" propertyName="widgets.temperature.fahrenheit"/>
            <FormIcon defaultValue={props.widgets.temperature.icon} label={'Icon'} propertyName="widgets.temperature.icon"/>
            <FormColor defaultValue={props.widgets.temperature.color} label={'Color'} propertyName="widgets.temperature.color"/>
        </Form>
     </SettingsContainer>

}