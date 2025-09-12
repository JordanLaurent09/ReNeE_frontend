import type { GalleryProps } from "@/types/GalleryProps";
import type { JSX } from "react";
import { Picture } from "./Picture";

export function GalleryHomeContainer(props: GalleryProps): JSX.Element {
    return (
        <div className="mt-10 w-[80%] h-[100%] flex flex-wrap justify-between items-center gap-10">
            {props.gallery.map((picture, index) => (
                <Picture key={index} image={picture}/>
            ))}
        </div>
    );
}