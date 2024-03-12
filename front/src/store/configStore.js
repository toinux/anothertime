import {create} from "zustand";
import {handleException} from "@/lib/handleException.js";
import {trackPromise} from "react-promise-tracker";


const configStore = create((set) => ({
        /** @type {AnothertimeConfig} */
        config: null,
        fetchConfig: () => {
            return trackPromise(
                fetch("/config")
                .then(r => {
                    if (r.status !== 200) {
                        handleException("fetch /config", r.statusText);
                        return null;
                    }
                    return r.json();
                })
                .then((json) => set({config: json}))
                .catch(e => {
                    handleException("Error", e.toString());
                })
            )
        }
    })
);
export default configStore;