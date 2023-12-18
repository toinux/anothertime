import {Form} from "react-bootstrap";

export function Time({time}) {

    const handleChange = (e) => {

                fetch("/config", {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify({
                        time: {
                            separator: e.target.value
                        }
                    })
                })
                    .then(function(res){ console.log(res) })
                    .catch(function(res){ console.log(res) })

        // setConfig((config) => {
        //     return {
        //         ...config,
        //         time: {
        //             separator: e.target.value
        //         }
        //     }
        // })
        console.log(e.target.value)
    }

    return <Form>
        <Form.Group className="mb-3" controlId="timeAnimation">
            <Form.Label>Separator</Form.Label>
            <Form.Select defaultValue={time.separator} onChange={handleChange}>
                <option value="NONE">NONE</option>
                <option value="FADE">FADE</option>
                <option value="BLINK">BLINK</option>
            </Form.Select>
        </Form.Group>
    </Form>
}