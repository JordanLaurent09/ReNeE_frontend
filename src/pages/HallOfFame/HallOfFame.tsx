import { Button } from "@/components/ui/button";
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

type Album = {
    id: number,
    title: string,
    year: number,
    cover: string
}

function HallOfFame() {
    const { userId, performerId } = useParams();


    const [photos, setPhotos] = useState<string[]>([]);
    const [userAlbums, setUserAlbums] = useState<Album[]>([]);
    const [fileContent, setFileContent] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        performerId: Number(performerId),
        year: 0,
        cover: ''
    });

    const [isAddPhotoFormVisible, setIsAddPhotoFormVisible] = useState(false);
    const [isAddAlbumFormVisible, setIsAddAlbumFormVisible] = useState(false);

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

    const handleAlbumInfo = (event) => {
        const {name, value} = event.target;

        setFormData({
            ...formData,
            [name]: value
        })
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

    /* const [form, setForm] = useState({
        title: '',
        performerId: Number(performerName),
        year: 0,
        path: '',
        file: null

    });

    const [file, setFile] = useState<File|null>(null);

    const handleSongInfoChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;    
        setForm({
            ...form,
            [name]: value
        })
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
            console.log(file);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();      

        const formData = new FormData(event.target.form);
        formData.append('title', form.title);
        formData.append('performerId', String(form.performerId));
        formData.append('year', String(form.year));
        formData.append('path', form.path);
        formData.append('file', file!);

        console.log(formData);
       

        const res = await axios.post('http://localhost:3010/songs/add',  formData);
        console.log(res);
       
    } */

    return (
        <div className="m-[auto] w-[100%] flex flex-col items-center text-white">
            <h1>HALL OF FAME</h1>
            <div className="m-[auto] mt-8 mb-8 w-[90%] flex flex-col items-center">
                <h2>Photos</h2>
                
                <div className="m-[auto] mt-8 mb-8 w-[90%] flex flex-wrap justify-between">
                    {photos.length > 0 && photos.map((photo, index) => 
                   
                      <img key={index} className="w-[20%] h-[auto] aspect-7/9 rounded-md" src={textToImageConvert(photo)} alt="Это фото"/>
                   )}

                {photos.length === 0 && <div className="text-8xl">You don't have favorites photos yet</div>}
                </div>

                <Button onClick={handleVisiblePhotoForm}>Add new photo</Button>

                {
                isAddPhotoFormVisible && 
                <form onSubmit={handlePhotoSubmit} className="flex flex-col" encType="multipart/form-data">                   
                    <input type="file" name="file" id="file" onChange={handleFile}/>
                    <button type="submit">Add photo</button>
                </form>
                }  
            </div>

            <div className="m-[auto] mt-8 mb-8 w-[90%] flex flex-col items-center">
                <h2>Albums</h2>

                <div className="m-[auto] mt-8 mb-8 w-[90%] flex flex-wrap justify-between">
                    {userAlbums !== undefined && userAlbums.map(albums => (
                        <div className="m-[auto] mt-4 mb-4 w-[25%] flex flex-col justify-between items-center text-white" key={albums.id}>
                            <img className="w-[100%] h-[90%] rounded-md" src={textToImageConvert(albums.cover)} alt={albums.cover}/>
                            <div className="m-[auto] mt-4 mb-4 w-[100%] flex flex justify-between items-center">
                                <p>{albums.title}</p>                                                 
                            </div>                                             
                        </div>
                        )) 
                    }
                    {userAlbums[0] == undefined && <h1 className="text-8xl">You don't have favorites albums yet</h1>}
                </div>

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

            {/* <div>
                <h2>Songs</h2>
                <form className="flex flex-col" onSubmit={handleSubmit} encType="multipart/form-data" method="POST">
                    <label htmlFor="">Add song title</label>
                    <input type="text" name="title" id="title" value={form.title} onChange={handleSongInfoChange}/>
                    <label htmlFor="">Add year</label>
                    <input type="number" name="year" id="year" value={form.year} onChange={handleSongInfoChange}/>
                    <label htmlFor="">Upload music file</label>
                    <input type="file" accept="audio/*" name="file" id="file" onChange={handleFileChange}/>
                    <button type="submit">Add song</button>
                </form>
            </div> */}
            
        </div>
    );
}

export default HallOfFame;