import {Container, Navbar, Spinner} from "react-bootstrap";
import {useFetch} from "./hooks/useFetch.js";
import {Time} from "./components/Time.jsx";
import {Week} from "./components/Week.jsx";
import {Seconds} from "./components/Seconds.jsx";
import {Widgets} from "./components/Widgets.jsx";
import {CalendarWidget} from "./components/CalendarWidget.jsx";
import {TemperatureWidget} from "./components/TemperatureWidget.jsx";
import {HumidityWidget} from "./components/HumidityWidget.jsx";
import {SaveButton} from "./components/SaveButton.jsx";

function App() {

    const {loading, data, errors} = useFetch("/config");

    return (
        <Container>
            <Navbar sticky="top" bg="dark" data-bs-theme="dark" className="mb-3">
                <Container>
                    <Navbar.Brand><h1>Anothertime settings</h1></Navbar.Brand>
                    {data && <SaveButton />}
                </Container>

            </Navbar>
            {loading && <Spinner animation="border"/>}
            {data && <>
                <Time props={data}/>
                <Seconds props={data}/>
                <Week props={data}/>
                <Widgets props={data}/>
                <CalendarWidget props={data}/>
                <TemperatureWidget props={data}/>
                <HumidityWidget props={data}/>
            </>
            }
        </Container>
    )
}

export default App
