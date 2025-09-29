import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Album } from "@/types/Album";
import type { Photo } from "@/types/Photo";
import axios from "axios";
import { useEffect, useState } from "react";
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




function HallOfFame() {
    const { userId, performerId } = useParams();
    const navigate = useNavigate();

    const [photos, setPhotos] = useState<Photo[]>([]);
    const [userAlbums, setUserAlbums] = useState<Album[]>([]);
    const [fileContent, setFileContent] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        performerId: Number(performerId),
        year: 0,
        cover: ''
    });
    const [foundAlbums, setFoundAlbums] = useState<Album[]>([]);
    

    const [isAddPhotoFormVisible, setIsAddPhotoFormVisible] = useState(false);
    const [isAddAlbumFormVisible, setIsAddAlbumFormVisible] = useState(false);
    const [isAlbumsListVisible, setIsAlbumListVisible] = useState(false);

    const [jwt, setJwt] = useState<string | undefined>(undefined);

    useEffect(() => {
        const photoArray = async () => {
            try {
                const jwt = Cookies.get('Renee');
                setJwt(jwt);
                await axios.get(`http://localhost:3010/auth/photos?userId=${userId}&performerId=${performerId}`, {headers: {"Authorization": `Bearer ${jwt}`}})
                .then(response => {
                    setPhotos(response.data);                                   
                })
            } catch(error) {
                console.log(error);
            }
        };
        photoArray();
    }, [userId, performerId])


    useEffect(() => {
        const albumsIndexes = async () => {
            try {
                await axios.get(`http://localhost:3010/auth/albums?userId=${userId}&performerId=${performerId}`, {headers: {"Authorization": `Bearer ${jwt}`}})
                .then(response => {
                    axios.get(`http://localhost:3010/albums/favorites/${JSON.stringify(response.data)}`)
                    .then(response => {setUserAlbums(response.data)})
                    .catch(error => {console.log(error)})
                })
                .catch(error => {console.log(error)})
            } catch(error) {
                console.log(error);
            }
        };
        albumsIndexes();
    }, [userId, performerId, jwt]);



    const handleBackToProfile = () => {
        if (jwt) {
            navigate(`/profile/${userId}`);
        }
        else navigate('/');
    }

    const handleFile = (event) => {
        const file = event.target.files[0];
        console.log(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (reader.result) {
                    setFileContent(reader.result as string);
                }
            }
            reader.readAsDataURL(file);
            console.log(fileContent);
        }
    }

    const handleAlbumCoverFile = (event) => {
        const file = event.target.files[0];
        console.log(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (reader.result) {
                    setFormData({
                        ...formData,
                        cover: reader.result as string
                    })
                }
            }
            reader.readAsDataURL(file);
            console.log(fileContent);
        }
    }

    const handlePhotoSubmit = async (event) => {
        event.preventDefault();

        try {
            const res = await axios.post('http://localhost:3010/auth/addPhoto', 
                {
                    performerId: performerId,
                    userId: userId,
                    image: fileContent
                }, {headers: {"Authorization": `Bearer ${jwt}`}}
            );
            console.log(res);
            await axios.get(`http://localhost:3010/auth/photos?userId=${userId}&performerId=${performerId}`, {headers: {"Authorization": `Bearer ${jwt}`}})
                .then(response => {
                setPhotos(response.data);                                   
            })
            setIsAddPhotoFormVisible(false);
        } catch (error) {
            console.log(error);
        }
    }

    const handleRemovePhoto = async (event) => {
        const photoId: number = event.target.value;  
        const photo: Photo | undefined = photos.find(value => value.id == photoId);
        try {
            const res = await axios.delete(`http://localhost:3010/auth/deletePhoto/${photoId}`, {headers: {"Authorization": `Bearer ${jwt}`}});
            console.log(res.data);
            setPhotos(photos.filter((value) => {
                return value != photo
            }));           
        } catch (error) {
            console.log(error);
        }
    }

    const handleAlbumInfo = (event) => {
        const {name, value} = event.target;

        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleAddFavoriteAlbum = async (event) => {
        const choseAlbumId: number = event.target.value;

        try {
            const res = await axios.post('http://localhost:3010/auth/addAlbum', {
                albumid: choseAlbumId,
                userid: userId,
                performerid: performerId
            }, {headers: {"Authorization": `Bearer ${jwt}`}});
            console.log(res.data);

        } catch (error) {
            console.log(error);
        }
        console.log(choseAlbumId);

        try {
                await axios.get(`http://localhost:3010/auth/albums?userId=${userId}&performerId=${performerId}`, {headers: {"Authorization": `Bearer ${jwt}`}})
                .then(response => {
                    axios.get(`http://localhost:3010/albums/favorites/${JSON.stringify(response.data)}`)
                    .then(response => {setUserAlbums(response.data)})
                    .catch(error => {console.log(error)})
                })
                .catch(error => {console.log(error)})
            } catch(error) {
                console.log(error);
            }
    }

    const handleRemoveAlbum = async (event) => {
        const albumId: number = event.target.value;
        const album: Album | undefined = userAlbums.find(album => album.id == albumId);

        try {
            const res = await axios.delete(`http://localhost:3010/auth/deleteAlbum?albumId=${albumId}&userId=${userId}`, {headers: {"Authorization": `Bearer ${jwt}`}});
            console.log(res.data);
            setUserAlbums(userAlbums.filter((value) => {
                return value != album;
            }))
        } catch (error) {
            console.log(error);
        }
    }

    const handleAlbumSubmit = async (event) => {
        event.preventDefault();

        try {
            formData.year = Number(formData.year);
            const res = await axios.post('http://localhost:3010/albums/add', formData);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    const handleFindAllAlbums = async () => {
        try {
            const res = await axios.get(`http://localhost:3010/albums/performer/${performerId}`);
            console.log(res);
            setFoundAlbums(res.data);
            setIsAlbumListVisible(true);
        } catch (error) {
            console.log(error);
        }
    }

    const handleCloseAlbumsList = () => {
        setIsAlbumListVisible(false);
    }

    const handleVisiblePhotoForm = () => {
        if (isAddPhotoFormVisible) {
            setIsAddPhotoFormVisible(false);
        }
        else setIsAddPhotoFormVisible(true);
    }

    const handleVisibleAlbumForm = () => {
        if (isAddAlbumFormVisible) {
            setIsAddAlbumFormVisible(false);
        }
        else setIsAddAlbumFormVisible(true);
    }


    return (
        <div className="m-[auto] w-[100%] flex flex-col items-center text-white bg-[url(/BlueNeonUpstairs.jpg)] bg-size-[cover] bg-no-repeat">

            <div className="m-[auto] mt-12 mb-12 w-[90%] flex flex-col items-center bg-black">
                <div className="m-[auto] mt-10 w-[90%] flex justify-between items-center">
                    <img className="w-[150px]" src="/ReneeLogo.png" alt="Renee logo"/>
                    <Button onClick={handleBackToProfile} variant={'blue_deep'}>Назад</Button>
                </div>
                <h1 className="mt-6 text-6xl text-[#0adada]">ЗАЛ СЛАВЫ</h1>
                
                <div className="m-[auto] mt-8 mb-8 w-[90%] flex flex-col items-center">               
                    <div className="w-[100%] flex justify-between">
                        <div className="w-[5%] h-[650px] mt-6 mr-12 flex flex-col justify-between items-center gap-6 text-[#0adada]">
                            <p className="text-7xl">P</p>
                            <p className="text-7xl">H</p>
                            <p className="text-7xl">O</p>
                            <p className="text-7xl">T</p>
                            <p className="text-7xl">O</p>
                            <p className="text-7xl">S</p>
                        </div>
                        <div className="m-[auto] h-[650px] mt-8 mb-8 w-[90%] flex flex-wrap gap-6">
                        {photos.length > 0 && photos.map((photo, index) => 
                        <div key={index} className="w-[20%] relative rounded-md">
                            <img className="w-[100%] h-[auto] aspect-7/9 rounded-md" src={textToImageConvert(photo.image)} alt="Это фото"/>
                            <Button value={photo.id} onClick={handleRemovePhoto} variant={'ghost'} className="absolute top-0 right-0">X</Button>
                        </div>                     
                        )}

                        {photos.length === 0 && <div className="m-[auto] text-4xl text-[#01528f] text-center items-center">Избранные фотографии отсутствуют</div>}
                        </div>
                    </div>
                

                <Button variant={'blue_deep'} className="mt-20 w-[300px] h-[50px] text-xl" onClick={handleVisiblePhotoForm}>Добавить фото</Button>

                {
                isAddPhotoFormVisible && 
                <form onSubmit={handlePhotoSubmit} className="absolute top-[40%] w-[20%] flex flex-col justify-evenly items-center bg-[#01528f] rounded-md text-[black]" encType="multipart/form-data">                   
                    <div className="m-[auto] relative mt-4 mb-4 flex flex-col justify-between items-center gap-6">
                        <Label className="text-lg">Добавление фотографии</Label>
                        <Input className="border-black" type="file" name="file" id="file" onChange={handleFile} required/>
                        <Button variant={'acid_cyan'} className="w-[60%]" type="submit">Добавить</Button>
                    </div>
                    <button onClick={() => {setIsAddPhotoFormVisible(false)}} className="absolute top-2 right-3 cursor-pointer text-[black]">X</button>
                </form>
                }  
            </div>

            <div className="m-[auto] w-[80%] relative mt-20 mb-8 w-[90%] flex flex-col items-center">
                <div className="w-[60%] flex justify-between gap-6 text-[#0adada]">
                    <p className="text-7xl">A</p>
                    <p className="text-7xl">L</p>
                    <p className="text-7xl">B</p>
                    <p className="text-7xl">U</p>
                    <p className="text-7xl">M</p>
                    <p className="text-7xl">S</p>
                </div>

                <div className="m-[auto] mt-40 mb-8 w-[90%] flex flex-wrap justify-between items-center">
                    {userAlbums !== undefined && userAlbums.map(album => (
                        <div className="m-[auto] mt-4 mb-4 w-[25%] flex flex-col justify-between items-center text-white" key={album.id}>
                            <img className="w-[100%] h-[90%] rounded-md" src={textToImageConvert(album.cover)} alt={album.cover}/>
                            <div className="m-[auto] mt-4 mb-4 w-[100%] flex flex justify-between items-center">
                                <p>{album.title}</p>
                                <p>{album.year}</p>
                                <Button value={album.id} onClick={handleRemoveAlbum} className="text-red-500">X</Button>                                                 
                            </div>                                             
                        </div>
                        )) 
                    }
                    {userAlbums[0] == undefined && <h1 className="m-[auto] text-[#01528f] text-4xl">Избранные альбомы отсутствуют</h1>}
                </div>
         
           
                <div className="m-[auto] mt-40 w-[auto] mt-8 mb-8 flex gap-4">
                    <div className="flex flex-col justify-between items-center">
                        <p className="mt-4 mb-4 text-[#FC74FD] text-xl">Проверьте альбомы исполнителя</p>
                        {!isAlbumsListVisible &&<Button variant={'blue_deep'} onClick={handleFindAllAlbums} className="mt-4 w-[300px] h-[50px] text-xl">Проверить</Button>}
                        {isAlbumsListVisible && <Button variant={'blue_deep'} onClick={handleCloseAlbumsList} className="mt-4 w-[300px] h-[50px] text-xl">Закрыть</Button>}
                    </div>                
                    
                </div>
                
                {
                isAlbumsListVisible &&
                <div className="m-[auto] mt-8 mb-8 w-[90%] flex flex-wrap justify-between">
                    {foundAlbums !== undefined && foundAlbums.map(album => (
                        <div key={album.id} className="m-[auto] mt-4 mb-4 w-[25%] flex flex-col justify-between items-center text-white">
                            <img src={textToImageConvert(album.cover)} alt="album's info"/>
                            <p className="mt-4">Название: {album.title}</p>
                            <p className="mt-4">Год: {album.year}</p>
                            <Button variant={'blue_deep'} className="mt-4" value={album.id} onClick={handleAddFavoriteAlbum}>Add to favorites</Button>
                        </div>
                    ))
                    }
                    {foundAlbums[0] == undefined && <p>Nothing can found</p>}
                </div>
                }

                <div className="m-[auto] flex flex-col justify-between items-center">
                    <p className="mt-4 mb-4 text-[#FC74FD] text-xl">Не нашли нужный альбом? Добавьте его!</p>
                    <Button variant={'blue_deep'} className="mt-4 w-[300px] h-[50px] text-xl" onClick={handleVisibleAlbumForm}>Добавить новый альбом</Button>
                </div>
                {
                isAddAlbumFormVisible && 
                    <form onSubmit={handleAlbumSubmit} className="absolute w-[20%] bottom-[60%] left-[40%] bg-[#01528f] text-[black] rounded-md" encType="multipart/form-data">
                        <div className="m-[auto] relative mt-4 mb-4 flex flex-col justify-between items-center gap-6">
                            <div className="grid gap-2">
                                <label>Введите название альбома</label>
                                <Input className="border-[black]" type="text" name="title" id="title" onChange={handleAlbumInfo} required/>
                            </div>
                            <div className="grid gap-2">
                                <label>Введите год</label>
                                <Input className="border-[black]" type="number" name="year" id="year" onChange={handleAlbumInfo} required/>
                            </div>

                            <div className="grid gap-2">
                                <label htmlFor="">Добавьте обложку</label>
                                <Input className="border-[black]" type="file" name="file" id="file" onChange={handleAlbumCoverFile} required/>
                            </div>
                            <div className="mt-4 mb-4 w-[60%] grid gap-2">
                                <Button variant={'acid_cyan'} type="submit" className="">
                                    Добавить альбом
                                </Button>
                            </div>                          
                        </div>
                        <button onClick={() => {setIsAddAlbumFormVisible(false)}} className="absolute top-2 right-3 cursor-pointer text-[black]">X</button> 
                    </form>
                    }
                </div> 
            </div>                             
        </div>
    );
}

export default HallOfFame;