import {Form} from "react-bootstrap";
import {FormSelect} from "@/components/FormSelect.jsx";
import {FormColor} from "@/components/FormColor.jsx";
import {SettingsContainer} from "@/components/SettingsContainer.jsx";
import {FormBoolean} from "@/components/FormBoolean.jsx";
import {FormIcon} from "@/components/FormIcon.jsx";

export function CalendarWidget({props}) {

     return <SettingsContainer title="Calendar widget">
        <Form>
            <FormBoolean defaultValue={props.widgets.calendar.enabled} label="Enabled" propertyName="widgets.calendar.enabled"/>
            <FormSelect defaultValue={props.widgets.calendar.style} values={['ICON','LARGE','SMALL']}
                        label={'Style'} propertyName="widgets.calendar.style"/>
            <FormIcon defaultValue={props.widgets.calendar.icon} label={'Icon'} propertyName="widgets.calendar.icon"/>
            <FormColor defaultValue={props.widgets.calendar.color} label={'Color'} propertyName="widgets.calendar.color"/>
            <FormColor defaultValue={props.widgets.calendar.headColor} label={'Head color'} propertyName="widgets.calendar.headColor"/>
            <FormColor defaultValue={props.widgets.calendar.bodyColor} label={'Body color'} propertyName="widgets.calendar.bodyColor"/>
            <FormColor defaultValue={props.widgets.calendar.textColor} label={'Text color'} propertyName="widgets.calendar.textColor"/>
        </Form>
     </SettingsContainer>

}