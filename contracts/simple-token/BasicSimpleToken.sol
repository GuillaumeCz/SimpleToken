pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol";

contract BasicSimpleToken is ERC721 {
    struct SimpleTkn {
        uint256 id;
        address from;
        address to;
        string details;
    }

    uint256 internal _tokenCounter;
    mapping(uint256 => SimpleTkn) internal _tokenList;

    constructor() public {
        _tokenCounter = 0;
    }

    function getCounter() public view returns (uint256) {
        return _tokenCounter;
    }
}
