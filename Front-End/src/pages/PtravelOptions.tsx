/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import OptionsTravel from "../components/OptionsTravel";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const PtravelOptions: React.FC = () => {
    const [customerId] = useState("123"); // Simulação
    const [origin] = useState("Av. Paulista, São Paulo, SP");
    const [destination] = useState("Praça da Sé, São Paulo, SP");
    const [distance, setDistance] = useState<number | null>(null);
    const [duration, setDuration] = useState<string | null>(null);
    const [options, setOptions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTravelOptions = async () => {
            try {
                const response = await api.post("/ride/estimate", {
                    customer_id: customerId,
                    origin,
                    destination,
                });

                const { distance, duration, options } = response.data;
                setDistance(distance);
                setDuration(duration);
                setOptions(options);
            } catch (err) {
                console.error("Erro ao carregar opções de viagem:", err);
            }
        };

        fetchTravelOptions();
    }, [customerId, origin, destination]);

    const handleSelect = async (option: any) => {
        try {
            const payload = {
                customer_id: customerId,
                origin,
                destination,
                distance,
                duration,
                driver: {
                    id: option.id,
                    name: option.name,
                },
                value: option.value,
                onSelect:{handleSelect},
            };

            console.log("Confirmando a viagem com:", payload);

            await api.patch("/ride/confirm", payload);

            navigate("/history");
        } catch (err) {
            console.error("Erro ao confirmar a viagem:", err);
            alert("Erro ao confirmar a viagem. Tente novamente.");
        }
    };

    return (
        <div>
            <h1>Opções de Viagem</h1>
            {distance && duration && (
                <OptionsTravel
                    customerId={customerId}
                    origin={origin}
                    destination={destination}
                    distance={distance}
                    duration={duration}
                    options={options}
                    onSelect={handleSelect} // Passa a função para confirmar a viagem
                />
            )}
        </div>
    );
};

export default PtravelOptions;
