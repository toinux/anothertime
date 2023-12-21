import {trackPromise} from "react-promise-tracker";
import {handleException} from "./handleException.js";

export function updateAnothertime(key, value) {

    const payload = createNestedObject(key, value);

    trackPromise(
        fetch("/config", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(payload)
        }).then((r) => {
          if (r.status !== 200) {
              handleException("Could not update config", r.statusText);
          }
        }).catch(function (e) {
            handleException("Error", e.toString());
        })
    );
}

const createNestedObject = (keyString, value) => {
    const keys = keyString.split('.');
    const result = {};

    let currentLevel = result;
    keys.forEach((key, index) => {
        if (index === keys.length - 1) {
            currentLevel[key] = value;
        } else {
            currentLevel[key] = {};
            currentLevel = currentLevel[key];
        }
    });

    return result;
}