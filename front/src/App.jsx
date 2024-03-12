import {Container, Navbar} from "react-bootstrap";
import {Time} from "@/components/Time.jsx";
import {Week} from "@/components/Week.jsx";
import {Seconds} from "@/components/Seconds.jsx";
import {Widgets} from "@/components/Widgets.jsx";
import {CalendarWidget} from "@/components/CalendarWidget.jsx";
import {TemperatureWidget} from "@/components/TemperatureWidget.jsx";
import {HumidityWidget} from "@/components/HumidityWidget.jsx";
import {SaveButton} from "@/components/SaveButton.jsx";
import {useEffect} from "react";
import {ToastContainer} from "react-toastify";
import {TrackedSpinner} from "@/components/TrackedSpinner.jsx";
import configStore from "@/store/configStore.js";
import {useShallow} from "zustand/react/shallow";

function App() {

    const [config, fetchConfig] = configStore(useShallow((state) => [state.config, state.fetchConfig]));

    useEffect(() => {
        fetchConfig();
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
                        <TrackedSpinner />
                        {config && <SaveButton />}
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

export default App
