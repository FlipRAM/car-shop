import { IMotorcycle, motorcycleSchema } from '../interfaces/IMotorcycle';
import { IModel } from '../interfaces/IModel';
import { IService } from '../interfaces/IService';
import ErrorHandler from '../utils/ErrorHandler';

class MotorcycleServices implements IService<IMotorcycle> {
  static MIN_ID_LENGTH = 24;
  private motoModel: IModel<IMotorcycle>;
  
  constructor(model: IModel<IMotorcycle>) {
    this.motoModel = model;
  }

  public async create(obj: IMotorcycle): Promise<IMotorcycle> {
    const validObj = motorcycleSchema.safeParse(obj);

    if (!validObj.success) throw new ErrorHandler(400, 'Invalid Object');

    return this.motoModel.create(obj);
  }

  public async list(): Promise<IMotorcycle[]> {
    return this.motoModel.read();
  }

  public async listOne(_id: string): Promise<IMotorcycle | null> {
    if (_id.length < MotorcycleServices.MIN_ID_LENGTH) {
      throw new ErrorHandler(400, 'Id must have 24 hexadecimal characters');
    }

    const motoMatch = this.motoModel.readOne(_id);

    return motoMatch;
  }

  public async update(_id: string, obj: IMotorcycle): Promise<IMotorcycle | null> {
    const idExists = await this.listOne(_id);

    if (!idExists) throw new ErrorHandler(404, 'Object not found');

    const validObj = motorcycleSchema.safeParse(obj);

    if (!validObj.success) throw new ErrorHandler(400, 'Invalid Object');

    const motoUpdated = this.motoModel.update(_id, obj);
    return motoUpdated;
  }

  public async delete(_id: string): Promise<void> {
    const idExists = await this.listOne(_id);

    if (!idExists) throw new ErrorHandler(404, 'Object not found');
    
    await this.motoModel.delete(_id);
  }
}

export default MotorcycleServices;