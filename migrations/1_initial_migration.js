const Migrations = artifacts.require("Migrations");

const SimpleToken = artifacts.require("SimpleToken");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(SimpleToken, "SimpleToken", "SpTkn");
};
