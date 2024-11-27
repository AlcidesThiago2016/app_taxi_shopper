import React, { useState } from "react";

interface Props {
    onEstimate: (data: any) => void;
    onError: (error: string) => void;
}

const FormTravel: React.FC<Props> = ({onEstimate, onError }) => {
    const [userId, setUserId] = useState("");
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/ride/estimate", {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({ customer_id: userId, origin, destination}),
            });

            if (!response.ok) throw new Error("Não foi possível estimar a viagem.");

            const data = await response.json();
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