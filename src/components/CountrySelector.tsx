import type { SelectorProps } from "@/types/SelectorProps";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";

export function CountrySelector(props: SelectorProps): React.JSX.Element {
    return (
    <Select onValueChange={props.handleSelect} required>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a country"/>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Country</SelectLabel>
          <SelectItem value="/Russia.png"><img className="w-[30px]" src="/Russia.png" alt="Russia"/>Russia</SelectItem>
          <SelectItem value="/Germany.png"><img className="w-[30px]" src="/Germany.png" alt="Germany"/>Germany</SelectItem>    
          <SelectItem value="/England.png"><img className="w-[30px]" src="/England.png" alt="England"/>England</SelectItem>    
          <SelectItem value="/USA.png"><img className="w-[30px]" src="/USA.png" alt="USA"/>USA</SelectItem>    
          <SelectItem value="/Japan.png"><img className="w-[30px]" src="/Japan.png" alt="Japan"/>Japan</SelectItem>    
          <SelectItem value="/Italy.png"><img className="w-[30px]" src="/Italy.png" alt="Italy"/>Italy</SelectItem>    
          <SelectItem value="/Turkey.png"><img className="w-[30px]" src="/Turkey.png" alt="Turkey"/>Turkey</SelectItem>    
          <SelectItem value="/Egypt.png"><img className="w-[30px]" src="/Egypt.png" alt="Egypt"/>Egypt</SelectItem>    
          <SelectItem value="/Australia.png"><img className="w-[30px]" src="/Australia.png" alt="Australia"/>Australia</SelectItem>    
          <SelectItem value="/Sweden.png"><img className="w-[30px]" src="/Sweden.png" alt="Sweden"/>Sweden</SelectItem>    
          <SelectItem value="/Norway.png"><img className="w-[30px]" src="/Norway.png" alt="Norway"/>Norway</SelectItem>    
          <SelectItem value="/Canada.png"><img className="w-[30px]" src="/Canada.png" alt="Canada"/>Canada</SelectItem>    
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}