const NameSystem = artifacts.require('./NameSystem.sol');

contract('NameSystem', accounts => {

  it('...should link', () => {
    const name0 = "Open";
    const name1 = "AliBaba";

    const addr0 = accounts[0];
    const addr1 = accounts[1];

    let nameSystemInstance;

    return NameSystem.deployed()
      .then(instance => {
        nameSystemInstance = instance;

        const pr0 = nameSystemInstance.linkAddrToName.sendTransaction(addr0, name0);
        const pr1 = nameSystemInstance.linkAddrToName.sendTransaction(addr1, name1);

        return Promise.all([pr0, pr1]);
      }).then(res => Promise.all(
        [
          nameSystemInstance.getName.call(addr0),
          nameSystemInstance.getAddr.call(name0),
          nameSystemInstance.getName.call(addr1),
          nameSystemInstance.getAddr.call(name1),
          nameSystemInstance.getRecordCount.call()
        ]
      )).then(res => {
        assert.equal(res[0], name0);
        assert.equal(res[1], addr0);
        assert.equal(res[2], name1);
        assert.equal(res[3], addr1);
        assert.equal(res[4].toNumber(), 2);
        return Promise.all([
          nameSystemInstance.getRecord.call(0),
          nameSystemInstance.getRecord.call(res[4].toNumber() - 1)
        ])
      }).then(res => {
        assert.equal(res[0][0], name0);
        assert.equal(res[0][1], addr0);
        assert.equal(res[1][0], name1);
        assert.equal(res[1][1], addr1);
      });
  });

});
