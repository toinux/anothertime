import {FormColor} from "@/components/FormColor.jsx";
import {SettingsContainer} from "@/components/SettingsContainer.jsx";

export function Seconds() {


    return <SettingsContainer title="Seconds">
        <FormColor label={'Seconds color'} propertyName="seconds.color"/>
        <FormColor label={'Background color'} propertyName="seconds.backgroundColor"/>
    </SettingsContainer>

}