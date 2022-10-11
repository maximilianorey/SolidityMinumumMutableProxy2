//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


import '@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol';

contract ERC20_P_2 is ERC20Upgradeable{
    function init() initializer external {
        __ERC20_init("HELLO","H");
    }
    function init2(string memory cName, string memory symbol) initializer external {
        __ERC20_init(cName,symbol);
    }
    function mint(address account, uint256 amount) public{
        _mint(account, amount);
    }
    function name() public pure override returns(string memory){
        return "ANOTHER NAME";
    }
}