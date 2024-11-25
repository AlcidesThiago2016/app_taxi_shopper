import { Client } from "@googlemaps/google-maps-services-js";

const client = new Client({});

export const getDistanceGoogleMaps = async (
    origin: string,
    destination: string,
    apiKey: string
): Promise<number> => {
    try {
        const response = await client.distancematrix({
            params: {
                origins: [origin],
                destinations: [destination],
                key: apiKey,
            },
        });

        const distanceMeters = 
            response.data.rows[0]?.elements[0]?.distance?.value || 0;

        return distanceMeters / 1000;
    } catch (error){
        console.log("Não foi possível obter a distância do Google Maps: ", error);
        throw new Error("Não foi possível calcular a distância. Revise os dados fornecedos.")
    }
}