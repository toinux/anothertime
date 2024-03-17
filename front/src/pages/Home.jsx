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

export default function Home() {

    const {data: config} = useConfig();

    return <div className={"relative flex min-h-screen flex-col bg-background text-foreground"}>
        <header className={"sticky top-0 z-50 w-full backdrop-blur drop-shadow-xl sm:mb-12 p-4"}
        >
            <div className={"sm:container flex justify-between"}>
                <div className={"text-3xl sm:text-4xl font-semibold mr-2"}>Anothertime</div>
                <div className={"flex gap-4"}>
                <TrackedSpinner/>
                {config && <SaveButton/>}
                </div>
            </div>
        </header>
        <main className={"flex-1"}>
            <div className="sm:container">
                {
                    config && <>
                        <Time/>
                        <Seconds/>
                        <Week/>
                        <Widgets/>
                        <CalendarWidget/>
                        <TemperatureWidget/>
                        <HumidityWidget/>
                    </>
                }
            </div>
        </main>
    </div>;
}