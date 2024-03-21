import {FormSelect} from "@/components/FormSelect.jsx";
import {FormColor} from "@/components/FormColor.jsx";
import {SettingsContainer} from "@/components/SettingsContainer.jsx";

export function Time() {


    return <SettingsContainer title="Time">
        <FormSelect values={['NONE', 'SCROLL', 'FADE']}
                    label={'Time animation'} propertyName="time.animation"/>
        <FormSelect values={['NONE', 'BLINK', 'FADE']}
                    label={'Separator animation'} propertyName="time.separator"/>
        <FormColor label={'Hour color'} propertyName="time.hourColor"/>
        <FormColor label={'Minutes color'} propertyName="time.minutesColor"/>
        <FormColor label={'Separator color'}
                   propertyName="time.separatorColor"/>
    </SettingsContainer>;

}