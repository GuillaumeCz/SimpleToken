const SimpleToken = artifacts.require("./SimpleToken.sol");

contract("SimpleToken", accounts => {
  const admin = accounts[0];
  const owner0 = accounts[1];
  const owner1 = accounts[2];

  const details0 = "TestMe0";
  const details1 = "TestMe1";

  it("...should create 2 SimpleTokens", () => {
    let stInstance;

    return SimpleToken.deployed()
      .then(instance => {
        stInstance = instance;

        const pr0 = stInstance.createSimpleToken.sendTransaction(
          owner0,
          owner1,
          details0
        );
        const pr1 = stInstance.createSimpleToken.sendTransaction(
          owner1,
          owner0,
          details1
        );

        return Promise.all([pr0, pr1]);
      })
      .then(res => {
        const pr0 = stInstance.getCounter.call();
        const pr1 = stInstance.balanceOf.call(owner0);
        const pr2 = stInstance.balanceOf.call(owner1);
        return Promise.all([pr0, pr1, pr2]);
      })
      .then(([counter, balance0, balance1]) => {
        assert.equal(counter.toNumber(), 2);
        assert.equal(balance0.toNumber(), 1);
        assert.equal(balance1.toNumber(), 1);
      });
  });

  it("..should get an SimpleToken with id 0", () =>
    SimpleToken.deployed()
      .then(instance => instance.getSimpleToken.call(0))
      .then(res => {
        assert.equal(owner0, res.tokenFrom_);
        assert.equal(owner1, res.tokenTo_);
        assert.equal(details0, res.details_);
      }));
});
