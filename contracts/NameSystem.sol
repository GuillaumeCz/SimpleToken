pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

import "./AccessControl.sol";

contract NameSystem is AccessControl {
    uint256 internal recordCount = 0;

    struct Record {
        uint256 index;
        string name;
        address addr;
    }

    mapping(string => Record) internal nameToRecord;
    mapping(address => Record) internal addrToRecord;
    mapping(uint256 => Record) internal indexRecord;

    function getRecordByAddr(address _addr) public view returns (Record memory record_) {
        require(_addr != address(0));
        record_ = addrToRecord[_addr];
    }

    function getRecordByName(string memory _name) public view returns (Record memory record_) {
        require(bytes(_name).length != 0);
        record_ = nameToRecord[_name];
    }

    function addRecord(address _addr, string memory _name)
        public
        onlyAdmin
        returns (bool success_)
    {
        /*require(
            nameToRecord[_name] == address(0) &&
                bytes(addrToName[_addr]).length == 0
        );*/
       Record memory record = Record(recordCount, _name, _addr);

        addrToRecord[_addr] = record;
        nameToRecord[_name] = record;
        indexRecord[recordCount] = record;
        recordCount++;
        success_ = true;
    }

    function getRecord(uint256 _id)
        public
        view
        returns (Record memory record)
    {
        record = indexRecord[_id];
    }

    function getRecordCount() public view returns (uint256 counter_) {
        counter_ = recordCount;
    }

}
