import {Card, Form} from "react-bootstrap";
import {FormColor} from "./FormColor.jsx";

export function Seconds({props}) {

     return <Card className="mb-3">
      <Card.Body>
        <Card.Title>Seconds settings</Card.Title>
        <Form>
            <FormColor defaultValue={props.seconds.color} label={'Seconds color'} propertyName="seconds.color"/>
            <FormColor defaultValue={props.seconds.backgroundColor} label={'Background color'} propertyName="seconds.backgroundColor"/>
        </Form>
      </Card.Body>
    </Card>

}