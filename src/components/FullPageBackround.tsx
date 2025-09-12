
import type { Props } from "@/types/Props";
import type { JSX } from "react";

export function FullPageBackground({children}: Props): JSX.Element {

    return (
        <div className="p-0 w-[100%] h-[60em] bg-[url(BlueNeonStreet.jpg)] bg-size-[cover] bg-no-repeat overflow-scroll">
        
            {children}
        </div>
    );

}