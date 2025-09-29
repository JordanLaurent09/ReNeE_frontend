import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

function Header() {

    const navigate = useNavigate();

    const goToLogin = () => {
        navigate('/login')
    }
    const goToRegister = () => {
        navigate('/register')
    }
        
    return (
        <div className="m-[auto] pt-8 w-[70%] sticky top-0 flex justify-between brightness-200 z-2">
            <div>
                <img className="w-[150px]" src="ReneeLogo.png" alt="site logo"/>
            </div>          
            <div className="pr-2 w-[200px] flex justify-between text-black items-center">
                <Button onClick={goToLogin} variant='acid_green' size={'default'}>Войти</Button>
                <Button onClick={goToRegister} variant='acid_cyan' size={'default'}>Регистрация</Button>
            </div>
        </div>
    );
}

export default Header;