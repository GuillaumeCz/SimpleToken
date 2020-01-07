pragma solidity ^0.5.0;

import "./BasicSimpleToken.sol";
import "../roles/AdminRole.sol";
import "../roles/UserRole.sol";

contract MintableSimpleToken is BasicSimpleToken, UserRole {
    function createSimpleToken(
        address _from,
        address _to,
        string memory _details
    ) public onlyAdmin existsAsUser(_from) existsAsUser(_to) returns (uint256) {
        uint256 simpleTokenId = _tokenCounter++;
        _safeMint(_from, simpleTokenId);

        SimpleTkn memory newSimpleToken = SimpleTkn(
            simpleTokenId,
            _from,
            _to,
            _details
        );
        _tokenList[simpleTokenId] = newSimpleToken;
        return simpleTokenId;
    }
}
