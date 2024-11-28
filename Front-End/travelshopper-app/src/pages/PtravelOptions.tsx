import React, { useState } from "react";
import OptionsTravel from "../components/OptionsTravel";

const PtravelOptions: React.FC = () => {
    const [options, setOptions] = useState([]);

    const handleSelect = (driverId: number) => {
        console.log(`Motorista selecionado: ${driverId}`);
    };

    return (
        <div>
            <h1>Opções de Viagem</h1>
            <OptionsTravel options={options} onSelect={handleSelect}/>
        </div>
    );
};

export default PtravelOptions;