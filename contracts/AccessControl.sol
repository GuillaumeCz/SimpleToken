pragma solidity ^0.5.0;

contract AccessControl {
    mapping(address => bool) internal userList;

    modifier onlyUser() {
        require(userList[msg.sender]);
        _;
    }

    constructor() public {
        userList[msg.sender] = true;
    }

    function addUser(address _addr) public onlyUser {
        userList[_addr] = true;
    }

    function removeUser(address _addr) public onlyUser {
        userList[_addr] = false;
    }

    function isUser(address _addr) public view returns (bool isUser_) {
        isUser_ = userList[_addr];
    }
}
