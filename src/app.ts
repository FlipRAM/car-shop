import express from 'express';
import 'express-async-errors';
import errorMiddleware from './middlewares/ErrorMiddleware';
import carRouter from './routes/carRouter';
import motorcycleRouter from './routes/motorcycleRouter';

const app = express();

app.use(express.json());

app.use('/cars', carRouter);

app.use('/motorcycles', motorcycleRouter);

app.use(errorMiddleware);

export default app;
