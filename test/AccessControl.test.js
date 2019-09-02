const AccessControl = artifacts.require("./AccessControl");

contract("AccessControl", accounts => {
  const deployerAddr = accounts[0];
  const addr0 = accounts[1];
  const addr1 = accounts[2];

  it("...should test if the user that deployed is an admin", () =>
    AccessControl.deployed()
      .then(instance => instance.isAdmin(deployerAddr))
      .then(res => assert.equal(res, true)));

  it("...should add an admin", () => {
    let accessControlInstance;
    return AccessControl.deployed()
      .then(instance => {
        accessControlInstance = instance;
        return accessControlInstance.isAdmin.call(addr0);
      })
      .then(res => {
        assert.equal(res, false);
        return accessControlInstance.addAdmin.sendTransaction(addr0);
      })
      .then(res => accessControlInstance.isAdmin.call(addr0))
      .then(res => assert.equal(res, true));
  });

  it("...should remove an admin", () => {
    let accessControlInstance;
    return AccessControl.deployed()
      .then(instance => {
        accessControlInstance = instance;
        return accessControlInstance.isAdmin.call(addr0);
      })
      .then(res => {
        assert.equal(res, true);
        return accessControlInstance.removeAdmin.sendTransaction(addr0);
      })
      .then(res => accessControlInstance.isAdmin.call(addr0))
      .then(res => assert.equal(res, false));
  });
});
