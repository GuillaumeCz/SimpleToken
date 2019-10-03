const SimpleToken = artifacts.require("./SimpleToken.sol");

contract("SimpleToken", accounts => {
  const admin = accounts[0];
  const user = accounts[6];

  const details0 = "TestMe0";
  const details1 = "TestMe1";

  let instance;

  before(() => {
    SimpleToken.deployed().then(inst => {
      instance = inst;
    });
  });
  it("...should see if addr0 is still an admin", () =>
    instance.isAdmin(admin).then(isAd => assert.equal(isAd, true)));

  it("...should see if addr0 is still an user", () =>
    instance
      .addUser(user)
      .then(() => instance.isUser(user))
      .then(isAd => assert.equal(isAd, true)));

  it("..should create a SimpleToken", () =>
    instance
      .createSimpleToken(admin, user, details0)
      .then(() => instance.getCounter())
      .then(cpt => assert.equal(cpt, 1)));

  it("..should get an owner's balance", () =>
    instance.balanceOf(admin).then(balance => assert.equal(balance, 1)));

  it("..should get an SimpleToken with id 0", () =>
    instance.getSimpleToken(0, {from: admin}).then(token => {
      assert.equal(admin, token.from);
      assert.equal(user, token.to);
      assert.equal(details0, token.details);
    }));
});
