import React, { useState } from "react"
import FormTravel from "../components/FormTravel";

const PtravelRequest: React.FC = () => {
    const [error, setError] = useState<string | null>(null);

    const handleEstimate = (data: any) => {
        console.log("Estimativa recebida: ", data);
    };

    const handleError = (error: string) => {
        setError(error);
    };

    return (
        <div>
            <h1>Solicitação de Viagem</h1>
            {error && <p style={{color: "red"}}>{error}</p>}
            <FormTravel onEstimate={handleEstimate} onError={handleError}/>
        </div>
    );
};

export default PtravelRequest;