import {Form} from "react-bootstrap";
import {FormSelect} from "./FormSelect.jsx";
import {SettingsContainer} from "./SettingsContainer.jsx";

export function Widgets({props}) {

     return <SettingsContainer title="Widgets">
        <Form>
            <FormSelect defaultValue={props.widgets.animation} values={['NONE', 'SCROLL', 'FADE']}
                        label={'Animation'} propertyName="widgets.animation"/>
        </Form>
     </SettingsContainer>

}