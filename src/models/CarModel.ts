import { model as mongooseCreateModel, Schema } from 'mongoose';
import { ICar } from '../interfaces/ICar';
import MongoModel from './MongoModel';

const carMongooseSchema = new Schema<ICar>({
  model: String,
  year: Number,
  color: String,
  buyValue: Number,
  seatsQty: Number,
  doorsQty: Number,
}, {
  versionKey: false,
});

export default class CarModel extends MongoModel<ICar> {
  constructor(model = mongooseCreateModel('Cars', carMongooseSchema)) {
    super(model);
  }
}