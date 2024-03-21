import {Moon, Sun, SunMoon} from "lucide-react"
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import usePreferencesStore from "@/hooks/usePreferencesStore.js";
import {useEffect} from "react";
import {ResponsiveButton} from "@/components/ResponsiveButton.jsx";

export function ThemeChooser() {
    const {theme, setTheme} = usePreferencesStore((state) => state);

    useEffect(() => {
        const root = window.document.documentElement

        root.classList.remove("light", "dark")

        if (theme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
                .matches
                ? "dark"
                : "light";

            root.classList.add(systemTheme);
            return;
        }

        root.classList.add(theme)
    }, [theme]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <ResponsiveButton variant="outline" tooltip={"Theme"}>
                    <Sun className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </ResponsiveButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent onCloseAutoFocus={(e) => e.preventDefault()}>
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    <Sun className={"mr-2"}/> Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    <Moon className={"mr-2"}/> Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                    <SunMoon className={"mr-2"}/> System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
