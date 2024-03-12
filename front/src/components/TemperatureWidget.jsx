import {Form} from "react-bootstrap";
import {FormColor} from "@/components/FormColor.jsx";
import {SettingsContainer} from "@/components/SettingsContainer.jsx";
import {FormBoolean} from "@/components/FormBoolean.jsx";
import {FormIcon} from "@/components/FormIcon.jsx";
import configStore from "@/store/configStore.js";

export function TemperatureWidget() {

    const props = configStore((state) => state.config);

     return <SettingsContainer title="Temperature widget">
        <Form>
            <FormBoolean defaultValue={props.widgets.temperature.enabled} label="Enabled" propertyName="widgets.temperature.enabled"/>
            <FormBoolean defaultValue={props.widgets.temperature.fahrenheit} label="Fahrenheit" propertyName="widgets.temperature.fahrenheit"/>
            <FormIcon defaultValue={props.widgets.temperature.icon} label={'Icon'} propertyName="widgets.temperature.icon"/>
            <FormColor defaultValue={props.widgets.temperature.color} label={'Color'} propertyName="widgets.temperature.color"/>
        </Form>
     </SettingsContainer>

}