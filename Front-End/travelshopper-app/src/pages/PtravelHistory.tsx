import React, { useId, useState } from "react";
import HistoryTravel from "../components/HistoryTravel";

const PtravelHistory: React.FC = () => {
    const [history, setHistory] = useState([]);

    const handleFilter = (userId: string, driverId: string | null) => {
        console.log("Filtrando histórico:", {userId, driverId});
    };

    return (
        <div>
            <h1>Histórico de Viagens</h1>
            <HistoryTravel onFilter={handleFilter} />
        </div>
    );
};

export default PtravelHistory;