import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { SexSelectorProps } from "@/types/SexSelectorProps"
import type { JSX } from "react"

export function SexSelector(props: SexSelectorProps): JSX.Element {
  return (
    <Select onValueChange={props.handleSelect} required>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a gender"/>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Gender</SelectLabel>
          <SelectItem value="MALE">Male</SelectItem>
          <SelectItem value="FEMALE">Female</SelectItem>    
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
