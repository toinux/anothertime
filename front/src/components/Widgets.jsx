import {Form} from "react-bootstrap";
import {FormSelect} from "@/components/FormSelect.jsx";
import {SettingsContainer} from "@/components/SettingsContainer.jsx";
import useConfig from "@/hooks/useConfig.js";

export function Widgets() {

    const {data: props} = useConfig();

     return <SettingsContainer title="Widgets">
        <Form>
            <FormSelect defaultValue={props.widgets.animation} values={['NONE', 'SCROLL', 'FADE']}
                        label={'Animation'} propertyName="widgets.animation"/>
        </Form>
     </SettingsContainer>

}