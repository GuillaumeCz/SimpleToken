contract("SimpleToken", accounts => {
  const admin = accounts[1];
  const user = accounts[2];
  const unregistredUser = accounts[5];

  const details0 = "TestMe0";

  before(() => Promise.all([instance.addAdmin(admin), instance.addUser(user)]));

  it("..should create a SimpleToken by an admin, using 2 recorded users", () => {
    return instance
      .createSimpleToken(admin, user, details0, {from: admin})
      .then(() => instance.getCounter())
      .then(cpt => assert.equal(cpt, 1));
  });

  it("...should fail when a non-admin user tries to create an SimpleToken", () => {
    return instance
      .createSimpleToken(admin, user, details0, {from: user})
      .then(() => assert.isOk(false, "it should have failed... !"))
      .catch(() => assert.isOk(true));
  });

  it("...should fail when creating a SimpleToken with an unregistred user as destinator", () => {
    return instance
      .createSimpleToken(admin, unregistredUser, details0)
      .then(() => assert.isOk(false, "it should have failed... !"))
      .catch(() => assert.isOk(true));
  });

  it("...should fail when creating a SimpleToken with an unregistred user as the first owner", () => {
    return instance
      .createSimpleToken(unregistredUser, admin, details0)
      .then(() => assert.isOk(false, "it should have failed... !"))
      .catch(() => assert.isOk(true));
  });

  it("...should get an owner's balance", () => {
    return instance.balanceOf(admin).then(balance => assert.equal(balance, 1));
  });

  it("...should check if admin is the onwer of the token 0", () => {
    return instance.ownerOf(0).then(owner => assert.equal(owner, admin));
  });

  it("...should get an SimpleToken with id 0", () => {
    return instance.getSimpleToken(0, {from: admin}).then(token => {
      assert.equal(admin, token.from);
      assert.equal(user, token.to);
      assert.equal(details0, token.details);
    });
  });

  it("...should fail if a non-admin or non-owner user tries to get a SimpleToken", () => {
    return instance
      .getSimpleToken(0, {from: user})
      .then(() => assert.isOk(false, "It should have failed... !"))
      .catch(() => assert.isOk(true));
  });

  it("..should create another SimpleToken by an admin, using 2 recorded users", () => {
    return instance
      .createSimpleToken(user, admin, details0)
      .then(() => instance.getCounter())
      .then(cpt => assert.equal(cpt, 2));
  });

  it("...should check if user is the onwer of the token 1", () => {
    return instance.ownerOf(1).then(owner => assert.equal(owner, user));
  });

  it("...should get a SimpleToken if I am the owner", () => {
    return instance
      .getSimpleToken(0, {from: user})
      .then(() => assert.isOk(true))
      .catch(err => assert.isOk(false));
  });

  it("...should transfer the SimpleToken 0 from admin to user", () => {
    return instance
      .passToken(user, 0, {from: admin})
      .then(() => instance.ownerOf(0))
      .then(owner => {
        assert.equal(owner, user);
        return Promise.all([
          instance.balanceOf(user),
          instance.balanceOf(admin)
        ]);
      })
      .then(([cptUser, cptAdmin]) => {
        assert.equal(cptAdmin, 0);
        assert.equal(cptUser, 2);
      });
  });

  it("...should burn the SimpleToken 0", () => {
    return instance
      .burnSimpleToken(0, {from: admin})
      .then(() => instance.getCounter())
      .then(cpt => {
        assert.equal(cpt, 1);
        return instance.balanceOf(user);
      })
      .then(cpt => assert.equal(cpt, 1));
  });
});
