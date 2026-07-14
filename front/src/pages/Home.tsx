import { TrackedSpinner } from '@/components/TrackedSpinner.tsx';
import { Time } from '@/components/Time.tsx';
import { ModeToggle } from '@/components/mode-toggle.tsx';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip.tsx';
import { RotateCcwIcon, SaveIcon } from 'lucide-react';
import MenuButton from '@/components/MenuButton.tsx';
import { Seconds } from '@/components/Seconds.tsx';
import { Week } from '@/components/Week.tsx';
import { Widgets } from '@/components/Widgets.tsx';
import { CalendarWidget } from '@/components/CalendarWidget.tsx';
import { useReloadMutation, useSaveMutation } from '@/mutations/config.ts';
import { HumidityWidget } from '@/components/HumidityWidget.tsx';
import { TemperatureWidget } from '@/components/TemperatureWidget.tsx';

const Home = () => {
    const saveMutation = useSaveMutation();
    const reloadMutation = useReloadMutation();

    return (
        <div className={'bg-background text-foreground relative flex min-h-screen flex-col'}>
            <header className={'sticky top-0 z-50 w-full p-4 drop-shadow-xl backdrop-blur sm:mb-12'}>
                <div className={'mx-auto flex max-w-7xl justify-between px-4 md:px-8'}>
                    <div className={'mr-2 text-2xl font-semibold sm:text-4xl'}>Anothertime</div>
                    <div className={'flex gap-2 sm:gap-4'}>
                        <TrackedSpinner />

                        <Tooltip>
                            <TooltipTrigger
                                render={
                                    <div>
                                        <ModeToggle />
                                    </div>
                                }
                            ></TooltipTrigger>
                            <TooltipContent>Change theme</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger
                                render={
                                    <MenuButton variant="outline" onClick={() => reloadMutation.mutate()}>
                                        <RotateCcwIcon />
                                    </MenuButton>
                                }
                            />
                            <TooltipContent>Reload configuration</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger
                                render={
                                    <MenuButton onClick={() => saveMutation.mutate()}>
                                        <SaveIcon />
                                    </MenuButton>
                                }
                            />
                            <TooltipContent>Save configuration</TooltipContent>
                        </Tooltip>
                    </div>
                </div>
            </header>
            <main className={'flex-1'}>
                <div className="mx-auto max-w-7xl px-4 sm:max-w-3xl md:px-8">
                    <Time />
                    <Seconds />
                    <Week />
                    <Widgets />
                    <CalendarWidget />
                    <TemperatureWidget />
                    <HumidityWidget />
                </div>
            </main>
        </div>
    );
};
export default Home;