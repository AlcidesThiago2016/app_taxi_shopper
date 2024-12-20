import { Response } from "express";

export const handleValidationError = (res: Response, description: string): void => {
    res.status(400).json({
        error_code: "INVALID_DATA",
        error_description: description,
    });
};
