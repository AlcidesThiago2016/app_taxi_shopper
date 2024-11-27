import React from "react";

interface Option {
    id: number;
    name: string;
    description: string;
    vehicle: string;
    review: { rating: number };
    value: number;
}

interface Props {
    options: Option[];
    onSelect: (driverId: number) => void;
}

const OptionsTravel: React.FC<Props> = ({ options, onSelect }) => {
    return (
        <div>
            <h2>Opções de Viagem</h2>
            <ul>
                { options.map((option) => (
                    <li key={option.id}>
                        <h3>{option.name}</h3>
                        <p>{option.description}</p>
                        <p>Veículo: {option.vehicle}</p>
                        <p>Avaliação: {option.review.rating}</p>
                        <p>Valor: R$ {option.value.toFixed(2)}</p>
                        <button onClick={() => onSelect(option.id)}>Escolher</button>
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default OptionsTravel;