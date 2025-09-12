import { cn } from "@/lib/utils";

function RegisterContainer({className, ...props}: React.ComponentProps<"div">) {
    return (
        <div
            className={cn(className)}
            {...props}
        />
    )
}

export default RegisterContainer;