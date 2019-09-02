const NameSystem = artifacts.require("./NameSystem.sol");

contract("NameSystem", accounts => {
  it("...should link", () => {
    const name0 = "Open";
    const name1 = "AliBaba";

    const addr0 = accounts[0];
    const addr1 = accounts[1];

    let nameSystemInstance;

    return NameSystem.deployed()
      .then(instance => {
        nameSystemInstance = instance;

        const pr0 = nameSystemInstance.linkAddrToName.sendTransaction(
          addr0,
          name0
        );
        const pr1 = nameSystemInstance.linkAddrToName.sendTransaction(
          addr1,
          name1
        );

        return Promise.all([pr0, pr1]);
      })
      .then(res =>
        Promise.all([
          nameSystemInstance.getName.call(addr0),
          nameSystemInstance.getAddr.call(name0),
          nameSystemInstance.getName.call(addr1),
          nameSystemInstance.getAddr.call(name1),
          nameSystemInstance.getRecordCount.call()
        ])
      )
      .then(([_name0, _addr0, _name1, _addr1, _cpt]) => {
        assert.equal(_name0, name0);
        assert.equal(_addr0, addr0);
        assert.equal(_name1, name1);
        assert.equal(_addr1, addr1);
        assert.equal(_cpt.toNumber(), 2);
        return Promise.all([
          nameSystemInstance.getRecord.call(0),
          nameSystemInstance.getRecord.call(_cpt.toNumber() - 1)
        ]);
      })
      .then(([record0, record1]) => {
        assert.equal(record0.name_, name0);
        assert.equal(record0.addr_, addr0);
        assert.equal(record1.name_, name1);
        assert.equal(record1.addr_, addr1);
      });
  });
});
