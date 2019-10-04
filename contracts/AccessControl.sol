pragma solidity ^0.5.0;

contract AccessControl {
    mapping(address => bool) internal userList;
    mapping(address => bool) internal adminList;

    modifier onlyAdmin() {
        require(adminList[msg.sender]);
        _;
    }

    modifier existsAsUser(address _user) {
      require(userList[_user]);
        _;
    }

    modifier onlyUser() {
        require(userList[msg.sender]);
        _;
    }

    constructor() public {
        adminList[msg.sender] = true;
        userList[msg.sender] = true;
    }

    function addUser(address _addr) public onlyAdmin {
        userList[_addr] = true;
    }

    function addAdmin(address _addr) public onlyAdmin {
        adminList[_addr] = true;
        addUser(_addr);
    }

    function removeUser(address _addr) public onlyAdmin {
        userList[_addr] = false;
    }

    function removeAdmin(address _addr) public onlyAdmin {
        adminList[_addr] = false;
    }

    function isUser(address _addr) public view returns (bool isUser_) {
        isUser_ = userList[_addr];
    }

    function isAdmin(address _addr) public view returns (bool isAdmin_) {
        isAdmin_ = adminList[_addr];
    }
}
