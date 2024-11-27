import { Router } from "express";
import { confirmRide, ridesByCustomer } from "../controllers/confirmController";

const router = Router();

router.patch("/confirm", confirmRide);
router.get("/:customer_id", ridesByCustomer);

export default router;
