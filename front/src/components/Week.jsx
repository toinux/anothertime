import {FormSelect} from "@/components/FormSelect.jsx";
import {FormColor} from "@/components/FormColor.jsx";
import {SettingsContainer} from "@/components/SettingsContainer.jsx";
import {FormBoolean} from "@/components/FormBoolean.jsx";
import useConfig from "@/hooks/useConfig.js";

export function Week() {

    const {data: props} = useConfig();

     return <SettingsContainer title="Week">
        <FormBoolean defaultValue={props.week.startSunday} label="Start sunday" propertyName="week.startSunday"/>
        <FormSelect defaultValue={props.week.style} values={['LARGE','PROGRESS','DOTTED','DOTTED2']}
                    label={'Style'} propertyName="week.style"/>
        <FormColor defaultValue={props.week.dayColor} label={'Day color'} propertyName="week.dayColor"/>
        <FormColor defaultValue={props.week.weekColor} label={'Week color'} propertyName="week.weekColor"/>
     </SettingsContainer>

}