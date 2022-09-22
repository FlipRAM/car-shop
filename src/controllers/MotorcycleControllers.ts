import { Request, Response } from 'express';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import { IService } from '../interfaces/IService';

export default class MotorcycleControllers {
  constructor(private motoService: IService<IMotorcycle>) {}

  public async create(req: Request, res: Response): Promise<Response | void> {
    const result = await this.motoService.create(req.body);

    return res.status(201).json(result);
  }

  public async list(_req: Request, res: Response): Promise<Response | void> {
    const results = await this.motoService.list();

    return res.status(200).json(results);
  }

  public async listOne(req: Request, res: Response): Promise<Response | void> {
    const result = await this.motoService.listOne(req.params.id);

    if (!result) return res.status(404).json({ error: 'Object not found' });

    return res.status(200).json(result);
  }

  public async update(req: Request, res: Response): Promise<Response | void> {
    const result = await this.motoService.update(req.params.id, req.body);

    return res.status(200).json(result);
  }

  public async delete(req: Request, res: Response): Promise<Response | void> {
    await this.motoService.delete(req.params.id);

    return res.status(204).json();
  }
}