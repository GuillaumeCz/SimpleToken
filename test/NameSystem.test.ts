import BigNumber from "bignumber.js";
import {SimpleTokenInstance} from "../types/truffle-contracts";

const stContract = artifacts.require('SimpleToken');

interface IRecord {
  index: number|BigNumber;
  name: string;
  addr: string; // Should be a type address
}

const isEqual = (record: IRecord, index: number, name: string, addr: string) => {
  assert.equal(record.index, index);
  assert.equal(record.name, name);
  assert.equal(record.addr, addr);
};

const isEmpty = (record: IRecord) => {
  assert.equal(record.name, "");
  // @ts-ignore
  assert.equal(record.name, 0);
};

contract("NameSystem", accounts => {
  const name0 = "Johnny";
  const name1 = "AliBaba";

  const addr0 = accounts[0];
  const addr1 = accounts[1];
  const user = accounts[5];

  let instance: SimpleTokenInstance;

  before(() => stContract.deployed().then((inst: SimpleTokenInstance) => {
    instance = inst;
  }));

  it("...should be empty", () =>
    instance.getRecordCount().then(cpt => assert.equal(cpt.toNumber(), 0)));

  it("...should add a record", () =>
    instance
      .addRecord(addr0, name0)
      .then(() => instance.getRecordCount())
      .then(cpt => assert.equal(cpt.toNumber(), 1)));

  it("...should throw an error if a non-admin user wants to create a record", () =>
    instance
      .addRecord(addr1, name1, {from: user})
      .catch(err => assert.include(err.toString(), "Error")));

  it("...should retrieve a record", () =>
    instance.getRecord(0).then((record) => {
      isEqual(record, 0, name0, addr0)
    }));

  it("...should get a record from an address", () =>
    instance
      .getRecordByAddr(addr0)
      .then(record => isEqual(record, 0, name0, addr0)));

  it("...should get a record from a name", () =>
    instance
      .getRecordByName(name0)
      .then(record => isEqual(record, 0, name0, addr0)));

  it("...should remove a record", () =>
    instance
      .removeRecord(0)
      .then(() => instance.getRecordCount())
      .then(cpt => {
        assert.equal(cpt.toNumber(), 0);
        return Promise.all([
          instance.getRecordByName(name0),
          instance.getRecordByAddr(addr0),
          instance.getRecord(0)
        ]);
      })
      .then(([recordByName, recordByAddr, recordById]) => {
        isEmpty(recordByName);
        isEmpty(recordByAddr);
        isEmpty(recordById);
      }));

  it("...should throw an exception when a non-admin user tries to remove a record", () =>
    instance
      .addRecord(addr1, name1)
      .then(() => instance.removeRecord(0, {from: user}))
      .catch(err => assert.include(err.toString(), "Error")));
});
