import { Request, Response } from "express";
import Driver from "../models/Driver";

//Create Driver
export const driverCreate = async (req: Request, res: Response) => {
    try {
        const { name, description, vehicle, review, value, minKm } = req.body;
        const driver = await Driver.create({ name, description, vehicle, review, value, minKm});
        res.status(201).json(driver);
    } catch (error) {
        res.status(500).json({error:"Motorista incluído com sucesso!"})
    }
};

//Search Drivers
export const getDrivers = async (_req: Request, res: Response) => {
    try {
        const drivers = await Driver.findAll();
        res.json(drivers);
    } catch (error) {
        res.status(500).json({error: "Motoristas não encontrados!"})
    }
};

//Search Driver put ID
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

//Update Driver
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

//Delete Driver
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
