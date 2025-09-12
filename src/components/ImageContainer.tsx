import type { ImagesProps } from "@/types/ImagesProps";
import type { JSX } from "react";


export function ImageContainer(props: ImagesProps): JSX.Element {
    
    return (
        <div style={{padding: 0,  width: "50%", height: '60em', backgroundImage: `url(${props.image})`, backgroundSize: '100%', backgroundRepeat: "no-repeat"}}>
            
        </div>
    );
}