import {SimpleTokenInstance} from "../types";
import {Address} from "cluster";

const Contract = artifacts.require("./SimpleToken");

contract("AccessControl", accounts => {
  const deployerAddr: string = accounts[0];
  const admin0: string = accounts[1];
  const admin1: string = accounts[2];
  const user0: string = accounts[3];
  const user1: string = accounts[4];
  const user2: string = accounts[5];

  let instance: SimpleTokenInstance;

  before(() =>
    Contract.new({from: deployerAddr}).then((inst: SimpleTokenInstance) => {
      instance = inst;
    })
  );

  it("...should test if the user that deployed is an admin", () => {
    return instance.isAdmin(deployerAddr).then((isAdmin: boolean) => {
      assert.equal(isAdmin, true);
    });
  });

  it("...should add an admin", () => {
    return instance
      .addAdmin(admin0)
      .then(() => instance.isAdmin(admin0))
      .then((isAdmin: boolean) => {
        assert.equal(isAdmin, true);
      });
  });

  it("...should consider an admin as a user", () => {
    return instance.isUser(admin0).then((isUser: boolean) => {
      assert.equal(isUser, true);
    });
  });

  it("...should authorize an admin to add a user", () => {
    return instance
      .addUser(user0)
      .then(() => instance.isUser(user0))
      .then((isUser: boolean) => {
        assert.equal(isUser, true);
      });
  });

  it("...should authorize an admin to add an admin", () => {
    return instance
      .addAdmin(admin1, {from: admin0})
      .then(() => instance.isAdmin(admin1))
      .then((isAdmin: boolean) => {
        assert.equal(isAdmin, true);
      });
  });

  it("...should refuse that a user create another user", () => {
    return instance
      .addUser(user1, {from: user0})
      .then(() => {
        assert.isOk(false)
      })
      .catch(() => {
        assert.isOk(true)
      });
  });

  it("...should authorize an admin to remove an user", () => {
    return instance
      .removeUser(user0, {from: admin0})
      .then(() => instance.isUser(user0))
      .then((isUser: boolean) => {
        assert.equal(isUser, false);
      });
  });

  it("...should authorize an admin to remove another admin", () => {
    return instance
      .removeAdmin(admin1, {from: admin0})
      .then(() => instance.isAdmin(admin1))
      .then((isAdmin: boolean) => {
        assert.equal(isAdmin, false);
      });
  });

  it("...should un-authorize a user to remove another user", () => {
    return instance
      .addUser(user2)
      .then(() => instance.removeUser(user2, {from: user1}))
      .then(() => {
        assert.isOk(false);
      })
      .catch(err => {
        assert.isOk(true);
      });
  });
});
