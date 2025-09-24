import { cn } from "@/lib/utils";

function AccountContainer({className, ...props}: React.ComponentProps<"div">) {
    return (
        <div
            className={cn(className)}
            {...props}
        />
    );
}

export default AccountContainer;