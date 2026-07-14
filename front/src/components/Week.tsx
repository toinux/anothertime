import { SettingsContainer } from '@/components/SettingsContainer.tsx';
import { FormColor } from '@/components/FormColor.tsx';
import { FormSelect } from '@/components/FormSelect.tsx';
import { FormBoolean } from '@/components/FormBoolean.tsx';

export function Week() {
    return (
        <SettingsContainer title="Week">
            <FormBoolean label={'Start sunday'} path={'week.startSunday'} />
            <FormSelect label={'Style'} values={['LARGE', 'PROGRESS', 'DOTTED', 'DOTTED2']} path={'week.style'} />
            <FormColor label={'Day color'} path="week.dayColor" />
            <FormColor label={'Week color'} path="week.weekColor" />
        </SettingsContainer>
    );
}
