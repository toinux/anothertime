import {FormSelect} from "@/components/FormSelect.jsx";
import {FormColor} from "@/components/FormColor.jsx";
import {SettingsContainer} from "@/components/SettingsContainer.jsx";
import {FormBoolean} from "@/components/FormBoolean.jsx";

export function Week() {

    return <SettingsContainer title="Week">
        <FormBoolean label="Start sunday" propertyName="week.startSunday"/>
        <FormSelect values={['LARGE', 'PROGRESS', 'DOTTED', 'DOTTED2']}
                    label={'Style'} propertyName="week.style"/>
        <FormColor label={'Day color'} propertyName="week.dayColor"/>
        <FormColor label={'Week color'} propertyName="week.weekColor"/>
    </SettingsContainer>

}