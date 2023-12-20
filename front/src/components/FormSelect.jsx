import {Form} from "react-bootstrap";
import {useId} from "react";
import {updateAnothertime} from "../lib/updateAnothertime.js";

export function FormSelect({label, defaultValue, values, propertyName}) {
    const handleChange = (e) => {
        updateAnothertime(propertyName, e.target.value);
    }

    const id = useId();
    return <Form.Group className="mb-3" controlId={id}>
            <Form.Label>{label}</Form.Label>
            <Form.Select defaultValue={defaultValue} onChange={handleChange}>
                {
                    values.map(o => {
                        return (<option key={o} value={o}>{o}</option>)
                    })
                }
            </Form.Select>
        </Form.Group>
}