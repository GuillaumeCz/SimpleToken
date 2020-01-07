pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/access/Roles.sol";

contract AccessControl {
    using Roles for Roles.Role;

    Roles.Role private _users;
    Roles.Role private _admins;

    modifier onlyAdmin() {
        require(_admins.has(msg.sender), "DOES_NOT_HAVE_ADMIN_ROLE");
        _;
    }

    modifier existsAsUser(address _user) {
        require(_users.has(_user), "DOES_NOT_HAVE_USER_ROLE");
        _;
    }

    modifier onlyUser() {
        require(_users.has(msg.sender), "DOES_NOT_HAVE_USER_ROLE");
        _;
    }

    constructor() public {
        _admins.add(msg.sender);
        _users.add(msg.sender);
    }

    function addUser(address _addr) public onlyAdmin {
        _users.add(_addr);
    }

    function addAdmin(address _addr) public onlyAdmin {
        _admins.add(_addr);
        addUser(_addr);
    }

    function removeUser(address _addr) public onlyAdmin {
        _users.remove(_addr);
    }

    function removeAdmin(address _addr) public onlyAdmin {
        _admins.remove(_addr);
    }

    function isUser(address _addr) public view returns (bool) {
        return _users.has(_addr);
    }

    function isAdmin(address _addr) public view returns (bool) {
        return _admins.has(_addr);
    }
}
