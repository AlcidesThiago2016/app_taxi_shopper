import React, { useState } from "react";
import TravelForm from "../components/FormTravel";
import TravelOptions from "../components/OptionsTravel";

const PtravelRequest: React.FC = () => {
    const [options, setOptions] = useState<any | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleEstimate = (data: any) => {
        setOptions(data);
        setError(null);
    };

    const handleError = (error: string) => {
        setError(error);
    };

    return (
        <div>
            <h1>Solicitação de Viagem</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {!options && <TravelForm onEstimate={handleEstimate} onError={handleError} />}
            {options && 
                <TravelOptions 
                    customerId={options.customer_Id} 
                    origin={options.origin} 
                    destination={options.destination} 
                    distance = {options.distance}
                    duration= {options.duration}
                    options={options.options} 
                />}
        </div>
    );
};

export default PtravelRequest;
