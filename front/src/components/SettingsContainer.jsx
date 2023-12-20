import {Card} from "react-bootstrap";

export function SettingsContainer({title, children}) {

    return <Card className="mb-3">
        <Card.Body>
            <Card.Title>{title}</Card.Title>
            {children}
        </Card.Body>
    </Card>

}