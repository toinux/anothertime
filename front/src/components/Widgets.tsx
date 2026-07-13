import { SettingsContainer } from '@/components/SettingsContainer.tsx';
import { FormSelect } from '@/components/FormSelect.tsx';

export function Widgets() {
    return (
        <SettingsContainer title="Widgets">
            <FormSelect values={['NONE', 'SCROLL', 'FADE']} label={'Animation'} path="widgets.animation" />
        </SettingsContainer>
    );
}
