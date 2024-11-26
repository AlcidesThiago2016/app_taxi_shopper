import { Router } from "express";
import { deleteDriver, driverCreate, getDrivers, getDriversId, updateDriver } from "../controllers/driverController";

const router = Router();

router.post("/", driverCreate);
router.get("/", getDrivers);
router.get("/:id", getDriversId);
router.put(":/id", updateDriver);
router.delete(":/id", deleteDriver);

export default router;