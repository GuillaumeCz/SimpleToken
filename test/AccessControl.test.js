const AccessControl = artifacts.require("./AccessControl");

contract("AccessControl", accounts => {
  const deployerAddr = accounts[0];
  const addr0 = accounts[1];
  const addr1 = accounts[2];

  it("...should test if the user that deployed is an user", () =>
    AccessControl.deployed()
      .then(instance => instance.isUser(deployerAddr))
      .then(res => assert.equal(res, true)));

  it("...should add an user", () => {
    let accessControlInstance;
    return AccessControl.deployed()
      .then(instance => {
        accessControlInstance = instance;
        return accessControlInstance.isUser.call(addr0);
      })
      .then(res => {
        assert.equal(res, false);
        return accessControlInstance.addUser.sendTransaction(addr0);
      })
      .then(res => accessControlInstance.isUser.call(addr0))
      .then(res => assert.equal(res, true));
  });

  it("...should remove an user", () => {
    let accessControlInstance;
    return AccessControl.deployed()
      .then(instance => {
        accessControlInstance = instance;
        return accessControlInstance.isUser.call(addr0);
      })
      .then(res => {
        assert.equal(res, true);
        return accessControlInstance.removeUser.sendTransaction(addr0);
      })
      .then(res => accessControlInstance.isUser.call(addr0))
      .then(res => assert.equal(res, false));
  });
});
