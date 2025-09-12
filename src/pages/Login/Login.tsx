import { LoginForm } from "@/components/LoginForm";
import { ImageContainer } from "@/components/ImageContainer";
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const goToProfile = (userId: number) => {
        navigate(`/profile/${userId}`)
    }

    const goToHome = () => {
        navigate('/');
    }

    return (
        <div className="flex">
            <ImageContainer image="NeonStreet.jpg"/>
            <LoginForm goToProfile={goToProfile} goToHome={goToHome}/>         
        </div>
        
    )
}

export default Login;