import {Time} from "@/components/Time.jsx";
import {Week} from "@/components/Week.jsx";
import {Seconds} from "@/components/Seconds.jsx";
import {Widgets} from "@/components/Widgets.jsx";
import {CalendarWidget} from "@/components/CalendarWidget.jsx";
import {TemperatureWidget} from "@/components/TemperatureWidget.jsx";
import {HumidityWidget} from "@/components/HumidityWidget.jsx";
import {SaveButton} from "@/components/SaveButton.jsx";
import {TrackedSpinner} from "@/components/TrackedSpinner.jsx";
import useConfig from "@/hooks/useConfig.js";
import {ThemeChooser} from "@/components/ThemeChooser.jsx";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.jsx";
import {AlertCircle} from "lucide-react";
import {ReloadButton} from "@/components/ReloadButton.jsx";
import useConfigStore from "@/hooks/useConfigStore.js";
import {useEffect} from "react";

export default function Home() {

    const {isSuccess, isError, error, data, isFetching} = useConfig();
    const setConfig = useConfigStore((state) => state.setConfig);
    const isConfigSet = useConfigStore((state) => state.isConfigSet);

    useEffect(() => {
        if (isSuccess) {
            setConfig(data);
        }
    }, [isFetching, data]);

    return <div className={"relative flex min-h-screen flex-col bg-background text-foreground"}>
        <header className={"sticky top-0 z-50 w-full backdrop-blur drop-shadow-xl sm:mb-12 p-4"}
        >
            <div className={"sm:container flex justify-between"}>
                <div className={"text-3xl sm:text-4xl font-semibold mr-2"}>Anothertime</div>
                <div className={"flex gap-2 sm:gap-4"}>
                    <ThemeChooser/>
                    <ReloadButton/>
                    <SaveButton/>
                </div>
            </div>
        </header>
        <TrackedSpinner className={"fixed top-20 right-4 z-50"}/>
        <main className={"flex-1"}>
            <div className="sm:container sm:max-w-screen-md">
                {
                    isSuccess && isConfigSet && <>
                        <Time/>
                        <Seconds/>
                        <Week/>
                        <Widgets/>
                        <CalendarWidget/>
                        <TemperatureWidget/>
                        <HumidityWidget/>
                    </>
                }
                {isError && <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4"/>
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        {error.toString()}
                    </AlertDescription>
                </Alert>}
            </div>
        </main>
    </div>;
}