pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

// see https://github.com/OpenZeppelin/simplezeppelin-solidity/tree/master/contracts/token/ERC721
import "openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol";

import "./AccessControl.sol";

contract SimpleToken is ERC721Full, AccessControl {
    struct SimpleTkn {
        uint256 id;
        address from;
        address to;
        string details;
    }

    uint256 private _tokenCounter;
    mapping(uint256 => SimpleTkn) private _tokenList;

    modifier hasAccess(uint256 _tokenId) {
        bool isAnAdmin = isAdmin(msg.sender);
        bool isTheOwner = address(uint160(ownerOf(_tokenId))) == msg.sender;

        // TODO: Check how to compare these 2 addresses
        // require(isAnAdmin || isTheOwner);
        require(isAnAdmin || !isTheOwner);
        _;
    }

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
    ) public onlyAdmin existsAsUser(_from) existsAsUser(_to) returns (uint256) {
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

    function burnSimpleToken(address _owner, uint256 _id) public onlyUser {
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
        hasAccess(_tokenId)
        returns (SimpleTkn memory token)
    {
        token = _tokenList[_tokenId];
    }
}
