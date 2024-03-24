import { Time } from '@/components/Time.jsx';
import { Week } from '@/components/Week.jsx';
import { Seconds } from '@/components/Seconds.jsx';
import { Widgets } from '@/components/Widgets.jsx';
import { CalendarWidget } from '@/components/CalendarWidget.jsx';
import { TemperatureWidget } from '@/components/TemperatureWidget.jsx';
import { HumidityWidget } from '@/components/HumidityWidget.jsx';
import { SaveButton } from '@/components/SaveButton.jsx';
import { TrackedSpinner } from '@/components/TrackedSpinner.jsx';
import useConfig from '@/hooks/useConfig.js';
import { ThemeChooser } from '@/components/ThemeChooser.jsx';
import { ReloadButton } from '@/components/ReloadButton.jsx';
import useConfigStore from '@/hooks/useConfigStore.js';
import { useEffect } from 'react';

export default function Home() {
    const { data, isFetching } = useConfig();
    const setConfig = useConfigStore((state) => state.setConfig);
    const isConfigSet = useConfigStore((state) => state.isConfigSet);

    useEffect(() => {
        setConfig(data);
    }, [isFetching, data]);

    return (
        <div className={'relative flex min-h-screen flex-col bg-background text-foreground'}>
            <header className={'sticky top-0 z-50 w-full p-4 drop-shadow-xl backdrop-blur sm:mb-12'}>
                <div className={'flex justify-between sm:container'}>
                    <div className={'mr-2 text-2xl font-semibold sm:text-4xl'}>Anothertime</div>
                    <div className={'flex gap-2 sm:gap-4'}>
                        <TrackedSpinner className={'my-1 size-8 flex-none'} />
                        <ThemeChooser />
                        <ReloadButton />
                        <SaveButton />
                    </div>
                </div>
            </header>
            <main className={'flex-1'}>
                <div className="sm:container sm:max-w-screen-md">
                    {isConfigSet && (
                        <>
                            <Time />
                            <Seconds />
                            <Week />
                            <Widgets />
                            <CalendarWidget />
                            <TemperatureWidget />
                            <HumidityWidget />
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}
