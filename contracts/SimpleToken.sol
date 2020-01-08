pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

// see https://github.com/OpenZeppelin/simplezeppelin-solidity/tree/master/contracts/token/ERC721
import "@openzeppelin/contracts/token/ERC721/ERC721Metadata.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721Enumerable.sol";
import "./simple-token/MintableBurnableSimpleToken.sol";
import "./simple-token/PassableSimpleToken.sol";

contract SimpleToken is
    ERC721Metadata,
    ERC721Enumerable,
    MintableBurnableSimpleToken,
    PassableSimpleToken
{
    constructor() public ERC721Metadata("SimpleToken", "spTkn") {}

    modifier hasAccess(uint256 _tokenId) {
        bool isAnAdmin = isAdmin(msg.sender);
        bool isTheOwner = address(uint160(ownerOf(_tokenId))) == msg.sender;

        // TODO: Check how to compare these 2 addresses
        // require(isAnAdmin || isTheOwner);
        require(isAnAdmin || !isTheOwner);
        _;
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
