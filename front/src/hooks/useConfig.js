import {useMutation, useQueryClient, useSuspenseQuery} from "@tanstack/react-query";
import {createNestedObject} from "@/lib/utils.js";
import {toast} from "react-toastify";
import ky from 'ky';
import {omit} from "lodash";
import useConfigStore from "@/hooks/useConfigStore.js";

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
    json: omit(payload, ["_keyString"])
});

const reloadConfig = () =>
    toast.promise(ky.post("/load"), {
        pending: "Reloading settings...",
        error: {
            render({data}) {
                return `Impossible to reload settings : ${data}`
            }
        },
        success: "Settings reloaded !"
    });


export default function useConfig() {
    return useSuspenseQuery({
        queryKey: ["config"],
        queryFn: fetchConfig,
        refetchOnWindowFocus: false,
        staleTime: 1000
    });
}

export function useConfigMutation()  {

    const setConfig = useConfigStore(state => state.setConfig);
    const getValue = useConfigStore(state => state.getValue);

    const mutation = useMutation({
        mutationKey: ["config"],
        mutationFn: postConfig,
        onMutate: (value) => {
            // on part du principe que c'est OK, on positionne tout de suite la nouvelle valeur
            // on rollbackera plus tard en cas d'erreur
            const oldValue = getValue(value._keyString);
            setConfig(value);
            return oldValue;
        },
        onError: (e, newValue, oldValue) => {
            // ici on repositionne oldValue en cas d'erreur
            setConfig(createNestedObject(newValue._keyString, oldValue));
            handleException("Could not update config", e);
        }
    });
    return {...mutation, postConfig: (keyString, value) => mutation.mutate(createNestedObject(keyString, value))};

}

export const useSaveMutation = () =>
    useMutation({
        mutationKey: ["save"],
        mutationFn: saveConfig
    });

export const useReloadMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["reload"],
        mutationFn: reloadConfig,
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["config"]
            })
        }
    });
}

const handleException = (title, message) => {
    toast.error(`${title} : ${message}`)
}
