import { FormSelect } from '@/components/FormSelect.tsx';
import { FormColor } from '@/components/FormColor.tsx';
import { SettingsContainer } from '@/components/SettingsContainer.tsx';
import { FormBoolean } from '@/components/FormBoolean.tsx';
// import {FormIcon} from "@/components/FormIcon.tsx";
import { useSuspenseQuery } from '@tanstack/react-query';
import { configQueries } from '@/queries/config.ts';
import { FormIcon } from '@/components/FormIcon.tsx';

export function CalendarWidget() {
    'use no memo'; // fixe le reload de la configuration non détecté par le useSuspenseQuery

    const { data: config } = useSuspenseQuery(configQueries.get());

    return (
        <SettingsContainer title="Calendar widget">
            <FormBoolean label="Enabled" path="widgets.calendar.enabled" />
            <FormSelect values={['ICON', 'LARGE', 'SMALL']} label={'Style'} path="widgets.calendar.style" />
            {config.widgets.calendar.style === 'ICON' ? (
                <>
                    <FormIcon label={'Icon'} path="widgets.calendar.icon" />
                    <FormColor label={'Color'} path="widgets.calendar.color" />
                </>
            ) : (
                <>
                    <FormColor label={'Head color'} path="widgets.calendar.headColor" />
                    <FormColor label={'Body color'} path="widgets.calendar.bodyColor" />
                    <FormColor label={'Text color'} path="widgets.calendar.textColor" />
                </>
            )}
        </SettingsContainer>
    );
}
