import {Form} from "react-bootstrap";
import {FormSelect} from "@/components/FormSelect.jsx";
import {FormColor} from "@/components/FormColor.jsx";
import {SettingsContainer} from "@/components/SettingsContainer.jsx";
import useConfig from "@/hooks/useConfig.js";

export function Time() {

    const {data} = useConfig();
    const {time} = data;

     return <SettingsContainer title="Time">
         <Form>
            <FormSelect defaultValue={time.animation} values={['NONE', 'SCROLL', 'FADE']}
                        label={'Time animation'} propertyName="time.animation"/>
            <FormSelect defaultValue={time.separator} values={['NONE', 'BLINK', 'FADE']}
                        label={'Separator animation'} propertyName="time.separator"/>
            <FormColor defaultValue={time.hourColor} label={'Hour color'} propertyName="time.hourColor"/>
            <FormColor defaultValue={time.minutesColor} label={'Minutes color'} propertyName="time.minutesColor"/>
          <FormColor defaultValue={time.separatorColor} label={'Separator color'}
                     propertyName="time.separatorColor"/>
        </Form>
</SettingsContainer>

}