import {useQuery} from "@tanstack/react-query";
import {trackPromise} from "react-promise-tracker";
import {handleException} from "@/lib/handleException.js";

/**
 *
 * @returns {Promise<AnothertimeConfig>}
 */
const fetchConfig = () => {
    return trackPromise(
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
    )
}

export default function useConfig() {
    return useQuery({
        queryKey: ["config"],
        queryFn: fetchConfig,
        refetchOnWindowFocus: false,
        staleTime: 1000
    });
}