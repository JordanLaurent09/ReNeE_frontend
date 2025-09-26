import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Album } from "@/types/Album";
import type { Photo } from "@/types/Photo";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

    useEffect(() => {
        const photoArray = async () => {
            try {
                await axios.get(`http://localhost:3010/users/photos?userId=${userId}&performerId=${performerId}`)
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
                await axios.get(`http://localhost:3010/users/albums?userId=${userId}&performerId=${performerId}`)
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
    }, [userId, performerId]);


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
            const res = await axios.post('http://localhost:3010/users/newPhoto', 
                {
                    performerId: performerId,
                    userId: userId,
                    image: fileContent
                }
            );
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    const handleRemovePhoto = async (event) => {
        const photoId: number = event.target.value;  
        const photo: Photo | undefined = photos.find(value => value.id == photoId);
        try {
            const res = await axios.delete(`http://localhost:3010/users/deletePhoto/${photoId}`);
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
            const res = await axios.post('http://localhost:3010/users/newAlbum', {
                albumid: choseAlbumId,
                userid: userId,
                performerid: performerId
            });
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
        console.log(choseAlbumId);
    }

    const handleRemoveAlbum = async (event) => {
        const albumId: number = event.target.value;
        const album: Album | undefined = userAlbums.find(album => album.id == albumId);

        try {
            const res = await axios.delete(`http://localhost:3010/users/deleteAlbum/${albumId}`);
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
        <div className="m-[auto] w-[100%] flex flex-col items-center text-white">
            <h1 className="mt-10 text-4xl">HALL OF FAME</h1>
            <div className="m-[auto] mt-8 mb-8 w-[90%] flex flex-col items-center">               
                <div className="w-[100%] flex justify-between">
                    <div className="w-[5%] h-[650px] mt-6 mr-12 flex flex-col justify-between items-center gap-6">
                        <p className="text-7xl">P</p>
                        <p className="text-7xl">H</p>
                        <p className="text-7xl">O</p>
                        <p className="text-7xl">T</p>
                        <p className="text-7xl">O</p>
                        <p className="text-7xl">S</p>
                    </div>
                    <div className="m-[auto] h-[650px] mt-8 mb-8 w-[90%] flex flex-wrap gap-6 overflow-y-scroll">
                    {photos.length > 0 && photos.map((photo, index) => 
                      <div key={index} className="w-[20%] relative rounded-md">
                        <img className="w-[100%] h-[auto] aspect-7/9 rounded-md" src={textToImageConvert(photo.image)} alt="Это фото"/>
                        <Button value={photo.id} onClick={handleRemovePhoto} variant={'ghost'} className="absolute top-0 right-0">X</Button>
                      </div>
                      
                   )}

                    {photos.length === 0 && <div className="m-[auto] text-4xl text-center items-center">You don't have favorite photos yet</div>}
                    </div>
                </div>
                

                <Button className="mt-20 w-[300px] h-[50px] text-xl" onClick={handleVisiblePhotoForm}>Add new photo</Button>

                {
                isAddPhotoFormVisible && 
                <form onSubmit={handlePhotoSubmit} className="absolute top-[50%] w-64 h-32 flex flex-col justify-evenly items-center bg-white border text-black" encType="multipart/form-data">                   
                    <Input type="file" name="file" id="file" onChange={handleFile}/>
                    <Button className="w-[60%]" type="submit">Add photo</Button>
                </form>
                }  
            </div>

            <div className="m-[auto] mt-8 mb-8 w-[90%] flex flex-col items-center">
                <h2>Albums</h2>

                <div className="m-[auto] mt-8 mb-8 w-[90%] flex flex-wrap justify-between items-center">
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
                    {userAlbums[0] == undefined && <h1 className="m-[auto] text-4xl">You don't have favorites albums yet</h1>}
                </div>
         
           
                <div className="m-[auto] w-[auto] mt-8 mb-8 flex gap-4">
                    <Label>Check performer albums</Label>
                    <Button onClick={handleFindAllAlbums} className="w-[25%]">Check</Button>
                    {isAlbumsListVisible && <Button onClick={handleCloseAlbumsList} className="w-[25%]">Close</Button>}
                </div>
                
                {
                isAlbumsListVisible &&
                <div className="m-[auto] mt-8 mb-8 w-[90%] flex flex-wrap justify-between">
                    {foundAlbums !== undefined && foundAlbums.map(album => (
                        <div key={album.id} className="m-[auto] mt-4 mb-4 w-[25%] flex flex-col justify-between items-center text-white">
                            <img src={textToImageConvert(album.cover)} alt="album's info"/>
                            <p>{album.title}</p>
                            <p>{album.year}</p>
                            <Button value={album.id} onClick={handleAddFavoriteAlbum}>Add to favorites</Button>
                        </div>
                    ))
                    }
                    {foundAlbums[0] == undefined && <p>Nothing can found</p>}
                </div>
                }
                  
                <h3>Cannot find your favorite album? Add it by yourself!</h3>

                <Button onClick={handleVisibleAlbumForm}>Add new album</Button>

                {
                isAddAlbumFormVisible && 
                    <form onSubmit={handleAlbumSubmit} className="flex flex-col" encType="multipart/form-data">
                    <label>Add album title</label>
                    <input type="text" name="title" id="title" onChange={handleAlbumInfo}/>
                    <label>Add year</label>
                    <input type="number" name="year" id="year" onChange={handleAlbumInfo}/>
                    <input type="file" name="file" id="file" onChange={handleAlbumCoverFile}/>
                    <button type="submit">Add album</button>
                </form>
                }
            </div>                      
        </div>
    );
}

export default HallOfFame;