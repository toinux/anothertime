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

    return <>
        <nav
            className="justify-between px-4 py-3 text-gray-700 border border-gray-200 rounded-lg sm:flex sm:px-5 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <h1>Anothertime</h1>
            </div>
            <div className="w-full md:block md:w-auto">
                <TrackedSpinner/>
                {config && <SaveButton/>}
            </div>
        </nav>


        <div className="container mx-auto px-4 mt-8">
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
    </>;
}