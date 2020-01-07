import Deployer = Truffle.Deployer;
import {SimpleTokenContract} from "../types/truffle-contracts";

const SimpleToken: SimpleTokenContract = artifacts.require("./build/contracts/SimpleToken");

module.exports = function(deployer: Deployer, network) {
  deployer.deploy(SimpleToken, "SimpleToken", "SpTkn");
} as Truffle.Migration;

export {};
