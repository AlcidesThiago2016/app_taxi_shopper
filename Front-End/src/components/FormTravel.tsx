import React, { useState } from "react";
import { estimateRide } from "../api/api";

interface Props {
    onEstimate: (data: unknown) => void;
    onError: (error: string) => void;
}

const FormTravel: React.FC<Props> = ({onEstimate, onError }) => {
    const [userId, setUserId] = useState("");
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = await estimateRide(userId, origin, destination);
            onEstimate(data);
        
        } catch (error) {
            onError("Não foi possível fazer o calculo da estimativa, tente novamente.")
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                ID USUÁRIO:
                <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} required />
            </label>
            <label>
                ORIGEM:
                <input type="text" value={origin} onChange={(e) => setOrigin(e.target.value)} required />
            </label>
            <label>
                DESTINO:
                <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} required />
            </label>
            <button type="submit">Estimar Viagem</button>
        </form>
    )
}

export default FormTravel; 