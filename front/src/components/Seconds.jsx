import {Form} from "react-bootstrap";
import {FormColor} from "@/components/FormColor.jsx";
import {SettingsContainer} from "@/components/SettingsContainer.jsx";
import useConfig from "@/hooks/useConfig.js";

export function Seconds() {


    const {data: props} = useConfig();

     return <SettingsContainer title = "Seconds">
        <Form>
            <FormColor defaultValue={props.seconds.color} label={'Seconds color'} propertyName="seconds.color"/>
            <FormColor defaultValue={props.seconds.backgroundColor} label={'Background color'} propertyName="seconds.backgroundColor"/>
        </Form>
     </SettingsContainer>

}