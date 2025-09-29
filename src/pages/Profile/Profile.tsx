import { AccountForm } from "@/components/AccountForm";
import { CountrySelector } from "@/components/CountrySelector";
import { GenreSelector } from "@/components/GenreSelector";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import type { Performer } from "@/types/Performer";
import axios from "axios";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from 'js-cookie';

function textToImageConvert(text: string): string {
        const textData = text.split(',')[1];

        const byteCharacters = atob(textData);
        const byteNumbers = new Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);

        const mimeType = textData.split(';')[0].split(':')[1];

        const blob = new Blob([byteArray], {type: mimeType});

        const imageUrl = URL.createObjectURL(blob);

        return imageUrl;
    }

function Profile() {

    
    
    const { userId } = useParams();

    const navigate = useNavigate();

    const [performersData, setPerformersData] = useState<Performer[]>([]);
    /* const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); */

    const [findPerformerValue, setFindPerformerData] = useState({
        name: ''
    }); 
    const [seekPerformer, setSeekPerformer] = useState<Performer>();

    const [display, setDisplay] = useState('hidden');

    const [createPerformerFormState, setCreatePerformerFormState] = useState('hidden');

    const [fileContent, setFileContent] = useState<string | null>(null);

    const [formData, setFormData] = useState({    
        name: '',
        genre: '',
        country: '',
        image: '',             
    });

    const [jwt, setJwt] = useState<string | undefined>(undefined);
    
    const handleCountrySelect = (event: string) => {     
        setFormData({
            ...formData,
            country: event
        });
        console.log(formData.country);
    }

    const handleGenreSelect = (event: string) => {     
        setFormData({
            ...formData,
            genre: event
        });
        console.log(formData.genre);
    }

    const handlePerformerInfo = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleFile = (event) => {
        const file = event.target.files[0];
        console.log(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (reader.result) {
                    setFileContent(reader.result as string);
                    setFormData({
                        ...formData,
                        image: reader.result as string
                    })
                }
            }
            reader.readAsDataURL(file);
            console.log(fileContent);
            console.log(formData);
        }
    }

    const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        try {
            await axios.get(`http://localhost:3010/performers/name/${findPerformerValue.name}`, {
                headers: {
                    "Authorization": `Bearer ${jwt}`
                }
            })
            .then(response => {
                setSeekPerformer(response.data);
                setDisplay('flex');                     
            })
            .catch(error => console.log(error))
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleAddToFavorites = async () => {
        if (seekPerformer) {
            console.log(seekPerformer.id, Number(userId))
            const response = await axios.post('http://localhost:3010/auth/addPerformer', { 
                userId: Number(userId), 
                performerId: seekPerformer.id 
            }, {headers: {"Authorization": `Bearer ${jwt}`}})
           
            const res = await axios.get(`http://localhost:3010/performers/id/${seekPerformer.id}`);
            console.log(res.data);
            setPerformersData([...performersData, res.data]);
            setDisplay('hidden');
            setFindPerformerData({name: ''});            
        } 
    }

    const openCreatePerformer = () => {
        setCreatePerformerFormState('flex');
    }


    const openUpdateData = async () => {

    }

    const logOut = () => {
        Cookies.remove('Renee');
        navigate('/');
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFindPerformerData({
            ...findPerformerValue,
            [name]: value
        })
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const res = await axios.post('http://localhost:3010/performers/add', formData);
            console.log(res);
            setCreatePerformerFormState('hidden');
        } catch(error) {
            console.log(error);
        }
    }

    const handleRemovePerformer = async (event) => {
        const performerId: number = event.target.value;
        const performer: Performer | undefined = performersData.find(performer => performer.id == performerId);
        try {
            const res = await axios.delete(`http://localhost:3010/auth/deletePerformer?userId=${userId}&performerId=${performerId}`, {headers: {"Authorization": `Bearer ${jwt}`}});
            console.log(res.data);
            setPerformersData(performersData.filter((value) => {
                return value != performer;
            }));
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        const performersIndexes = async () => {
            try {
                const jwt = Cookies.get('Renee');
                setJwt(jwt);
                await axios.get(`http://localhost:3010/auth/performers/${userId}`, {headers:  {"Authorization": `Bearer ${jwt}`}})
                .then(response => {
                    console.log(response.status);
                    axios.get(`http://localhost:3010/performers/favorites/${JSON.stringify(response.data)}`)
                    .then(response => {setPerformersData(response.data)})
                    .catch(error => {console.log(error)})
                })
                .catch(error => {console.log(error)})                                     
            } catch (error){
                console.log(error);
            }
        };
        performersIndexes();
    }, [userId]);

    return (       
        <div className="m-[auto] w-[80%] h-[60em] flex flex-col bg-[url(/NeonCar.jpg)] bg-size-[cover] bg-no-repeat brightness-90">
            <div className="m-[auto] mt-4 mb-4 w-[90%] h-[5em] relative flex justify-between items-center bg-[#6d0089] rounded-md opacity-50">                
                <img className="ml-4 w-[150px]" src="/ReneeLogo.png" alt="site logo"/>                                                                            
            </div>         
            <div className="absolute top-[4%] right-[-3.5%] w-[40%] flex gap-4">
                <div className="w-[60%] flex gap-4">
                    <Input className="w-[60%] text-white border-[#FC74FD]"
                        id="name"
                        type="name"
                        name="name"
                        value={findPerformerValue.name}
                        onChange={handleChange}
                        required
                        />
                        <div className={`absolute top-12 left-[1.5%] w-[35%] ${display} items-center justify-between text-white text-sm`}>
                            {seekPerformer?.name !== undefined && 
                            <div className="w-[100%] flex flex-col justify-between">
                                <Label className="w-[70%]">{seekPerformer?.name}</Label>
                                <div className="mt-2 w-[100%] flex justify-between">
                                    <p onClick={handleAddToFavorites} className="w-[40%] cursor-pointer">Добавить</p>
                                    <p onClick={() => {
                                            setDisplay('hidden');
                                            setFindPerformerData({name: ''});
                                        }} 
                                    className="mr-1 w-[40%] cursor-pointer">Закрыть</p>
                                </div>                               
                            </div>}                   
                            {seekPerformer?.name === undefined && 
                                <div className="mt-2 w-[100%] flex justify-between">
                                    <p>Не найдено</p>
                                    <p onClick={() => {
                                        setDisplay('hidden');
                                        setFindPerformerData({name: ''});
                                        }} 
                                    className="mr-1 w-[40%] cursor-pointer">Закрыть</p>
                                </div>
                                
                            }                            
                        </div>
                    <Button onClick={handleClick} className="w-[30%] text-[#FC74FD]">Поиск</Button>
                </div>               
                <AccountForm openUpdateData={openUpdateData} openCreatePerformer={openCreatePerformer} logOut={logOut}/>
            </div>

            
            <form onSubmit={handleSubmit} className={`absolute w-[20%] top-[25%] left-[40%] bg-[#301d33] ${createPerformerFormState} rounded-md text-[#FC74FD] z-1`} encType="multipart/form-data">
                <div className="m-[auto] relative mt-4 mb-4 flex flex-col justify-between items-center gap-6">
                    <div className="grid gap-2">
                        <label htmlFor="">Введите имя исполнителя</label>
                        <Input className="border-[#FC74FD]" type="text" name="name" id="name" value={formData.name} onChange={handlePerformerInfo}/>        
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="">Укажите жанр</label>
                        <GenreSelector handleSelect={handleGenreSelect}/>         
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="">Выберите страну</label>
                        <CountrySelector handleSelect={handleCountrySelect}/>        
                    </div>         
                    <div className="grid gap-2"> 
                        <label htmlFor="">Добавьте фото</label>
                        <Input className="border-[#FC74FD]" type="file" name="file" id="file" onChange={handleFile}/>
                    </div>
                    <div className="mt-4 mb-4 w-[60%] grid gap-2">
                        <Button variant={'barbie_pink'} type="submit" className="">
                            Создать исполнителя
                        </Button>
                    </div>
                                        
                </div>
                <button onClick={() => setCreatePerformerFormState('hidden')} className="absolute top-2 right-3 cursor-pointer text-[#f233f3]">X</button>                   
            </form>            
            
            {performersData[0] == undefined && 
            <div className="m-[auto] flex flex-col items-center">
                <h1 className="m-[auto] w-[80%] text-center text-8xl text-[#FC74FD]">У Вас пока нет любимых исполнителей</h1>
                <p className="mt-4 mb-4 text-[white] text-xl">Не нашли в поиске?</p>
                <Button onClick={openCreatePerformer} className="h-[50px] text-[#FC74FD] text-xl">Добавить</Button>
            </div>
            } 
            <div className="m-[auto] mt-20 w-[80%] flex flex-wrap gap-2 overflow-y-scroll rounded-md bg-fuchsia-400 brightness-80">
                {performersData != undefined && performersData.map(performersData => (
                    <div className="relative m-[auto] mt-4 mb-4 w-[25%] flex flex-col justify-between items-center text-white" key={performersData.id}>
                        <img className="w-[100%] h-[90%] rounded-md" src={textToImageConvert(performersData.image)} alt={performersData.image}/>
                        <Button value={performersData.id} onClick={handleRemovePerformer} className="absolute right-0 w-[20px] h-[30px] cursor-pointer rounded-[60%] text-[#f233f3]">X</Button>
                        <div className="m-[auto] mt-4 mb-4 w-[100%] flex flex justify-between items-center">
                            <p>{performersData.name}</p>                       
                            <img className="w-[10%]" src={performersData.country} alt="" />                           
                        </div>                      
                        <Button className="w-[100%] mb-2" onClick={() => navigate(`/profile/${userId}/${performersData.id}`)} variant="toxic_pink" size={'default'}>Open Hall of Fame</Button>                       
                    </div>
                    )) 
                }
                
            </div>
                   
        </div>                       
    )
}

export default Profile;