import { Router } from "express";
import { calcTrip } from '../controllers/tripController';

const router = Router();

router.post('/estimate', calcTrip);

export default router;

