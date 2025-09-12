import * as React from "react"
import { cn } from "@/lib/utils"

function LoginContainer({className, ...props}: React.ComponentProps<"div">) {
    return (
        <div
            className={cn(className)}
            {...props}
        />
    );
}
export default LoginContainer;