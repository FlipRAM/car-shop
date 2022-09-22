import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import CarModel from '../../../models/CarModel';
import CarServices from '../../../services/CarServices';
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

describe('The service used for cars', () => {

  const model = new CarModel();
  const service = new CarServices(model);

  before(async () => {
    sinon
      .stub(model, 'create')
      .resolves(carOut);
    sinon
    .stub(model, 'read')
    .resolves(carListOut);
    sinon
    .stub(model, 'readOne')
    .resolves(carOut);
    sinon
    .stub(model, 'update')
    .resolves(carOut);
    sinon
    .stub(model, 'delete')
    .resolves();
  });

  after(()=>{
    sinon.restore();
  })

  // describe('when creating a car', () => {
  //   it('returns a new car', async () => {
  //     const newCar = await service.create(carIn);

  //     expect(newCar).to.be.deep.equal(carOut);
  //   });
  // })

  describe('when listing cars', () => {
    it('returns a list of cars', async () => {
      const listOfCars = await service.list();

      expect(listOfCars).to.be.deep.equal(carListOut);
    });
  })

  describe('when finding a car by id', () => {
    it('returns the correct car', async () => {
      const matchCar = await service.listOne('632231a9c9b779b39ada8047');

      expect(matchCar).to.be.deep.equal(carOut);
    });

    it('returns the correct error when id is wrong', async () => {
      try {
        await service.listOne('632231a9c9b780b39ada8047');
      } catch (err: any) {
        expect(err.message).to.be.equal('Id must have 24 hexadecimal characters');
      }
    });
  })

  // describe('when updating a car by id', () => {
  //   it('updates the correct car', async () => {
  //     const updated = await service.update(carOut._id, carIn);

  //     expect(updated).to.be.deep.equal(carOut);
  //   });

  //   it('returns the correct error when invalid id', async () => {
  //     try {
  //       await service.update('632231a9c9b780b39ada8047', carIn);
  //     } catch (err: any) {
  //       expect(err.message).to.be.equal('Object not found');
  //     }
  //   });
  // })

  describe('when updating a car with worng body', () => {
    it('returns the correct error', async () => {
      try {
        await service.update('632231a9c9b779b39ada8047', {} as ICar);
      } catch (err: any) {
        expect(err.message).to.be.equal('Invalid Object');
      }
    });
  })

  describe('when deleting a car by id', () => {
    it('deletes the correct car and returns null', async () => {
      const deleted = await service.delete(carOut._id);

      expect(deleted).to.be.undefined;
    });

    it('returns the correct error when invalid id', async () => {
      try {
        await service.delete('632231a9c9b780b39ada8047');
      } catch (err: any) {
        expect(err.message).to.be.equal('Object not found');
      }
    });
  })

});