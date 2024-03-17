import {useMutation, useQuery} from "@tanstack/react-query";
import {handleException} from "@/lib/handleException.js";
import {createNestedObject} from "@/lib/utils.js";
import {toast} from "react-toastify";

/**
 *
 * @returns {Promise<AnothertimeConfig>}
 */
const fetchConfig = () =>
    fetch("/config")
        .then(r => {
            if (r.status !== 200) {
                handleException("fetch /config", r.statusText);
                return null;
            }
            return r.json();
        })
        .catch(e => {
            handleException("Error", e.toString());
        })

const saveConfig = () => {

    const promise = fetch("/save", {
        method: "POST"
    });

    return toast.promise(promise, {
        pending: "Saving settings...",
        error: {
            render({data}) {
                return `Impossible to save settings : ${data}`
            }
        },
        success: "Settings saved !"
    })
};

const postConfig = (payload) =>
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


export default function useConfig() {
    return useQuery({
        queryKey: ["config"],
        queryFn: fetchConfig,
        refetchOnWindowFocus: false,
        staleTime: 1000
    });
}

export function useConfigMutation()  {
    const mutation = useMutation({
        mutationKey: ["config"],
        mutationFn: postConfig
    });
    return {...mutation, postConfig: (keyString, value) => mutation.mutate(createNestedObject(keyString, value))};
}

export const useSaveMutation = () =>
    useMutation({
        mutationKey: ["save"],
        mutationFn: saveConfig
    });
