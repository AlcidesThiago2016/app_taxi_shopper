import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

interface Option {
    id: number;
    name: string;
    description: string;
    vehicle: string;
    review: { rating: number };
    value: number;
}

const TravelOptionsPage: React.FC = () => {
    const [customerId] = useState("123"); // Simulação para teste
    const [origin] = useState("Av. Paulista, São Paulo, SP"); // Simulação para teste
    const [destination] = useState("Praça da Sé, São Paulo, SP"); // Simulação para teste
    const [distance, setDistance] = useState<number | null>(null);
    const [duration, setDuration] = useState<string | null>(null);
    const [options, setOptions] = useState<Option[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    // Carrega as opções de viagem do BackEnd
    useEffect(() => {
        const fetchTravelOptions = async () => {
            try {
                const response = await api.post("/ride/estimate", {
                    customer_id: customerId,
                    origin,
                    destination,
                });

                // Atualiza estado com os dados retornados do BackEnd
                const { distance, duration, options } = response.data;
                setDistance(distance);
                setDuration(duration);
                setOptions(options);
                setLoading(false);
            } catch (err) {
                console.error("Erro ao buscar estimativa de viagem:", err);
                setError("Não foi possível carregar as opções de viagem. Tente novamente.");
                setLoading(false);
            }
        };

        fetchTravelOptions();
    }, [customerId, origin, destination]);

    // Confirma a viagem com o motorista selecionado
    const handleSelect = async (option: Option) => {
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
            };

            console.log("Enviando payload para confirmação:", payload);

            await api.patch("/ride/confirm", payload);

            navigate("/history");
        } catch (err) {
            console.error("Erro ao confirmar a viagem:", err);
            alert("Erro ao confirmar a viagem. Verifique os dados e tente novamente.");
        }
    };

    if (loading) {
        return <p>Carregando opções de viagem...</p>;
    }

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }

    return (
        <div>
            <h1>Opções de Viagem</h1>
            <h2>Detalhes da Viagem</h2>
            <p>ID do Cliente: {customerId}</p>
            <p>Origem: {origin}</p>
            <p>Destino: {destination}</p>
            {distance && duration && (
                <>
                    <p>Distância: {distance} km</p>
                    <p>Duração: {duration}</p>
                </>
            )}

            <h3>Motoristas Disponíveis</h3>
            <ul>
                {options.map((option) => (
                    <li key={option.id}>
                        <h4>{option.name}</h4>
                        <p>{option.description}</p>
                        <p>Veículo: {option.vehicle}</p>
                        <p>Avaliação: {option.review.rating}</p>
                        <p>Valor: R$ {option.value.toFixed(2)}</p>
                        <button onClick={() => handleSelect(option)}>Escolher</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TravelOptionsPage;
