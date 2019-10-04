const SimpleToken = artifacts.require("./SimpleToken.sol");

contract("SimpleToken", accounts => {
  const admin = accounts[1];
  const user = accounts[2];
  const unregistredUser = accounts[3];

  const details0 = "TestMe0";
  const details1 = "TestMe1";

  let instance;

  before(() => {
    SimpleToken.deployed().then(inst => {
      instance = inst;
      return Promise.all([instance.addAdmin(admin), instance.addUser(user)]);
    });
  });

  it("..should create a SimpleToken by an admin, using 2 recorded users", () =>
    instance
      .createSimpleToken(admin, user, details0)
      .then(() => instance.getCounter())
      .then(cpt => assert.equal(cpt, 1)));

  it("...should fail when a non-admin user tries to create an SimpleToken", () => 
    instance.createSimpleToken(admin, user, details0, { from:user })
      .then(() => assert.isOk(false, 'it should have failed... !'))
      .catch(() => assert.isOk(true)));

  it("...should fail when creating a SimpleToken with an unregistred user as destinator", () => 
    instance.createSimpleToken(admin, unregistredUser, details0)
      .then(() => assert.isOk(false, 'it should have failed... !'))
      .catch(() => assert.isOk(true)));

  it("...should fail when creating a SimpleToken with an unregistred user as the first owner", () => 
    instance.createSimpleToken(unregistredUser, admin, details0)
      .then(() => assert.isOk(false, 'it should have failed... !'))
      .catch(() => assert.isOk(true)));

  it("...should get an owner's balance", () =>
    instance.balanceOf(admin).then(balance => assert.equal(balance, 1)));

  it("...should check if admin is the onwer of the token 0", () =>
    instance.ownerOf(0).then(owner => assert.equal(owner, admin)));

  it("...should get an SimpleToken with id 0", () =>
    instance.getSimpleToken(0, {from: admin}).then(token => {
      assert.equal(admin, token.from);
      assert.equal(user, token.to);
      assert.equal(details0, token.details);
    }));

  it("...should fail if a non-admin or non-owner user tries to get a SimpleToken", () =>
    instance.getSimpleToken(0, { from: user })
    .then(() => assert.isOk(false, 'It should have failed... !'))
    .catch(() => assert.isOk(true))
  );

  it("..should create another SimpleToken by an admin, using 2 recorded users", () =>
    instance
      .createSimpleToken(user, admin, details0)
      .then(() => instance.getCounter())
      .then(cpt => assert.equal(cpt, 2)));
  
  it("...should check if user is the onwer of the token 1", () =>
    instance.ownerOf(1).then(owner => assert.equal(owner, user)));

  it("...should get a SimpleToken if I am the owner", () =>
    instance.getSimpleToken(0, { from: user })
    .then(() => assert.isOk(true))
    .catch((err) => assert.isOk(false)));
});
