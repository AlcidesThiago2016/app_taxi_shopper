import { getRouteFromGoogleMaps } from "../utils/googleMaps";
import Driver from "../models/Driver";
import Ride from "../models/Ride";
import { Op } from "sequelize";

const GOOGLE_MAPS_API_KEY = "AIzaSyARnnPHNtPul1RoSM1k3ipDdrbnxeI1xsQ";

const calculaRideCost = (distance: number, rate: number): number => {
    return rate * distance;
};

export const estimateRide = async (req: any, res: any): Promise<void> => {
    const {  customer_id ,origin, destination} = req.body;

    // Validações api
    if ( !origin || !destination) {
        res.status(400).json({error: "Origem e Destino devem ser preenchidos."});
        return;
    }

    if (!customer_id) {
        res.status(400).json({error: "O ID do usuário é obrigatório."});
        return;
    }

    if (origin === destination) {
        res.status(400).json({ error: "Os endereços de origem e destino não podem ser iguais." });
        return;
    }

    try {
        // Busca a rota com o detalhes do Google Maps
        const routeDetails = await getRouteFromGoogleMaps(origin, destination, GOOGLE_MAPS_API_KEY);

        // Extração de informações da rota
        const {distance: routeDistance, duration:routeDuration, startLocation, endLocation, googleResponse} = routeDetails;

        if (routeDistance === 0) {
            res.status(404).json({error: "Rota não encontrada ou inválida "});
            return;
        }

        // Faz a Busca dos motoristas que estão disponiveis no Banco de dados.
        const drivers = await Driver.findAll({
            where: {
                minKm: {
                    [Op.lte]: routeDistance, // Retorna os motoristas que aceitam a viagem com no minimo da distancia calculada
                },
            },
        });

        console.log("Motoristas encontrados:", drivers);

        if (drivers.length === 0){
            res.status(404).json({error: "Nenhum motorista esta disponível para a distância solicitada."});
            return;
        }

        // Faz o calculo do custo da viagem de cada motorista
        const driverOptions = drivers.map((driver) => ({
            id: driver.id,
            name: driver.name,
            description: driver.description,
            vehicle: driver.vehicle,
            review: driver.review,
            value: calculaRideCost(routeDistance, driver.value),
        }))
        .sort((a, b) => a.value - b.value); // Faz a ordenação do mais barato

        // Retorna o objeto formatado do google Response
        const routeResponse = {
            startAddress: googleResponse.routes[0]?.legs[0]?.start_address,
            endAddress: googleResponse.routes[0]?.legs[0]?.end_address,
            steps: googleResponse.routes[0]?.legs[0]?.steps.map((step: any) => ({
                instructions: step.html_instructions,
                distance: step.distance.text,
                duration: step.duration.text,
            })),
        };

        // Faz o Retorno do resultado
        res.json({
            origin: {
                latitude: startLocation.latitude,
                longitude: startLocation.longitude,
            },
            destination: {
                latitude: endLocation.latitude,
                longitude: endLocation.longitude,
            },
            distance: routeDistance,
            duration: `${Math.ceil(routeDuration / 60)} min`, // Conversao do tempo para minutos
            options: driverOptions,
            routeResponse,
        });
    } catch (error) {
        res.status(500).json({error})
    }
}

