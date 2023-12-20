import {Form} from "react-bootstrap";
import {FormColor} from "./FormColor.jsx";
import {SettingsContainer} from "./SettingsContainer.jsx";
import {FormBoolean} from "./FormBoolean.jsx";
import {FormIcon} from "./FormIcon.jsx";

export function HumidityWidget({props}) {

     return <SettingsContainer title="Humidity widget">
        <Form>
            <FormBoolean defaultValue={props.widgets.humidity.enabled} label="Enabled" propertyName="widgets.humidity.enabled"/>
            <FormIcon defaultValue={props.widgets.humidity.icon} label={'Icon'} propertyName="widgets.humidity.icon"/>
            <FormColor defaultValue={props.widgets.humidity.color} label={'Color'} propertyName="widgets.humidity.color"/>
        </Form>
     </SettingsContainer>

}