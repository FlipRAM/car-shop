import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import { Model } from 'mongoose';
import CarModel from '../../../models/CarModel';
import { ICar } from '../../../interfaces/ICar';

const carIn: ICar = {
  model: 'Lamborghini Aventador SVJ 770-4 6.5 V12',
  year: 2021,
  color: 'black',
  buyValue: 343.339,
  doorsQty: 2,
  seatsQty: 2,
}

const carOut: ICar & { _id: string } = {
  model: 'Lamborghini Aventador SVJ 770-4 6.5 V12',
  year: 2021,
  color: 'black',
  buyValue: 343.339,
  doorsQty: 2,
  seatsQty: 2,
  _id: "632231a9c9b779b39ada8047",
}

const carListOut: ICar[] = [
  carIn,
  carIn,
]

describe('The model used for cars', () => {

  const model = new CarModel();

  before(async () => {
    sinon
      .stub(Model, 'create')
      .resolves(carOut);
    sinon
    .stub(Model, 'find')
    .resolves(carListOut);
    sinon
    .stub(Model, 'findOne')
    .resolves(carOut);
    sinon
    .stub(Model, 'findByIdAndUpdate')
    .resolves(carOut);
    sinon
    .stub(Model, 'findByIdAndDelete')
    .resolves(carOut);
  });

  after(()=>{
    sinon.restore();
  })

  describe('when creating a car', () => {
    it('returns a new car', async () => {
      const newCar = await model.create(carIn);

      expect(newCar).to.be.deep.equal(carOut);
    });
  })

  describe('when reading cars', () => {
    it('returns a list of cars', async () => {
      const listOfCars = await model.read();

      expect(listOfCars).to.be.deep.equal(carListOut);
    });
  })

  describe('when finding a car by id', () => {
    it('returns the correct car', async () => {
      const matchCar = await model.readOne('632231a9c9b779b39ada8047');

      expect(matchCar).to.be.deep.equal(carOut);
    });

    it('returns the correct error when car not found', async () => {
      try {
        await model.readOne('632231a9c9b780b39ada8047');
      } catch (err: any) {
        expect(err.message).to.be.equal('Object not found');
      }
    });
  })

  describe('when updating a car by id', () => {
    it('updates the correct car', async () => {
      const updated = await model.update(carOut._id, carIn);

      expect(updated).to.be.deep.equal(carOut);
    });

    it('returns the correct error when invalid id', async () => {
      try {
        await model.readOne('632231a9c9b780b39ada8047');
      } catch (err: any) {
        expect(err.message).to.be.equal('Invalid ID');
      }
    });
  })

  describe('when deleting a car by id', () => {
    it('deletes the correct car', async () => {
      const deleted = await model.delete(carOut._id);

      expect(deleted).to.be.deep.equal(carOut);
    });

    it('returns the correct error when invalid id', async () => {
      try {
        await model.readOne('632231a9c9b780b39ada8047');
      } catch (err: any) {
        expect(err.message).to.be.equal('Invalid ID');
      }
    });
  })

});