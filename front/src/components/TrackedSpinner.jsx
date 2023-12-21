import {Spinner} from "react-bootstrap";
import {usePromiseTracker} from "react-promise-tracker";

export function TrackedSpinner() {

    const {promiseInProgress} = usePromiseTracker();

    return <>
        {promiseInProgress && <Spinner animation="border" variant="light" className="me-3"/>}
    </>
}