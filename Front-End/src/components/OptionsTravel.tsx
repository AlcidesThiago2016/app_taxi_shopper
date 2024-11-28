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
    customerId: string;
    origin: string;
    destination: string;
    distance: number;
    duration: string;
    options: Option[];
    onSelect: (option: Option) => void;
}

const OptionsTravel: React.FC<Props> = ({
    customerId,
    origin,
    destination,
    distance,
    duration,
    options,
    onSelect,
}) => {
    console.log("Propriedade onSelect recebida no filho:", onSelect);
    return (
        <div>
            <h2>Detalhes da Viagem</h2>
            <p>ID do Cliente: {customerId}</p>
            <p>Origem: {JSON.stringify(origin)}</p>
            <p>Destino: {JSON.stringify(destination)}</p>
            <p>Distância: {distance} km</p>
            <p>Duração: {duration}</p>

            <h3>Motoristas Disponíveis</h3>
            <ul>
                {options.map((option) => (
                    <li key={option.id}>
                        <h4>{option.name}</h4>
                        <p>{option.description}</p>
                        <p>Veículo: {option.vehicle}</p>
                        <p>Avaliação: {option.review.rating}</p>
                        <p>Valor: R$ {option.value.toFixed(2)}</p>
                        <button onClick={() => onSelect(option)}>Escolher</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OptionsTravel;

