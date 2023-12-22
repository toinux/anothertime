import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {useId, useMemo, useState} from "react";
import {HexColorInput, HexColorPicker} from "react-colorful";
import debounce from "debounce";
import {updateAnothertime} from "@/lib/updateAnothertime.js";

export function FormColor({label, defaultValue, propertyName}) {
    const id = useId();

    const [checked, setChecked] = useState(defaultValue !== null);
    const [color, setColor] = useState(defaultValue == null ? "#ffffff" : defaultValue);
    const [previousColor, setPreviousColor] = useState(defaultValue == null ? "#ffffff" : defaultValue);
    const [showColorPicker, setShowColorPicker] = useState(false);

    const handleCheck = (e) => {
        updateAnothertime(propertyName, e.target.checked ? color : "default");
        setChecked(e.target.checked);
    }

    const handleChange = debounce((color) => {
        setColor(color);
        updateAnothertime(propertyName, color);
    }, 100);

    const handleClick = (e) => {
        e.preventDefault();
        setPreviousColor(color);
        setShowColorPicker((show) => !show);
    }

    const handleClose = () => setShowColorPicker(false);
    const handleSave = () => {
        if (color !== previousColor) {
            updateAnothertime(propertyName, color);
        }
        handleClose();
    }
    const handleCancel = () => {
        if (color !== previousColor) {
            setColor(previousColor);
            updateAnothertime(propertyName, previousColor);
        }
        handleClose();
    }

    const presetColors = [
        '#000000', '#333333', '#4D4D4D', '#666666', '#808080', '#999999', '#B3B3B3', '#cccccc', '#FFFFFF', '#9F0500', '#D33115', '#F44E3B',
        '#C45100', '#E27300', '#FE9200', '#FB9E00', '#FCC400', '#FCDC00', '#808900', '#B0BC00', '#DBDF00', '#194D33', '#68BC00', '#A4DD00',
        '#0C797D', '#16A5A5', '#68CCCA', '#0062B1', '#009CE0', '#73D8FF', '#653294', '#7B64FF', '#AEA1FF', '#AB149E', '#FA28FF', '#FDA1FF'];


    const colorList = useMemo(() => presetColors.map((presetColor) => (
        <Button className="col-1 m-1 p-0"
                variant="outline-secondary"
                 key={presetColor}
                 style={{
                     background: presetColor,
                     width: "1.5rem",
                     height: "1.5rem"
                }}
                 onClick={() => handleChange(presetColor)}
        />
    )), [presetColors]);

    return <Form.Group className="mb-3" controlId={id}>
        <Row>
            <Col xs="auto">
                <Form.Check type="switch" label={label} checked={checked} onChange={handleCheck}/>
            </Col>
            <Col>
                {checked &&
                    <Form.Control type="color" value={color} readOnly={true}
                                  onClick={handleClick}
                                  title="Choose your color"/>}
            </Col>
        </Row>
        <Modal show={showColorPicker} onHide={handleClose} size="sm" centered>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                <HexColorPicker style={{width: "100%"}} className="mb-3" color={color} onChange={handleChange}/>
                <Row className="mb-3 px-3">
                    {colorList}
                </Row>
                <HexColorInput className="form-control" color={color} onChange={handleChange} prefixed={true}/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCancel}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Ok
                </Button>
            </Modal.Footer>

        </Modal>
    </Form.Group>
}