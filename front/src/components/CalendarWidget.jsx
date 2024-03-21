import {FormSelect} from "@/components/FormSelect.jsx";
import {FormColor} from "@/components/FormColor.jsx";
import {SettingsContainer} from "@/components/SettingsContainer.jsx";
import {FormBoolean} from "@/components/FormBoolean.jsx";
import {FormIcon} from "@/components/FormIcon.jsx";
import useConfigStore from "@/hooks/useConfigStore.js";

export function CalendarWidget() {

    const calendarStyle = useConfigStore((state) => state.config.widgets?.calendar?.style);

    return <SettingsContainer title="Calendar widget">
        <FormBoolean label="Enabled" propertyName="widgets.calendar.enabled"/>
        <FormSelect values={['ICON', 'LARGE', 'SMALL']}
                    label={'Style'} propertyName="widgets.calendar.style"/>
        {calendarStyle === 'ICON' ?
        <>
            <FormIcon label={'Icon'} propertyName="widgets.calendar.icon"/>
            <FormColor label={'Color'} propertyName="widgets.calendar.color"/>
        </>
        :
        <>
            <FormColor label={'Head color'} propertyName="widgets.calendar.headColor"/>
            <FormColor label={'Body color'} propertyName="widgets.calendar.bodyColor"/>
            <FormColor label={'Text color'} propertyName="widgets.calendar.textColor"/>
        </>
        }

    </SettingsContainer>

}