import { SettingsContainer } from '@/components/SettingsContainer.tsx';
import { FormSelect } from '@/components/FormSelect.tsx';
import { FormColor } from '@/components/FormColor.tsx';

export function Time() {
    return (
        <SettingsContainer title="Time">
            <FormSelect values={['NONE', 'SCROLL', 'FADE']} label={'Time animation'} path="time.animation" />
            <FormSelect
                values={['NONE', 'BLINK', 'FADE']}
                label={'Separator animation'}
                path="time.separator"
            />
            <FormColor label={'Hour color'} path="time.hourColor" />
            <FormColor label={'Minutes color'} path="time.minutesColor" />
            <FormColor label={'Separator color'} path="time.separatorColor" />

        </SettingsContainer>
    );
}
