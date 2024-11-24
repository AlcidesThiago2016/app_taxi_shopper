import express, { Application } from 'express';
import tripRoutes from './routes/tripRoutes';

const app: Application = express();

app.use(express.json());

app.use('/ride', tripRoutes);

export default app;