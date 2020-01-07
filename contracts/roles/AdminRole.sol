pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/access/Roles.sol";
import "openzeppelin-solidity/contracts/access/roles/MinterRole.sol";

contract AdminRole {
    using Roles for Roles.Role;

    event AdminAdded(address indexed account);
    event AdminRemoved(address indexed account);

    Roles.Role private _admins;

    constructor() internal {
        _addAdmin(msg.sender);
    }

    modifier onlyAdmin() {
        require(isAdmin(msg.sender), "DOES_NOT_HAVE_ADMIN_ROLE");
        _;
    }

    function addAdmin(address _addr) public;

    function isAdmin(address _addr) public view returns (bool) {
        return _admins.has(_addr);
    }

    function removeAdmin(address _addr) public onlyAdmin {
        _removeAdmin(_addr);
    }

    function _addAdmin(address _addr) internal {
        _admins.add(_addr);
        emit AdminAdded(_addr);
    }

    function _removeAdmin(address _addr) internal {
        _admins.remove(_addr);
        emit AdminRemoved(_addr);
    }
}
