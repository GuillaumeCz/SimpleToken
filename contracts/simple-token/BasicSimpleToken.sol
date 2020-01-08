pragma solidity ^0.5.0;

import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC721/ERC721Full.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/drafts/Counters.sol";

contract BasicSimpleToken is ERC721 {
    using Counters for Counters.Counter;

    struct SimpleTkn {
        uint256 id;
        address from;
        address to;
        string details;
    }

    Counters.Counter internal _tokenCounter;
    mapping(uint256 => SimpleTkn) internal _tokenList;

    function getCounter() public view returns (uint256) {
        return _tokenCounter.current();
    }
}
