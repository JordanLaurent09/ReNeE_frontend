import type { ImagesProps } from "@/types/ImagesProps";
import type { JSX } from "react";


export function Picture(props: ImagesProps): JSX.Element {
    return (
        <img className="relative w-[30%] border rounded-md" src={props.image} alt="singer_picture" />
    );
}