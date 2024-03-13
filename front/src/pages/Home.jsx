import {Container, Navbar} from "react-bootstrap";
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

    return (
        <Container>
            <Navbar sticky="top" bg="dark" data-bs-theme="dark" className="mb-3">
                <Container>
                    <Navbar.Brand><h1>Anothertime</h1></Navbar.Brand>
                    <div className="d-flex justify-content-end">
                        <TrackedSpinner/>
                        {config && <SaveButton/>}
                    </div>
                </Container>

            </Navbar>
            {config && <>
                <Time/>
                <Seconds/>
                <Week/>
                <Widgets/>
                <CalendarWidget/>
                <TemperatureWidget/>
                <HumidityWidget/>
            </>
            }
        </Container>
    )
}