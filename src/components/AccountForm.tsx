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
        <Button variant="outline">Меню</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>Профиль</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={props.openUpdateData}>
            Личные данные
          </DropdownMenuItem>         
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={props.openCreatePerformer}>Создать нового исполнителя</DropdownMenuItem>         
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
               
        <DropdownMenuItem onClick={props.logOut}>
          Выйти        
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
        </AccountContainer>
    );
}