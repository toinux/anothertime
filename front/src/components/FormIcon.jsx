import {Button, Collapse, Form, InputGroup} from "react-bootstrap";
import {useId, useRef, useState} from "react";
import {updateAnothertime} from "@/lib/updateAnothertime.js";
import {FaGear} from "react-icons/fa6";
import debounce from "debounce";

export function FormIcon({label, defaultValue, propertyName}) {

    const iconRef = useRef();
    const [offsetOpen, setOffsetOpen] = useState(false);
    const [offset, setOffset] = useState({x: defaultValue.x, y: defaultValue.y})

    const handleKey = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            updateAnothertime(propertyName + ".name", e.target.value);
        }
    }

    const handleClick = () => {
        updateAnothertime(propertyName + ".name", iconRef.current.value);
    }

    const handleOffsetX = debounce((e) => {
        setOffset((value) => {
            const offset = {...value, x: e.target.value};
            updateAnothertime(propertyName, offset);
            return offset;
        });
    }, 100);
    const handleOffsetY = debounce((e) => {
        setOffset((value) => {
            const offset = {...value, y: e.target.value};
            updateAnothertime(propertyName, offset);
            return offset;
        });
    }, 100);

    const id = useId();
    return <>
        <Form.Group className="mb-3" controlId={id}>
            <InputGroup>
                <Form.Label style={{height: "2.5rem"}} className="input-group-text">{label}</Form.Label>
                <Form.Control ref={iconRef} type="text" style={{height: "2.5rem"}} defaultValue={defaultValue.name}
                              onKeyDown={handleKey} placeholder={defaultValue.name}/>
                <Button style={{height: "2.5rem"}} onClick={() => setOffsetOpen((value) => !value)}><FaGear /></Button>
                <Button style={{height: "2.5rem"}} onClick={handleClick}>Ok</Button>
            </InputGroup>
        </Form.Group>
        <Collapse in={offsetOpen}>
            <div>
            <Form.Label>X offset : {offset.x}</Form.Label>
            <Form.Range defaultValue={offset.x} min={-32} max={32} step={1} onChange={handleOffsetX}/>
            <Form.Label>Y offset {offset.y} </Form.Label>
            <Form.Range defaultValue={offset.y} min={-8} max={8} step={1} onChange={handleOffsetY}/>
            </div>
        </Collapse>
    </>

}