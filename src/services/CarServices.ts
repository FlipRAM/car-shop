import { ICar, carSchema } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import { IService } from '../interfaces/IService';
import ErrorHandler from '../utils/ErrorHandler';

class CarServices implements IService<ICar> {
  static MIN_ID_LENGTH = 24;
  private model: IModel<ICar>;
  
  constructor(model: IModel<ICar>) {
    this.model = model;
  }

  public async create(obj: ICar): Promise<ICar> {
    const validObj = carSchema.safeParse(obj);

    if (!validObj.success) throw new ErrorHandler(400, 'Invalid Object');

    return this.model.create(obj);
  }

  public async list(): Promise<ICar[]> {
    return this.model.read();
  }

  public async listOne(_id: string): Promise<ICar | null> {
    if (_id.length < CarServices.MIN_ID_LENGTH) {
      throw new ErrorHandler(400, 'Id must have 24 hexadecimal characters');
    }

    const carMatch = this.model.readOne(_id);

    return carMatch;
  }

  public async update(_id: string, obj: ICar): Promise<ICar | null> {
    const idExists = await this.listOne(_id);

    if (!idExists) throw new ErrorHandler(404, 'Object not found');

    const validObj = carSchema.safeParse(obj);

    if (!validObj.success) throw new ErrorHandler(400, 'Invalid Object');

    const carUpdated = this.model.update(_id, obj);
    return carUpdated;
  }

  public async delete(_id: string): Promise<void> {
    const idExists = await this.listOne(_id);

    if (!idExists) throw new ErrorHandler(404, 'Object not found');
    
    await this.model.delete(_id);
  }
}

export default CarServices;