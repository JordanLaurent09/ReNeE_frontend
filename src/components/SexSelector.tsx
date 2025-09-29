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
      <SelectTrigger className="w-[335px] border-[#f698c5]">
        <SelectValue placeholder="Выберите пол"/>
      </SelectTrigger>
      <SelectContent className="bg-[#01528f]">
        <SelectGroup>
          <SelectLabel>Пол</SelectLabel>
          <SelectItem value="MALE">Мужской</SelectItem>
          <SelectItem value="FEMALE">Женский</SelectItem>    
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
