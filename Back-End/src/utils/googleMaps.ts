import { Client } from "@googlemaps/google-maps-services-js";

const client = new Client({});

export const getRouteFromGoogleMaps = async (
    origin: string,
    destination: string,
    apiKey: string
): Promise<{
    distance: number;
    duration: number;
    startLocation: { latitude: number; longitude: number };
    endLocation: { latitude: number; longitude: number };
    googleResponse: any;
}> => {
    try {
        const response = await client.directions({
            params: {
                origin,
                destination,
                key: apiKey,
            },
        });

        const leg = response.data.routes[0]?.legs[0];
        if (!leg) throw new Error("Rota não encontrada.");

        const distanceInMeters = leg.distance?.value || 0;
        const durationInSeconds = leg.duration?.value || 0;

        return {
            distance: distanceInMeters / 1000,
            duration: durationInSeconds,
            startLocation: {
                latitude: leg.start_location.lat,
                longitude: leg.start_location.lng,
            },
            endLocation: {
                latitude: leg.end_location.lat,
                longitude: leg.end_location.lng,
            },
            googleResponse: response.data,
        };
    } catch (error) {
        console.error("Erro ao obter rota do Google Maps:", error);
        throw new Error("Falha ao calcular a rota. Verifique os dados fornecidos.");
    }
};
