pragma solidity ^0.5.0;

// see https://github.com/OpenZeppelin/simplezeppelin-solidity/tree/master/contracts/token/ERC721
import "openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol";

import "./AccessControl.sol";

contract SimpleToken is ERC721Full, AccessControl {
    // TODO --> Focus sur Counters de SimpleZeppelin-solidity (
    // using Counters for Counters.Counter;

    struct SimpleTkn {
        uint256 id;
        address from;
        address to;
        string details;
    }

    uint256 private _tokenCounter;
    mapping(uint256 => SimpleTkn) private _tokenList;

    constructor(string memory _name, string memory _symbol)
        public
        ERC721Full(_name, _symbol)
    {
        _tokenCounter = 0;
    }

    function createSimpleToken(
        address _from,
        address _to,
        string memory _details
    ) public onlyAdmin returns (uint256) {
        uint256 simpleTokenId = _tokenCounter++;
        _mint(_from, simpleTokenId);

        SimpleTkn memory newSimpleToken = SimpleTkn(
            simpleTokenId,
            _from,
            _to,
            _details
        );
        _tokenList[simpleTokenId] = newSimpleToken;
        return simpleTokenId;
    }

    function burnSimpleToken(address _owner, uint256 _id) public onlyAdmin {
        _burn(_owner, _id);
        // TODO: find how to remove (or reset)
        // _tokenList[_id] =
    }

    function getCounter() public view returns (uint256) {
        return _tokenCounter;
    }

    function getSimpleToken(uint256 _tokenId)
        public
        view
        returns (
            uint256 tokenId_,
            address tokenFrom_,
            address tokenTo_,
            string memory details_
        )
    {
        SimpleTkn memory simpleToken = _tokenList[_tokenId];
        tokenId_ = _tokenId;
        tokenFrom_ = simpleToken.from;
        tokenTo_ = simpleToken.to;
        details_ = simpleToken.details;
    }
}
