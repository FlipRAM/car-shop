import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import { Request, Response } from 'express';
import CarModel from '../../../models/CarModel';
import CarServices from '../../../services/CarServices';
import CarControllers from '../../../controllers/CarControllers';
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

describe('The controller used for cars', () => {

  const model = new CarModel();
  const service = new CarServices(model);
  const controllers = new CarControllers(service);

  const req = {} as Request;
  const res = {} as Response;

  before(async () => {
    sinon
      .stub(service, 'create')
      .resolves(carOut);
    sinon
    .stub(service, 'list')
    .resolves(carListOut);
    sinon
    .stub(service, 'listOne')
    .resolves(carOut);
    sinon
    .stub(service, 'update')
    .resolves(carOut);
    sinon
    .stub(service, 'delete')
    .resolves();

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(()=>{
    sinon.restore();
  })

  describe('when creating a car', () => {
    it('returns status 201 and correct car', async () => {
      req.body = carIn;
      await controllers.create(req, res);

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carOut)).to.be.true;
    });
  })

  describe('when listing cars', () => {
    it('returns status 200 and correct list of cars', async () => {
      await controllers.list(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carListOut)).to.be.true;
    });
  })

  describe('when listing one car by id', () => {
    it('returns status 200 and correct car', async () => {
      req.params = { id: carOut._id };
      await controllers.listOne(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carOut)).to.be.true;
    });
  })

  describe('when updating a car by id', () => {
    it('returns status 200 and correct car update', async () => {
      req.params = { id: carOut._id };
      req.body = carIn;

      await controllers.update(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carOut)).to.be.true;
    });
  })

  describe('when deleting a car by id', () => {
    it('returns status 204 and deletes correct car', async () => {
      req.params = { id: carOut._id };

      await controllers.delete(req, res);

      expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith()).to.be.true;
    });
  })

});