/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import api from "../api/api";

const PtravelHistory: React.FC = () => {
    const [userId, setUserId] = useState("");
    const [history, setHistory] = useState([]);

    const fetchHistory = async () => {
        try {
            const response = await api.get(`/ride/${userId}`);
            setHistory(response.data.rides || []);
        } catch (error) {
            console.error("Erro ao buscar histórico:", error);
            alert("Não foi possível carregar o histórico. Tente novamente.");
        }
    };

    useEffect(() => {
        if (userId) fetchHistory();
    }, [userId]);

    return (
        <div>
            <h1>Histórico de Viagens</h1>
            <label>
                ID do Usuário:
                <input
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="Digite o ID do usuário"
                />
            </label>
            <button onClick={fetchHistory}>Buscar Histórico</button>

            <ul>
                {history.map((ride: any) => (
                    <li key={ride.id}>
                        <p>Data: {new Date(ride.date).toLocaleString()}</p>
                        <p>Origem: {ride.origin}</p>
                        <p>Destino: {ride.destination}</p>
                        <p>Distância: {ride.distance} km</p>
                        <p>Duração: {ride.duration}</p>
                        <p>Valor: R$ {ride.value.toFixed(2)}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PtravelHistory;
