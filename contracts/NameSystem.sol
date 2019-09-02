pragma solidity ^0.5.0;

import "./AccessControl.sol";

contract NameSystem is AccessControl {
    uint256 internal recordCount = 0;

    struct AddrNameRecord {
        string name;
        address addr;
    }

    mapping(string => address) internal nameToAddr;
    mapping(address => string) internal addrToName;
    mapping(uint256 => AddrNameRecord) internal indexRecord;

    function getName(address _addr) public view returns (string memory name_) {
        require(_addr != address(0));
        name_ = addrToName[_addr];
    }

    function getAddr(string memory _name) public view returns (address addr_) {
        require(bytes(_name).length != 0);
        addr_ = nameToAddr[_name];
    }

    function linkAddrToName(address _addr, string memory _name)
        public
        onlyAdmin
        returns (bool success_)
    {
        require(
            nameToAddr[_name] == address(0) &&
                bytes(addrToName[_addr]).length == 0
        );
        addrToName[_addr] = _name;
        nameToAddr[_name] = _addr;
        indexRecord[recordCount++] = AddrNameRecord(_name, _addr);
        success_ = true;
    }

    function getRecord(uint256 _id)
        public
        view
        returns (string memory name_, address addr_)
    {
        AddrNameRecord memory record = indexRecord[_id];
        name_ = record.name;
        addr_ = record.addr;
    }

    function getRecordCount() public view returns (uint256 counter_) {
        counter_ = recordCount;
    }

}
