import { Description } from "@/components/Description";
import { Footer } from "@/components/Footer";
import { FullPageBackground } from "@/components/FullPageBackround";
import { GalleryHomeContainer } from "@/components/GalleryHomeContainer";
import Header from "@/components/Header";
import { MainDevise } from "@/components/MainDevise";
import { MainDeviseRegisterContainer } from "@/components/MainDeviseRegisterContainer";
import { Offer } from "@/components/Offer";
import { Picture } from "@/components/Picture";
import { Title } from "@/components/Title";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    const goToRegister = () => {
        navigate('/register')
    }

    const singers = ['Renee1.jpg', 'Renee2.jpg', 'Renee3.jpg', 'Renee4.jpg', 'Renee5.jpg', 'Renee6.jpg'];

    return (
        <FullPageBackground>
            <Header/>
            <div className="relative m-auto p-[2rem] w-[70%] text-black z-1 ">
                <div className="absolute left-[1.5px] w-[100%] h-[100%] bg-black rounded-lg opacity-80 z-0"></div>                      
                    <MainDeviseRegisterContainer>
                    <Title/>
                    <MainDevise>
                        <Description/>
                        <Button variant={'acid_cyan'} size={'lg'} onClick={goToRegister}>Начните сходить с ума</Button>              
                    </MainDevise>
                    </MainDeviseRegisterContainer>                
                <Offer/>
                {/* Это будет отдельный компонент */}
                <div className="w-[100%] flex items-center justify-between">
                    <p className="relative w-[25%] text-white text-center text-4xl">Создайте свой собственный ЗАЛ СЛАВЫ с любимыми исполнителями</p>
                    <GalleryHomeContainer gallery={singers}/>   
                </div>
                <div className="mt-20 w-[100%] flex items-center justify-between">
                    <Picture image="Scandal.jpg"/>
                    <Picture image="Singer.jpg"/>
                    <p className="relative w-[25%] text-white text-center text-4xl">Добавляйте скандальные фото!))</p>                       
                </div>

                <div className="m-[auto] w-[100%] h-[100%] mt-20 flex items-center justify-evenly">
                    <p className="relative w-[25%] text-white text-center text-4xl">Храните свои любимые музыкальные альбомы</p> 
                    <Picture image="NeonPlayer1.jpg"/>                           
                </div>               

            </div>
            <div className="relative m-auto p-[2rem] w-[70%] text-black z-1 ">
                <div className="absolute left-[1.5px] w-[100%] h-[100%] bg-black opacity-80 z-0"></div>
                <Footer/>
            </div>
            
             
        </FullPageBackground>
        
        
        // <div className="flex flex-col justify-center">
        //     <div className="flex justify-center">
        //         <h1 className="text-9xl">R</h1>
        //         <h1 className="text-9xl">E</h1>
        //         <h1 className="text-9xl">N</h1>
        //         <h1 className="text-9xl">E</h1>
        //         <h1 className="text-9xl">E</h1>
        //     </div>            
        //     <img src="Renee2.jpg" alt="" />
        // </div>
        
    )
}

export default Home;