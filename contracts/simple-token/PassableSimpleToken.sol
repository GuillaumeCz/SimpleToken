pragma solidity ^0.5.0;

import "./BasicSimpleToken.sol";
import "../roles/UserRole.sol";

contract PassableSimpleToken is BasicSimpleToken, UserRole {
    function passToken(address to, uint256 tokenId) public onlyUser {
        super.safeTransferFrom(msg.sender, to, tokenId);
    }
}
