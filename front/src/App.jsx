import {Spinner} from "react-bootstrap";
import {useFetch} from "./hooks/useFetch.js";

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

    return (
        <div className="container">
            <h1>Hello</h1>
            {loading && <Spinner animation="border"/>}
            {data && <><p>Time animation : {data.time.animation}</p>
                    <pre>{JSON.stringify(data)}</pre></>}
        </div>
    )
}

export default App
