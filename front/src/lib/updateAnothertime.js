export function updateAnothertime(key, value) {

    const payload = createNestedObject(key, value);

    fetch("/config", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(payload)
    }).catch(function (res) {
            console.log(res)
    });
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