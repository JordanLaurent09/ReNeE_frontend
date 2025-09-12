import type { Props } from "@/types/Props";
import type { JSX } from "react";

export function MainDevise({children}: Props): JSX.Element {
    return(
        <div className="relative w-full flex flex-col justify-between items-center gap-8">
            {children}
        </div>
    )
}