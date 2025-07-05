import * as React from "react"
import { cn } from "@/lib/utils"

interface SwitchProps {
    checked: boolean
    onCheckedChange: (checked: boolean) => void
    className?: string
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
    ({ checked, onCheckedChange, className, ...props }, ref) => {
        const buttonProps = {
            ref,
            type: "button" as const,
            role: "switch" as const,
            "aria-checked": checked ? "true" as const : "false" as const,
            onClick: () => onCheckedChange(!checked),
            className: cn(
                "peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
                checked ? "bg-primary-500" : "bg-dark-4",
                className
            ),
            ...props
        };

        return (
            <button {...buttonProps}>
                <span
                    className={cn(
                        "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform",
                        checked ? "translate-x-5" : "translate-x-0"
                    )}
                />
            </button>
        );
    }
)
Switch.displayName = "Switch"

export { Switch }
