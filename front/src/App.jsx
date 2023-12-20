import {Spinner} from "react-bootstrap";
import {useFetch} from "./hooks/useFetch.js";
import {Time} from "./components/Time.jsx";
import {Week} from "./components/Week.jsx";
import {useState} from "react";
import {Seconds} from "./components/Seconds.jsx";
import {Widgets} from "./components/Widgets.jsx";
import {CalendarWidget} from "./components/CalendarWidget.jsx";
import {TemperatureWidget} from "./components/TemperatureWidget.jsx";
import {HumidityWidget} from "./components/HumidityWidget.jsx";

function App() {

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const data = await fetch("/config");
    //        data.json().then(setConfig);
    //     }
    //     fetchData().catch(console.error);
    //     return () => {
    //         // unmount
    //     }
    // }, []);

    const {loading, data, errors} = useFetch("/config");
    const [config, setConfig] = useState(null);

    // useEffect(() => {
    //     setConfig(data);
    // }, [data]);
    //
    // useEffect(() => {
    //         fetch("/config", {
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json'
    //             },
    //             method: "POST",
    //             body: JSON.stringify(config)
    //         })
    //             .then(function(res){ console.log(res) })
    //             .catch(function(res){ console.log(res) })
    // }, [config]);

    return (
        <div className="container">
            <h1>Anothertime settings</h1>
            {loading && <Spinner animation="border"/>}
            {data && <>
                <Time props={data} />
                <Seconds props={data} />
                <Week props={data} />
                <Widgets props={data} />
                <CalendarWidget props={data} />
                <TemperatureWidget props={data} />
                <HumidityWidget props={data} />
            </>
            }
        </div>
    )
}

export default App
