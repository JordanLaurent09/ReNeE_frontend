import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function EmailLogin() {
    const [isInputActive, setIsInputActive] = useState(false);

    const onInputSelect = () => {
        setIsInputActive(true);
    }


    return (
      <div onClick={onInputSelect} className="w-[256px] flex flex-col justify-between content-between items-center" style={{}}>
        <Label>Enter your email</Label>
        {isInputActive && <Input
            
            placeholder="you@domain.com"
        />}
      </div>
    );
}