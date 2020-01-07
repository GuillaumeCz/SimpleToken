import Deployer = Truffle.Deployer;
import {MigrationsContract} from "../types/truffle-contracts";

const Migrations: MigrationsContract = artifacts.require("./Migrations");

module.exports = function(deployer: Deployer) {
  deployer.deploy(Migrations);
} as Truffle.Migration;

export {};
