const Contract = artifacts.require('./SimpleToken');

before(() => Contract.deployed().then(inst => {
  global.instance = inst;
}));

