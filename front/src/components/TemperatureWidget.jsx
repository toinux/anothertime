import {Form} from "react-bootstrap";
import {FormColor} from "./FormColor.jsx";
import {SettingsContainer} from "./SettingsContainer.jsx";
import {FormBoolean} from "./FormBoolean.jsx";
import {FormIcon} from "./FormIcon.jsx";

export function TemperatureWidget({props}) {

     return <SettingsContainer title="Temperature widget">
        <Form>
            <FormBoolean defaultValue={props.widgets.temperature.enabled} label="Enabled" propertyName="widgets.temperature.enabled"/>
            <FormBoolean defaultValue={props.widgets.temperature.fahrenheit} label="Fahrenheit" propertyName="widgets.temperature.fahrenheit"/>
            <FormIcon defaultValue={props.widgets.temperature.icon} label={'Icon'} propertyName="widgets.temperature.icon"/>
            <FormColor defaultValue={props.widgets.temperature.color} label={'Color'} propertyName="widgets.temperature.color"/>
        </Form>
     </SettingsContainer>

}