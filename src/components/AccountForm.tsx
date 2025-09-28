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


export function AccountForm() {
    return (
        <AccountContainer>
            <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Меню</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>Профиль</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Личные данные
          </DropdownMenuItem>         
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Создать нового исполнителя</DropdownMenuItem>         
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
               
        <DropdownMenuItem>
          Выйти        
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
        </AccountContainer>
    );
}