import { ImageContainer } from "@/components/ImageContainer";
import { RegisterForm } from "@/components/RegisterForm";
import { useNavigate } from "react-router-dom";

function Register() {

    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/');
    }

    return (
        <div className="flex">
            <ImageContainer image="NeonDating.jpg"/>
            <RegisterForm goToHome={goToHome}/>
        </div>
        
    )
}

export default Register;