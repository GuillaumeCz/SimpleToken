pragma solidity ^0.5.0;

contract AccessControl {
    mapping(address => bool) internal adminList;

    modifier onlyAdmin() {
        require(adminList[msg.sender]);
        _;
    }

    constructor() public {
        adminList[msg.sender] = true;
    }

    function addAdmin(address _addr) public onlyAdmin {
        adminList[_addr] = true;
    }

    function removeAdmin(address _addr) public onlyAdmin {
        adminList[_addr] = false;
    }

    function isAdmin(address _addr) public view returns (bool isAdmin_) {
        isAdmin_ = adminList[_addr];
    }
}
