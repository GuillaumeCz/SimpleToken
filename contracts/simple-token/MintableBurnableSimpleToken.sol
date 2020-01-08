pragma solidity ^0.5.0;

import '@openzeppelin/upgrades/contracts/Initializable.sol';
import "./BasicSimpleToken.sol";
import "../roles/AdminRole.sol";

contract MintableBurnableSimpleToken is Initializable, BasicSimpleToken, AdminRole {

    function initialize() initializer public {
        BasicSimpleToken.initialize();
    }

    function safeMint(address _from, address _to, string memory _details)
        public
        onlyAdmin
        existsAsUser(_from)
        existsAsUser(_to)
        returns (uint256)
    {
        uint256 simpleTokenId = _tokenCounter.current();
        _safeMint(_from, simpleTokenId);

        SimpleTkn memory newSimpleToken = SimpleTkn(
            simpleTokenId,
            _from,
            _to,
            _details
        );
        _tokenList[simpleTokenId] = newSimpleToken;
        _tokenCounter.increment();
        return simpleTokenId;
    }

    function burn(uint256 _id) public onlyAdmin {
        _burn(_id);
        delete _tokenList[_id];
        _tokenCounter.decrement();
    }
}
