import {FormSelect} from "@/components/FormSelect.jsx";
import {FormColor} from "@/components/FormColor.jsx";
import {SettingsContainer} from "@/components/SettingsContainer.jsx";
import {FormBoolean} from "@/components/FormBoolean.jsx";
import {FormIcon} from "@/components/FormIcon.jsx";
import useConfig from "@/hooks/useConfig.js";
import {useState} from "react";

export function CalendarWidget() {

    const {data} = useConfig();

    const [showIcon, setShowIcon] = useState(data.widgets.calendar.style === 'ICON');

     return <SettingsContainer title="Calendar widget">
        <FormBoolean defaultValue={data.widgets.calendar.enabled} label="Enabled" propertyName="widgets.calendar.enabled"/>
        <FormSelect defaultValue={data.widgets.calendar.style} values={['ICON','LARGE','SMALL']}
                    handleChange={(value) => setShowIcon(value === 'ICON')}
                    label={'Style'} propertyName="widgets.calendar.style"/>
         {showIcon && <FormIcon defaultValue={data.widgets.calendar.icon} label={'Icon'} propertyName="widgets.calendar.icon"/>}
        <FormColor defaultValue={data.widgets.calendar.color} label={'Color'} propertyName="widgets.calendar.color"/>
        <FormColor defaultValue={data.widgets.calendar.headColor} label={'Head color'} propertyName="widgets.calendar.headColor"/>
        <FormColor defaultValue={data.widgets.calendar.bodyColor} label={'Body color'} propertyName="widgets.calendar.bodyColor"/>
        <FormColor defaultValue={data.widgets.calendar.textColor} label={'Text color'} propertyName="widgets.calendar.textColor"/>
     </SettingsContainer>

}