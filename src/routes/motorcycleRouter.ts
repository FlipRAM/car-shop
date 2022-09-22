import { Router } from 'express';
import MotorcycleControllers from '../controllers/MotorcycleControllers';
import MotorcycleServices from '../services/MotorcycleServices';
import MotorcycleModel from '../models/MotorcycleModel';

const motorcycleModel = new MotorcycleModel();
const motorcycleServices = new MotorcycleServices(motorcycleModel);
const motorcycleControllers = new MotorcycleControllers(motorcycleServices);

const motorcycleRouter = Router();

motorcycleRouter.get('/', (req, res) => motorcycleControllers.list(req, res));
motorcycleRouter.get('/:id', (req, res) => motorcycleControllers.listOne(req, res));
motorcycleRouter.post('/', (req, res) => motorcycleControllers.create(req, res));
motorcycleRouter.put('/:id', (req, res) => motorcycleControllers.update(req, res));
motorcycleRouter.delete('/:id', (req, res) => motorcycleControllers.delete(req, res));

export default motorcycleRouter;