import React, { useState } from "react";

interface Props {
    onFilter: (userId: string, driverId: string | null) => void;
}

const HistoryTravel: React.FC<Props> = ({ onFilter }) => {
    const [userId, setUserId] = useState("");
    const [driverId, setDriverId] = useState("");

    const handleFilter = () => {
        onFilter(userId, driverId || null);
    };

    return (
        <div>
            <label>
                ID DO USUÁRIO:
                <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
            </label>
            <label>
                MOTORISTA:
                <select value={driverId} onChange={(e) => setDriverId(e.target.value)}>
                    <option value="">Todos</option>
                    <option value="1">Joao Silva</option>
                    <option value="2">Maria dos Santos</option>
                </select>
            </label>
            <button onClick={handleFilter}>Filtrar</button>
        </div>
    );
};

export default HistoryTravel;