pragma solidity ^0.5.0;

import '@openzeppelin/upgrades/contracts/Initializable.sol';
import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC721/ERC721Full.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/drafts/Counters.sol";

contract BasicSimpleToken is Initializable, ERC721 {
    using Counters for Counters.Counter;

    struct SimpleTkn {
        uint256 id;
        address from;
        address to;
        string details;
    }

    Counters.Counter internal _tokenCounter;
    mapping(uint256 => SimpleTkn) internal _tokenList;

    function initialize() initializer public {
        ERC721.initialize();
    }

    function getCounter() public view returns (uint256) {
        return _tokenCounter.current();
    }
}
