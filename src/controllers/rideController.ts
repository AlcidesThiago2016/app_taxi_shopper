import { getDistanceGoogleMaps } from "../utils/googleMaps";

const GOOGLE_MAPS_API_KEY = "AIzaSyARnnPHNtPul1RoSM1k3ipDdrbnxeI1xsQ";

const calculaRideCost = (distance: number): number => {
    const baseFare = 5;
    const perKm = 2;
    return baseFare + distance * perKm;
};

export const estimateRide = async (req: any, res: any): Promise<void> => {
    const { origin, destination, customerId } = req.body;

    if ( !origin || !destination) {
        res.status(400).json({error: "Origem e Destino devem ser preenchidos."});
        return;
    }

    if (!customerId) {
        res.status(400).json({error: "O ID do usuário é obrigatório."});
        return;
    }

    if (origin === destination) {
        res.status(400).json({ error: "Os endereços de origem e destino não podem ser iguais." });
        return;
    }

    try {
        const distance = await getDistanceGoogleMaps(origin, destination, GOOGLE_MAPS_API_KEY);

        if (distance === 0) {
            res.status(404).json({error: "Rota não encontrada ou inválida "});
            return;
        }

        const rideCost = calculaRideCost(distance);

        res.json({
            origin,
            destination,
            customerId,
            distance: `${distance.toFixed(2)} km`,
            cost: `${rideCost.toFixed(2)}`
        });
    } catch (error) {
        res.status(500).json({error})
    }
}