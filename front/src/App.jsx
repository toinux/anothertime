import {Container, Navbar, Spinner} from "react-bootstrap";
import {Time} from "./components/Time.jsx";
import {Week} from "./components/Week.jsx";
import {Seconds} from "./components/Seconds.jsx";
import {Widgets} from "./components/Widgets.jsx";
import {CalendarWidget} from "./components/CalendarWidget.jsx";
import {TemperatureWidget} from "./components/TemperatureWidget.jsx";
import {HumidityWidget} from "./components/HumidityWidget.jsx";
import {SaveButton} from "./components/SaveButton.jsx";
import {trackPromise, usePromiseTracker} from "react-promise-tracker";
import {useEffect, useState} from "react";
import {handleException} from "./lib/handleException.js";
import {ToastContainer} from "react-toastify";

function App() {

    const [data, setData] = useState(null);
    const { promiseInProgress } = usePromiseTracker();

    useEffect(() => {
        trackPromise(
            fetch("/config")
                .then(r => {
                    if (r.status !== 200) {
                        handleException("fetch /config", r.statusText);
                        return null;
                    }
                    return r.json();
                })
                .then(setData)
                .catch(e => {
                    handleException("Error", e.toString());
                })
        );
    }, []);

    return (
        <Container>
            <ToastContainer
                position="bottom-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <Navbar sticky="top" bg="dark" data-bs-theme="dark" className="mb-3">
                <Container>
                    <Navbar.Brand><h1>Anothertime</h1></Navbar.Brand>
                    <div className="d-flex justify-content-end">
                        {promiseInProgress && <Spinner animation="border" variant="light" className="me-3" />}
                        {data && <SaveButton />}
                    </div>
                </Container>

            </Navbar>
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
