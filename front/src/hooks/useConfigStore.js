import {create} from "zustand";
import {devtools} from "zustand/middleware";
import {immer} from 'zustand/middleware/immer'
import {merge} from "lodash";
import get from "lodash/get.js";


const useConfigStore = create(devtools(immer((setState, getState) => ({
    /** @type AnothertimeConfig */
    config: {},
    isConfigSet: false,
    /**
     * @param {AnothertimeConfig} config
     */
    setConfig: (config) => setState((draft) => {
        merge(draft.config, config);
        draft.isConfigSet = true;
    }),
    getValue: (keyString) => {
        return get(getState().config, keyString);
    }
})), {
    name: "config"
}));

export const useConfigValue = (keyString) => useConfigStore((state) => state.getValue(keyString));


export default useConfigStore;