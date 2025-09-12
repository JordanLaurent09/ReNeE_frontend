import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type Performer = {
        id: number,
        name: string,
        genre: string,
        country: string,
        image: string
    }

function Profile() {

    

    const { userId } = useParams();

    const navigate = useNavigate();

    const [performersData, setPerformersData] = useState<Performer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                setError(error);
            }
        };
        performersIndexes();
    }, [userId]);

    

    return (
        <div className="m-[auto] flex flex-col justify-between content-center text-white">           
            <div className="m-[auto] w-[50%] flex justify-between">
                { performersData.map(performersData => (
                    <div key={performersData.id}>
                        <p>{performersData.name}</p>
                        <p>{performersData.genre}</p>
                        <p>{performersData.country}</p>
                        <button onClick={() => navigate(`/profile/${userId}/${performersData.name}`)}>Open Hall of Fame</button>
                    </div>
                    )) 
                }
            </div>
        
      
        </div>
        
    )
}

export default Profile;