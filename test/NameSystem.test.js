const NameSystem = artifacts.require("./NameSystem.sol");

contract("NameSystem", accounts => {
   const name0 = "Johnny";
    const name1 = "AliBaba";

    const addr0 = accounts[0];
    const addr1 = accounts[1];
  const user = accounts[5];

  const record0 = {
    index: 0,
    addr: addr0,
    name: name0,
  }

  let instance;

  before(() => {
    NameSystem.deployed().then(inst => {
      instance = inst;
    });
  });

  it("...should see if addr0 is still an admin", () => 
    instance.isAdmin(addr0)
      .then(isAd => assert.equal(isAd, true)));

  it("...should be empty", () => 
    instance.getRecordCount()
      .then(cpt => assert.equal(cpt, 0)));

  it("...should add a record", () => 
    instance
      .addRecord(addr0, name0)
      .then(() => instance.getRecordCount())
      .then(cpt => assert.equal(cpt, 1))
  );

  it('...should throw an error if a non-admin user wants to create a record', () => 
    instance.addRecord(addr1, name1, { from: user })
    .catch(err => assert.include(err.toString(), 'Error'))
  )

  it('...should retrieve a record', () => 
    instance.getRecord(0)
    .then(record => {
      assert.equal(record.index, 0)
      assert.equal(record.name, name0);
      assert.equal(record.addr, addr0);
    }));

  it("...should get a record from an address", () => 
    instance.getRecordByAddr(addr0)
    .then(record => {
      assert.equal(record.index, 0)
      assert.equal(record.name, name0);
      assert.equal(record.addr, addr0);
    }));

  it('...should get a record from a name', () =>
    instance.getRecordByName(name0)
      .then(record => {
         assert.equal(record.index, 0)
      assert.equal(record.name, name0);
      assert.equal(record.addr, addr0);
      }));
});
