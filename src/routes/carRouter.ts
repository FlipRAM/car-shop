import { Router } from 'express';
import CarControllers from '../controllers/CarControllers';
import CarServices from '../services/CarServices';
import CarModel from '../models/CarModel';

const carModel = new CarModel();
const carServices = new CarServices(carModel);
const carControllers = new CarControllers(carServices);

const carRouter = Router();

carRouter.get('/', (req, res) => carControllers.list(req, res));
carRouter.get('/:id', (req, res) => carControllers.listOne(req, res));
carRouter.post('/', (req, res) => carControllers.create(req, res));
carRouter.put('/:id', (req, res) => carControllers.update(req, res));
carRouter.delete('/:id', (req, res) => carControllers.delete(req, res));

export default carRouter;