pragma solidity ^0.5.0;

import '@openzeppelin/upgrades/contracts/Initializable.sol';
import "./BasicSimpleToken.sol";
import "../roles/UserRole.sol";

contract PassableSimpleToken is Initializable, BasicSimpleToken, UserRole {

    function initialize() initializer public {
        BasicSimpleToken.initialize();
    }

    function passToken(address to, uint256 tokenId) public onlyUser {
        super.safeTransferFrom(msg.sender, to, tokenId);
    }
}
