import { getDistanceGoogleMaps } from "../utils/googleMaps";
import Driver from "../models/Driver";
import { Op } from "sequelize";

const GOOGLE_MAPS_API_KEY = "AIzaSyARnnPHNtPul1RoSM1k3ipDdrbnxeI1xsQ";

const calculaRideCost = (distance: number, rate: number): number => {
    return rate * distance;
};

export const estimateRide = async (req: any, res: any): Promise<void> => {
    const { origin, destination, customerId } = req.body;

    // Validações api
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
        // Captura a distancia da rota
        const distance = await getDistanceGoogleMaps(origin, destination, GOOGLE_MAPS_API_KEY);

        if (distance === 0) {
            res.status(404).json({error: "Rota não encontrada ou inválida "});
            return;
        }

        // Faz a Busca dos motoristas que estão disponiveis no Banco de dados.
        const drivers = await Driver.findAll({
            where: {
                minKm: {
                    [Op.lte]: distance, // Retorna os motoristas que aceitam a viagem com no minimo da distancia calculada
                },
            },
        });

        if (drivers.length === 0){
            res.status(404).json({error: "Nenhum motorista esta disponível para a distância solicitada."});
            return;
        }

        // Faz o calculo do custo da viagem de cada motorista
        const driverOptions = drivers.map((driver) => ({
            driverId: driver.id,
            name: driver.name,
            car: driver.car,
            rating: driver.rating,
            cost: `R$ ${calculaRideCost(distance, driver.rate).toFixed(2)}`,
        }));

        // Faz o Retorno do resultado
        res.json({
            origin,
            destination,
            distance: `${distance.toFixed(2)} km`,
            availableDrivers: driverOptions,
        });
    } catch (error) {
        res.status(500).json({error})
    }
}