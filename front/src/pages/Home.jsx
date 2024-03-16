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
        {/*bg-primary text-primary-foreground*/}
        <header className={"sticky top-0 z-50 w-full backdrop-blur drop-shadow-xl mb-12 p-4"}
            // className="justify-between px-4 py-3 text-gray-700 border border-gray-200 rounded-lg sm:flex sm:px-5 bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
        >
            <div className={"container flex justify-between"}>
                <div className={"text-4xl font-semibold"}>Anothertime</div>
                <div className={"flex gap-4"}>
                <TrackedSpinner/>
                {config && <SaveButton/>}
                </div>
            </div>
        </header>
        <main className={"flex-1"}>
            <div className="container">
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