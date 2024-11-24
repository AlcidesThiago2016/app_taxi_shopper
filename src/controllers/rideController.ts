const calDistance = (origin: string, destination: string): number => {
    const distances : {[key: string]: number} = {
        'São Paulo - Rio de Janeiro': 430,
        'São Paulo - Belo Horizonte': 590,
        'Rio de Janeiro - Belo Horizonte': 440,
    };
    return distances[`${origin} - ${destination}`] || distances[`${destination} - ${origin}`] || 0;
};

const calTripCost = (distance: number): number => {
    const baseFare = 5;
    const perKm = 2;
    return baseFare + distance * perKm;
};

export const estimateRide = (req: any, res: any): void => {
    const { origin, destination } = req.body;

    if (!origin || !destination) {
        res.status(400).json({error: 'Origem e destino são obrigatórios!' });
        return;
    }

    const distance = calDistance(origin, destination);

    if(distance === 0) {
        res.status(404).json({error: 'Rota não encontrada ou inválida!' });
        return;
    }

    const tripCost = calTripCost(distance);

    res.json({
        origin,
        destination,
        distance: `${distance} km`,
        cost: `${tripCost.toFixed(2)}`
    });
};