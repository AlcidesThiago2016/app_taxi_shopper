import { Request, Response } from "express";
import Driver from "../models/Driver";
import { handleValidationError } from "../utils/errorHandler";

export const driverCreate = async (req: Request, res: Response) => {
    try {
        const { name, description, vehicle, review, value, minKm } = req.body;

        if (!name || !description || !vehicle || !review || !value || !minKm){
            handleValidationError(res, "Os dados fornecidos no corpo da requisição são inválidos");
            return;
        }
        const driver = await Driver.create({ name, description, vehicle, review, value, minKm});
        res.status(201).json(driver);
    } catch (error) {
        res.status(500).json({
            error_code: "SERVER_ERROR",
            error_description: "Erro ao criar na criação do motorista!."
        })
    }
};

export const getDrivers = async (_req: Request, res: Response) => {
    try {
        const drivers = await Driver.findAll();
        res.json(drivers);
    } catch (error) {
        res.status(500).json({error: "Motoristas não encontrados!"})
    }
};

export const getDriversId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const driver = await Driver.findByPk(id);
        if (!id){
            res.status(404).json({error: "Motorista não localizado."})
        } else {
            res.json(driver);
        }
    } catch (error) {
        res.status(500).json({error: "Erro na busca de motorista."})
    }
};

export const updateDriver = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, description, vehicle, review, value, minKm } = req.body;
        const driver = await Driver.findByPk(id);

        if (!driver) {
            res.status(404).json({error: "Motorista não localizado."})
        } else {
            await driver.update({name, description, vehicle, review, value, minKm});
            res.json(driver);
        }
    } catch (error) {
        res.status(500).json({error: "Não foi possível atualizar o motorista"});
    }
};

export const deleteDriver = async ( req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const driver = await Driver.findByPk(id);

        if (!driver) {
            res.status(404).json({error: "Motorista não localizado."})
        } else {
            await driver.destroy();
            res.json({message: "Motorista foi excluído com sucesso!"})
        }
    } catch (error) {
        res.status(500).json({error: "Não foi possível excluir o motorista"});
    }
}
