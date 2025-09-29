import AccountContainer from "./AccountContainer";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { AccountFormProps } from "@/types/AccountFormProps";


export function AccountForm(props: AccountFormProps) {
    return (
        <AccountContainer>
            <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='barbie_pink'>Меню</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-[#301d33] text-[#FC74FD] border-[#FC74FD]" align="end">
        <DropdownMenuLabel>Профиль</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={props.openUpdateData}>
            Личные данные
          </DropdownMenuItem>         
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-[#FC74FD]"/>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={props.openCreatePerformer}>Создать нового исполнителя</DropdownMenuItem>         
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-[#FC74FD]"/>
               
        <DropdownMenuItem onClick={props.logOut}>
          Выйти        
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
        </AccountContainer>
    );
}