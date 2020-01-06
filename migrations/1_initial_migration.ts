import Deployer = Truffle.Deployer;
import {MigrationsContract, SimpleTokenContract} from "../types/truffle-contracts";

const Migrations: MigrationsContract = artifacts.require("Migrations");
const SimpleToken: SimpleTokenContract = artifacts.require("SimpleToken");

module.exports = function(deployer: Deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(SimpleToken, "SimpleToken", "SpTkn");
} as Truffle.Migration;

export {};
