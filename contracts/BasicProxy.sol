//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/proxy/Proxy.sol";

contract BasicProxy is Proxy{
    address private _owner_addr;
    address private _implementation_addr;
    constructor(address owner, address implementation){
        _owner_addr = owner;
        _implementation_addr = implementation;
    }

    function setOwner(address owner) public{
        require(msg.sender==_owner_addr);
        _owner_addr = owner;
    }

    function setImplementation(address implementation) public{
        require(msg.sender==_owner_addr);
        _implementation_addr = implementation;
    }

    function _implementation() internal view virtual override returns (address){
        return _implementation_addr;
    }
}