import type { SelectorProps } from "@/types/SelectorProps";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";

export function GenreSelector(props: SelectorProps): React.JSX.Element {
    return (
    <Select onValueChange={props.handleSelect} required>
      <SelectTrigger className="w-[180px] border-[#FC74FD]">
        <SelectValue placeholder="Выберите жанр"/>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="bg-[#301d33] text-[#FC74FD]">
          <SelectLabel className="text-[#FC74FD]">Genre</SelectLabel>
          <SelectItem value="Pop">Pop</SelectItem>
          <SelectItem value="Rock">Rock</SelectItem>    
          <SelectItem value="OST">OST</SelectItem>    
          <SelectItem value="Electronica">Electronica</SelectItem>    
          <SelectItem value="Metal">Metal</SelectItem>                
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}