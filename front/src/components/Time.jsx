import {Form} from "react-bootstrap";
import {FormSelect} from "@/components/FormSelect.jsx";
import {FormColor} from "@/components/FormColor.jsx";
import {SettingsContainer} from "@/components/SettingsContainer.jsx";

export function Time({props}) {

     return <SettingsContainer title="Time">
         <Form>
            <FormSelect defaultValue={props.time.animation} values={['NONE', 'SCROLL', 'FADE']}
                        label={'Time animation'} propertyName="time.animation"/>
            <FormSelect defaultValue={props.time.separator} values={['NONE', 'BLINK', 'FADE']}
                        label={'Separator animation'} propertyName="time.separator"/>
            <FormColor defaultValue={props.time.hourColor} label={'Hour color'} propertyName="time.hourColor"/>
            <FormColor defaultValue={props.time.minutesColor} label={'Minutes color'} propertyName="time.minutesColor"/>
          <FormColor defaultValue={props.time.separatorColor} label={'Separator color'}
                     propertyName="time.separatorColor"/>
        </Form>
</SettingsContainer>

}