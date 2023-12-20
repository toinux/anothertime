import {Button, Form, InputGroup} from "react-bootstrap";
import {useId, useRef} from "react";
import {updateAnothertime} from "../lib/updateAnothertime.js";

export function FormIcon({label, defaultValue, propertyName}) {

    const iconRef = useRef();

    const handleKey = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            updateAnothertime(propertyName, e.target.value);
        }
    }

    const handleClick = (e) => {
        updateAnothertime(propertyName, iconRef.current.value);
    }

    const id = useId();
    return <Form.Group className="mb-3" controlId={id}>
        <InputGroup>
            <Form.Label style={{height: "2.5rem"}} className="input-group-text">{label}</Form.Label>
            <Form.Control ref={iconRef} type="text" style={{height: "2.5rem"}} defaultValue={defaultValue} onKeyDown={handleKey} placeholder={defaultValue}/>
            <Button style={{height: "2.5rem"}} onClick={handleClick}>Ok</Button>
        </InputGroup>
    </Form.Group>

}