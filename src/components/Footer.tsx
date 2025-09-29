export function Footer() {
    return (
        <div className="m-[auto] mt-8 flex justify-between brightness-200">
            <div className="w-[30%] flex flex-col justify-start">
                <img className="w-[150px]" src="ReneeLogo.png" alt="site logo"/>
                <div className="w-[100%] pt-15 flex items-center">
                    <img className="w-10" src="Lightning.png" alt="" />
                    <p className="text-white">Приближается гроза!</p>
                </div>
                <div className="pt-4 flex flex-col text-white">
                    <p>Made by Serge Choirot & Eros Valentini</p>
                    <p>Copyright Ⓒ 2025 DB, Ltd.</p>
                </div>
            </div>
            <div className="w-[70%] flex justify-between text-white">
                <div className="flex flex-col">
                    О нас
                </div>
                <div className="flex flex-col">
                    Контакты
                </div>
                <div className="flex flex-col">
                    Мы в социальных сетях
                </div>
            </div>
        </div>
    );
}