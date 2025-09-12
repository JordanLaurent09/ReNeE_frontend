import type { Props } from "@/types/Props";
import type { JSX } from "react";

export function MainDeviseRegisterContainer({children}: Props): JSX.Element {
    return (
        <div className="mt-6 flex flex-col gap-8 brightness-200">
            {children}
        </div>
    );
}