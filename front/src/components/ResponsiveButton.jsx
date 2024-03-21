import {Button} from "@/components/ui/button.jsx";
import {cn} from "@/lib/utils.js";
import {forwardRef, useState} from "react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.jsx";

export const ResponsiveButton = forwardRef(({className, children, label, tooltip, variant = "default", ...props}, ref) => {

    const [open, setOpen] = useState(false);
    const handleOpenChange = (value) => {
        tooltip && setOpen(value);
    };

    return <TooltipProvider>
        <Tooltip open={open} onOpenChange={handleOpenChange}>
            <TooltipTrigger asChild>
                <Button variant={variant} className={cn("h-10 w-10 p-0 sm:p-2 sm:w-full", className)} ref={ref} {...props}>
                    <div className={"flex"}>{children}</div>
                    {label && <span className={"ml-2 hidden sm:inline text-lg"}>{label}</span>}
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <p>{tooltip}</p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>

});
ResponsiveButton.displayName = "ResponsiveButton";