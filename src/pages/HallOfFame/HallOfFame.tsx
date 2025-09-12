import { useParams } from "react-router-dom";

function HallOfFame() {
    const { userId, performerName } = useParams();



    return (
        <div>
            Привет
        </div>
    );
}

export default HallOfFame;