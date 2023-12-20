import {Form} from "react-bootstrap";
import {useId, useState} from "react";
import {updateAnothertime} from "../lib/updateAnothertime.js";

export function FormColor({label, defaultValue, propertyName}) {
    const id = useId();

    const [checked, setChecked] = useState(defaultValue !== null);
    const [color, setColor] = useState(defaultValue == null ? "#ffffff" : defaultValue);

    const handleCheck = (e) => {
        updateAnothertime(propertyName, e.target.checked ? color : "default");
        setChecked(e.target.checked);
    }

    const handleChange = (e) => {
        setColor(e.target.value);
        updateAnothertime(propertyName, e.target.value);
    }

    return <Form.Group className="mb-3" controlId={id}>
        <div className="row">
            <div className="col-auto">
                <Form.Check type="switch" label={label} checked={checked} onChange={handleCheck}/>
            </div>
            <div className="col-auto">
                {checked &&
                    <Form.Control type="color" defaultValue={color} onChange={handleChange}
                                  title="Choose your color"/>}
            </div>
        </div>
    </Form.Group>
}