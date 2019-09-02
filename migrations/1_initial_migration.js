const Migrations = artifacts.require("Migrations");

const SimpleToken = artifacts.require("SimpleToken");
const NameSystem = artifacts.require("NameSystem");
const AccessControl = artifacts.require("AccessControl");

module.exports = function(deployer) {
  deployer.deploy(Migrations);

  deployer.deploy(SimpleToken, "SimpleToken", "SpTkn");
  deployer.deploy(NameSystem);
  deployer.deploy(AccessControl);
};
