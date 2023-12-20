import {useEffect, useState} from "react";

/**
 *
 * @param {string} url
 * @param {FetchEventInit} options
 */
export function useFetch(url, options) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        fetch(url, options)
            .then(r => r.json())
            .then(setData)
            .catch(e => {
                setErrors(e);
            })
            .finally(() => {
                setLoading(false);
            })
    }, []);

    return {loading, data, errors}
}