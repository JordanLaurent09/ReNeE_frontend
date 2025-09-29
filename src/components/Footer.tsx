export function Footer() {
    return (
        <div className="m-[auto] w-[100%] mt-8 mb-0 flex flex-col justify-between items-center brightness-200">
            
            <div className="w-[100%] flex justify-between text-white">
                 <div className="w-[25%] flex flex-col justify-center items-center">                   
                    <p className="text-white">Приближается гроза!</p>
                    <img className="w-[50%]" src="Lightning.png" alt="" />
                </div>
                <div className="w-[25%] flex flex-col items-center">
                    О нас
                    <div className="mt-6 text-center">
                        Мы - молодая команда единомышленников, разрабатывающих высококлассное ПО и передовые дизайнерские решения. Наши офисы расположены на двух континентах и в трех странах.
                    </div>
                </div>
                <div className="w-[25%] flex flex-col items-center text-center">
                    Контакты
                    <div className="mt-6 flex flex-col items-center">                      
                        <div className="m-[auto] w-[200px] flex items-center justify-between"><img className="w-[30px]" src="/Russia.png" alt="" /><p> +4012-777-999</p> </div>
                        <div className="m-[auto] w-[200px] flex items-center justify-between"><img className="w-[30px]" src="/USA.png" alt="" /><p> +1-3483-9484</p> </div>
                        <div className="m-[auto] w-[200px] flex items-center justify-between"><img className="w-[30px]" src="/Japan.png" alt="" /><p> +7-039-02903</p> </div>
                    </div>
                    

                </div>
                <div className="w-[25%] flex flex-col items-center text-center">
                    Мы в социальных сетях
                    <div className="mt-6 w-[100%] flex flex-col justify-between items-center">                      
                        <div className="m-[auto] mb-2 w-[200px] flex items-center justify-between"><img className="w-[25px]" src="/telegram.png" alt="значок телеграма" /><p> Телеграм</p> </div>
                        <div className="m-[auto] mb-2 w-[200px] flex items-center justify-between"><img className="w-[25px]" src="/vk.png" alt="значок вконтакте" /><p> VK</p> </div>
                        <div className="m-[auto] w-[200px] flex items-center justify-between"><img className="w-[25px]" src="/odnoklassniki.png" alt="значок одноклассников" /><p> Одноклассники</p> </div>
                    </div>
                </div>
            </div>
            <div className="m-[auto] mt-20 flex flex-col text-center text-white">
                    <p>Made by Serge Choirot & Eros Valentini</p>
                    <p>Copyright Ⓒ 2025 DB, Ltd.</p>
            </div>
        </div>
    );
}