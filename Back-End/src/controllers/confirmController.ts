import { Request, Response } from "express";
import Ride from "../models/Ride";
import Driver from "../models/Driver";

export const confirmRide = async (req: Request, res: Response): Promise<void> => {
    try {
        const { customer_id, origin, destination, distance, duration, driver, value } = req.body;

        // Validações
        if (!origin || !destination) {
            res.status(400).json({
                error_code: "INVALID_DATA",
                error_description: "Os endereços de origem e destino são obrigatórios.",
            });
            return;
        }

        if (!customer_id) {
            res.status(400).json({
                error_code: "INVALID_DATA",
                error_description: "O ID do cliente não pode estar em branco.",
            });
            return;
        }

        if (origin === destination) {
            res.status(400).json({
                error_code: "INVALID_DATA",
                error_description: "Os endereços de origem e destino não podem ser iguais.",
            });
            return;
        }

        if (!driver || !driver.id || !driver.name) {
            res.status(400).json({
                error_code: "INVALID_DATA",
                error_description: "Os dados do motorista devem ser informados e válidos.",
            });
            return;
        }

        // Verifica se o motorista informado é válido
        const validDriver = await Driver.findByPk(driver.id);
        if (!validDriver) {
            res.status(400).json({
                error_code: "INVALID_DATA",
                error_description: "O motorista selecionado não é válido.",
            });
            return;
        }

        // Verifica se a distância é válida para o motorista selecionado
        if (distance < validDriver.minKm) {
            res.status(400).json({
                error_code: "INVALID_DATA",
                error_description: `A quilometragem informada está abaixo do limite mínimo aceito pelo motorista (${validDriver.minKm} km).`,
            });
            return;
        }

        // Salva a viagem no banco de dados
        await Ride.create({
            userId: customer_id,
            origin,
            destination,
            driverId: driver.id,
            distance,
            cost: value,
        });

        // Retorna sucesso
        res.status(200).json({
            message: "Viagem confirmada com sucesso.",
        });
    } catch (error) {
        res.status(500).json({
            error_code: "SERVER_ERROR",
            error_description: "Erro ao confirmar a viagem.",
        });
    }
};
