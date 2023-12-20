import {Form} from "react-bootstrap";
import {useId, useState} from "react";
import {updateAnothertime} from "../lib/updateAnothertime.js";

export function FormBoolean({label, defaultValue, propertyName}) {
    const id = useId();

    const [checked, setChecked] = useState(defaultValue);

    const handleCheck = (e) => {
        updateAnothertime(propertyName, e.target.checked);
        setChecked(e.target.checked);
    }

    return <Form.Group className="mb-3" controlId={id}>
        <Form.Check type="switch" label={label} checked={checked} onChange={handleCheck}/>
    </Form.Group>
}