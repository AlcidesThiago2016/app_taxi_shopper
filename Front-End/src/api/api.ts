import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 5000,
});

export const estimateRide = async (customer_id: string, origin: string, destination: string) => {
    const response = await api.post("/ride/estimate", { customer_id, origin, destination });
    return response.data;
};

export const confirmRide = async (data: unknown) => {
    const response = await api.patch("/ride/confirm", data);
    return response.data;
};

export const getRides = async (customer_id: string, driver_id: string | null) => {
    const query = driver_id ? `?driver_id=${driver_id}` : "";
    const response = await api.get(`/ride/${customer_id}${query}`);
    return response.data;
};

export default api;