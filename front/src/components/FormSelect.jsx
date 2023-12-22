import {Form, InputGroup} from "react-bootstrap";
import {useId} from "react";
import {updateAnothertime} from "@/lib/updateAnothertime.js";

export function FormSelect({label, defaultValue, values, propertyName}) {
    const handleChange = (e) => {
        updateAnothertime(propertyName, e.target.value);
    }

    const id = useId();
    return <Form.Group className="mb-3" controlId={id}>
        <InputGroup>
            <Form.Label style={{height: "2.5rem"}} className="input-group-text">{label}</Form.Label>
            <Form.Select style={{height: "2.5rem"}} defaultValue={defaultValue} onChange={handleChange}>
                {
                    values.map(o => {
                        return (<option key={o} value={o}>{o}</option>)
                    })
                }
            </Form.Select>
        </InputGroup>
    </Form.Group>

}