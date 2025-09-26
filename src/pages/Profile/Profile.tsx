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

function Profile() {

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
            const res = await axios.post('http://localhost:3010/users/performer', { 
                userId: Number(userId), 
                performerId: seekPerformer.id 
            }, {headers: {"Authorization": `Bearer ${jwt}`}})
            console.log(res);
            //const newPerformer = res.data;
            //setPerformersData([...performersData, newPerformer])
        } 
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
        } catch(error) {
            console.log(error);
        }
    }

    const handleRemovePerformer = async (event) => {
        const performerId: number = event.target.value;
        const performer: Performer | undefined = performersData.find(performer => performer.id == performerId);
        try {
            const res = await axios.delete(`http://localhost:3010/users/deletePerformer?userId=${userId}&performerId=${performerId}`);
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
                await axios.get(`http://localhost:3010/users/performers/${userId}`)
                .then(response => {
                    
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

    useEffect(() => {
        const jwt = Cookies.get('Renee');
        setJwt(jwt);
    }, [])

    return (       
        <div className="m-[auto] w-[80%] h-[60em] flex flex-col bg-[url(/NeonCar.jpg)] bg-size-[cover] bg-no-repeat brightness-90">
            <div className="m-[auto] mt-4 mb-4 w-[90%] h-[5em] relative flex justify-between items-center bg-[#6d0089] rounded-md opacity-50">                
                <img className="ml-4 w-[150px]" src="/ReneeLogo.png" alt="site logo"/>                                                             
            </div>
            
            <div className="absolute top-[4%] right-[-3.5%] w-[40%] flex gap-4">
                <div className="w-[60%] flex gap-4">
                    <Input className="w-[60%] text-white"
                        id="name"
                        type="name"
                        name="name"
                        value={findPerformerValue.name}
                        onChange={handleChange}
                        required
                        />
                        <div className={`absolute top-12 left-[1.5%] w-[35%] ${display} items-center justify-between text-white text-sm`}>
                            {seekPerformer?.name !== undefined && 
                            <div className="w-[70%] flex justify-between items-center">
                                <Label className="w-[70%]">{seekPerformer?.name}</Label>
                                <Button onClick={handleAddToFavorites} className="w-[20%]">Add</Button>
                                
                            </div>}                   
                            {seekPerformer?.name === undefined && <p>Nothing found</p>}
                            <Button onClick={() => {console.log("Neon");setDisplay('hidden')}} className="mr-1 w-[20%]">Close</Button>
                        </div>
                    <Button onClick={handleClick} className="w-[30%]">Find singer</Button>
                </div>               
                <AccountForm/>
            </div>

            
            <form onSubmit={handleSubmit} className="absolute w-[20%] top-[30%] left-[40%] bg-[black] hidden rounded-md text-orange-500 z-1" encType="multipart/form-data">
                <div className="flex flex-col items-center gap-6">
                    <div className="grid gap-2">
                        <label htmlFor="">Enter performer name</label>
                        <Input className="" type="text" name="name" id="name" value={formData.name} onChange={handlePerformerInfo}/>        
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="">Choose genre</label>
                        <GenreSelector handleSelect={handleGenreSelect}/>         
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="">Choose country</label>
                        <CountrySelector handleSelect={handleCountrySelect}/>        
                    </div>         
                    <div className="grid gap-2"> 
                        <label htmlFor="">Add file</label>
                        <Input className="" type="file" name="file" id="file" onChange={handleFile}/>
                    </div>
                    <div className="mt-4 mb-4 w-[60%] grid gap-2">
                        <Button type="submit" className="">
                            Create performer
                        </Button>
                    </div>                    
                </div>                   
            </form>            
            
            
            <div className="m-[auto] mt-20 w-[80%] flex justify-between gap-2 rounded-md bg-fuchsia-400 brightness-80">
                {performersData !== undefined && performersData.map(performersData => (
                    <div className="relative m-[auto] mt-4 mb-4 w-[25%] flex flex-col justify-between items-center text-white" key={performersData.id}>
                        <img className="w-[100%] h-[90%] rounded-md" src={textToImageConvert(performersData.image)} alt={performersData.image}/>
                        <Button value={performersData.id} onClick={handleRemovePerformer} className="absolute right-0">X</Button>
                        <div className="m-[auto] mt-4 mb-4 w-[100%] flex flex justify-between items-center">
                            <p>{performersData.name}</p>                       
                            <img className="w-[10%]" src={performersData.country} alt="" />                           
                        </div>                      
                        <Button className="w-[100%] mb-2" onClick={() => navigate(`/profile/${userId}/${performersData.id}`)} variant="toxic_pink" size={'default'}>Open Hall of Fame</Button>                       
                    </div>
                    )) 
                }
                {performersData[0] == undefined && <h1 className="text-8xl text-white">А Я ДЕВОЧКА С ПЛЕЕРОМ, С ВЕЕРОМ ВЕЧЕРОМ НЕ ХОДИ!!!</h1>}
            </div>   

            
                
            
        </div>                       
    )
}

export default Profile;