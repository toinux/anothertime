import {FormSelect} from "@/components/FormSelect.jsx";
import {SettingsContainer} from "@/components/SettingsContainer.jsx";

export function Widgets() {

    return <SettingsContainer title="Widgets">
        <FormSelect values={['NONE', 'SCROLL', 'FADE']}
                    label={'Animation'} propertyName="widgets.animation"/>
    </SettingsContainer>

}