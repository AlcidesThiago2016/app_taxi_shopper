import { Request, Response } from "express";
import Ride from "../models/Ride";
import Driver from "../models/Driver";

export const confirmRide = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, origin, destination, driverId, distance, cost } = req.body;

        if (!origin || !destination) {
            res.status(400).json({
                error_code: "INVALID_DATA",
                error_description: "Endereço Origem e Destino são obrigatórios."
            });
            return;
        }

        if (!driverId) {
            res.status(400).json({
                error_code: "INVALID_DATA",
                error_description: "Necessário um motorista."
            });
            return;
        }

        const driver = await Driver.findByPk(driverId);
        if (!driver) {
            res.status(400).json({
                error_code: "INVALID_DATA",
                error_description: "O motorista selecionado não é válido."
            });
            return;
        }

        if (distance < driver.minKm) {
            res.status(400).json({
                error_code: "INVALID_DATA",
                error_description: `A quilometragem informada está abaixo do limite mínimo aceito pelo motorista (${driver.minKm} km).`,
            });
            return;
        }

        await Ride.create({
            userId,
            origin,
            destination,
            driverId,
            distance,
            cost,
        });

        res.status(200).json({
            message: "Viagem confirmada com sucesso."
        });
    }catch (error) {
        res.status(500).json({
            error_code: "SERVER_ERROR",
            error_description: "Erro ao confirmar a viagem.",
        });
    }
}