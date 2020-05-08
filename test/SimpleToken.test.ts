import {SimpleTokenInstance} from "../types";
import BigNumber from "bignumber.js";

const Contract = artifacts.require("./SimpleToken");

interface IToken {
  from: string;
  to: string;
  details: string;
  id: BigNumber;
}

contract("SimpleToken", accounts => {
  const name: string = "SimpleToken";
  const symbol: string = "spTkn";
  const admin: string = accounts[1];
  const user: string = accounts[2];
  const unregisteredUser: string = accounts[5];

  const details0: string = "TestMe0";

  let instance: SimpleTokenInstance;

  before(() => {
    return Contract.new().then((inst: SimpleTokenInstance) => {
      instance = inst;
      return Promise.all([instance.addAdmin(admin), instance.addUser(user)]);
    });
  });

  it("...should have the right name and symbol", () => {
    return Promise.all([instance.name(), instance.symbol()]).then(
      ([_name, _symbol]: string[]) => {
        assert.equal(_name, name);
        assert.equal(_symbol, symbol);
      }
    );
  });

  it("...should create a SimpleToken by an admin, using 2 recorded users", () => {
    return instance
      .safeMint(admin, user, details0, {from: admin})
      .then(() => instance.getCounter())
      .then((cpt: BigNumber) => {
        assert.equal(cpt.toNumber(), 1);
      });
  });

  it("...should fail when a non-admin user tries to create an SimpleToken", () => {
    return instance
      .safeMint(admin, user, details0, {from: user})
      .then(() => {
        assert.isOk(false, "it should have failed... !");
      })
      .catch(() => {
        assert.isOk(true);
      });
  });

  it("...should fail when creating a SimpleToken with an un-registered user as recipient", () => {
    return instance
      .safeMint(admin, unregisteredUser, details0)
      .then(() => {
        assert.isOk(false, "it should have failed... !");
      })
      .catch(() => {
        assert.isOk(true);
      });
  });

  it("...should fail when creating a SimpleToken with an un-registered user as the first owner", () => {
    return instance
      .safeMint(unregisteredUser, admin, details0)
      .then(() => {
        assert.isOk(false, "it should have failed... !");
      })
      .catch(() => {
        assert.isOk(true);
      });
  });

  it("...should get an owner's balance", () => {
    return instance.balanceOf(admin).then((balance: BigNumber) => {
      assert.equal(balance.toNumber(), 1);
    });
  });

  it("...should check if admin is the onwer of the token 0", () => {
    return instance.ownerOf(0).then((owner: string) => {
      assert.equal(owner, admin);
    });
  });

  it("...should get an SimpleToken with id 0", () => {
    return instance.getSimpleToken(0, {from: admin}).then((token: IToken) => {
      assert.equal(admin, token.from);
      assert.equal(user, token.to);
      assert.equal(details0, token.details);
    });
  });

  it("...should fail if a non-admin or non-owner user tries to get a SimpleToken", () => {
    return instance
      .getSimpleToken(0, {from: user})
      .then(() => {
        assert.isOk(false, "It should have failed... !");
      })
      .catch(() => {
        assert.isOk(true);
      });
  });

  it("..should create another SimpleToken by an admin, using 2 recorded users", () => {
    return instance
      .safeMint(user, admin, details0)
      .then(() => instance.getCounter())
      .then((cpt: BigNumber) => {
        assert.equal(cpt.toNumber(), 2);
      });
  });

  it("...should check if user is the owner of the token 1", () => {
    return instance.ownerOf(1).then((owner: string) => {
      assert.equal(owner, user);
    });
  });

  it("...should get a SimpleToken if I am the owner", () => {
    return instance
      .getSimpleToken(0, {from: user})
      .then(() => {
        assert.isOk(true);
      })
      .catch(err => {
        assert.isOk(false);
      });
  });

  it("...should transfer the SimpleToken 0 from admin to user", () => {
    return instance
      .passToken(user, 0, {from: admin})
      .then(() => instance.ownerOf(0))
      .then((owner: string) => {
        assert.equal(owner, user);
        return Promise.all([
          instance.balanceOf(user),
          instance.balanceOf(admin)
        ]);
      })
      .then(([cptUser, cptAdmin]: BigNumber[]) => {
        assert.equal(cptAdmin.toNumber(), 0);
        assert.equal(cptUser.toNumber(), 2);
      });
  });

  it("...should burn the SimpleToken 0", () => {
    return instance
      .burn(0, {from: admin})
      .then(() => instance.getCounter())
      .then((cpt: BigNumber) => {
        assert.equal(cpt.toNumber(), 1);
        return instance.balanceOf(user);
      })
      .then((cpt: BigNumber) => {
        assert.equal(cpt.toNumber(), 1);
      });
  });
});
