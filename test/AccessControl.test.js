const AccessControl = artifacts.require("./AccessControl");

contract("AccessControl", accounts => {
  const deployerAddr = accounts[0];
  const admin0 = accounts[1];
  const user0 = accounts[2];

  let instance;

  before(() => {
    AccessControl.deployed()
      .then(inst => {
        instance = inst;
      });
  });

  it("...should test if the user that deployed is an admin", () =>
    instance.isAdmin(deployerAddr)
    .then(isAdmin => assert.equal(isAdmin, true)));

  it("...should autorize an admin to add a user", () => {
    return instance.isUser(admin0)
      .then(isUser => {
        assert.equal(isUser, false);
        return instance.addUser(admin0);
      }).then(() => instance.isUser.call(admin0))
      .then(isUser => assert.equal(isUser, true));
  });

  it("...should remove an user", () => {
      return instance.isUser.call(admin0)
      .then(isUser => {
        assert.equal(isUser, true);
        return instance.removeUser.sendTransaction(admin0);
      })
      .then(() => instance.isUser.call(admin0))
      .then(isUser => assert.equal(isUser, false));
  });
});
