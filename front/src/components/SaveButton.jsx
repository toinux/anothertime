import {Button} from "react-bootstrap";
import {FaSave} from "react-icons/fa";

export function SaveButton() {

    const handleClick = (e) => {
        fetch("/save", {
            method: "POST"
        }).catch(function (res) {
            console.error(res)
        });
    }

    return <Button variant="primary" onClick={handleClick}><FaSave/> Save</Button>

}