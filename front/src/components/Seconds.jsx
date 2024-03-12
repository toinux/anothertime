import {Form} from "react-bootstrap";
import {FormColor} from "@/components/FormColor.jsx";
import {SettingsContainer} from "@/components/SettingsContainer.jsx";
import configStore from "@/store/configStore.js";

export function Seconds() {


    const props = configStore((state) => state.config);

     return <SettingsContainer title = "Seconds">
        <Form>
            <FormColor defaultValue={props.seconds.color} label={'Seconds color'} propertyName="seconds.color"/>
            <FormColor defaultValue={props.seconds.backgroundColor} label={'Background color'} propertyName="seconds.backgroundColor"/>
        </Form>
     </SettingsContainer>

}