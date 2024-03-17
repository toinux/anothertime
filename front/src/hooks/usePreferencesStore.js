import {create} from "zustand";
import {persist} from "zustand/middleware";

/**
 * @typedef {"dark" | "light" | "system"} Theme
 */

/**
 * @typedef {object} PreferencesStore
 * @property {Theme} theme
 * @property {function(theme: Theme): void} setTheme
 */

const usePreferencesStore = create(persist((set) => /** @type PreferencesStore */({
    theme: "system",
    setTheme: (theme) => set({theme})
}), {
    name: "anothertime.preferences"
}));

export default usePreferencesStore;