pragma solidity ^0.5.0;

import "@openzeppelin/contracts/access/Roles.sol";
import "./UserRole.sol";

contract AdminRole is UserRole {
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

    function addAdmin(address _addr) public onlyAdmin {
        _addAdmin(_addr);
        _addUser(_addr);
    }

    function isAdmin(address _addr) public view returns (bool) {
        return _admins.has(_addr);
    }

    function removeAdmin(address _addr) public onlyAdmin {
        _removeAdmin(_addr);
    }

    function addUser(address _addr) public onlyAdmin {
        _addUser(_addr);
    }

    function removeUser(address _addr) public onlyAdmin {
        _removeUser(_addr);
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
