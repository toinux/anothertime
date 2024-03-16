import {usePromiseTracker} from "react-promise-tracker";
import {Spinner} from "@/components/Spinner.jsx";

export function TrackedSpinner() {

    const {promiseInProgress} = usePromiseTracker();

    return <>
        {promiseInProgress && <Spinner />}
    </>
}