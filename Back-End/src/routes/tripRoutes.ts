import { Router } from "express";
import { estimateRide } from '../controllers/rideController';

const router = Router();

router.post('/estimate', estimateRide);

export default router;

