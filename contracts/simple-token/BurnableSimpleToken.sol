pragma solidity ^0.5.0;

import "../roles/AdminRole.sol";
import "./BasicSimpleToken.sol";

contract BurnableSimpleToken is BasicSimpleToken, AdminRole  {
    function burnSimpleToken(uint256 _id) public onlyAdmin {
        _burn(_id);
        delete _tokenList[_id];
        _tokenCounter--;
    }
}
