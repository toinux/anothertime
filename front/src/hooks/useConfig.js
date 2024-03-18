import {useMutation, useQuery} from "@tanstack/react-query";
import {createNestedObject} from "@/lib/utils.js";
import {toast} from "react-toastify";
import ky from 'ky';

/**
 *
 * @returns {Promise<AnothertimeConfig>}
 */
const fetchConfig = () => ky.get("/config").json();

const saveConfig = () =>
    toast.promise(ky.post("/save"), {
        pending: "Saving settings...",
        error: {
            render({data}) {
                return `Impossible to save settings : ${data}`
            }
        },
        success: "Settings saved !"
    });

const postConfig = (payload) => ky.post("/config", {
    json: payload
});


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
        mutationFn: postConfig,
        onError: (e) => handleException("Could not update config", e)
    });
    return {...mutation, postConfig: (keyString, value) => mutation.mutate(createNestedObject(keyString, value))};
}

export const useSaveMutation = () =>
    useMutation({
        mutationKey: ["save"],
        mutationFn: saveConfig
    });

const handleException = (title, message) => {
    toast.error(`${title} : ${message}`)
}
