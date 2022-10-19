//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./DummyProxyController.sol";
import "./ERC20Imp.sol";
import "./ERC20Imp_2.sol";

contract Test{
    function compareStrings(string memory a, string memory b) private pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
    }

    function test() public {
        address addr = address(0);
        uint256[23] memory codeController;
        assembly{
            mstore(codeController,0x6102BB600081601082393061027852F336600E57335460005260206000FD5B34)
            mstore(add(32,codeController),0x6101AB5760003560E01C8063fa54416114605957806315ac72ca14607D578063)
            mstore(add(64,codeController),0x25b567271461014C578063299a7bcc14608A5780638f8fbab41460EA57603880)
            mstore(add(96,codeController),0x61022D6000396000FD5B60043574010000000000000000000000000000000000)
            mstore(add(128,codeController),0x000000175460005260206000F35B6004355460005260206000F35B6004357401)
            mstore(add(160,codeController),0x0000000000000000000000000000000000000000178054331460B857603C8061)
            mstore(add(192,codeController),0x01B86000396000FD5B60243590556024356004357Fb532073b38c83145e3e513)
            mstore(add(224,codeController),0x5377a08bf9aab55bc0fd7c1179cd4fb995d2a5159c600080A3005B6024356004)
            mstore(add(256,codeController),0x35740100000000000000000000000000000000000000001754331461011B5760)
            mstore(add(288,codeController),0x3C806101B86000396000FD5B600435556024356004357Fcfbf4028add9318bbf)
            mstore(add(320,codeController),0x716f08c348595afb063b0e9feed1f86d33681a4b3ed4d3600080A3005B605680)
            mstore(add(352,codeController),0x610265600039600080F060243580825560043580837401000000000000000000)
            mstore(add(384,codeController),0x00000000000000000000001755827F1202c61d7d89c76ba1493b085733ede04e)
            mstore(add(416,codeController),0x071a2a76bb0Fbae1345f128fe8b29d600080a460005260206000f35B60398061)
            mstore(add(448,codeController),0x01F46000396000FD08c379a00000000000000000000000000000000000000000)
            mstore(add(480,codeController),0x0000000000000000000000011743414c4c4552204953204e4f5420544845204f)
            mstore(add(512,codeController),0x574e455208c379a0000000000000000000000000000000000000000000000000)
            mstore(add(544,codeController),0x0000000000000001144e4f542050415941424c452046554e4354494f4e08c379)
            mstore(add(576,codeController),0xa000000000000000000000000000000000000000000000000000000000000000)
            mstore(add(608,codeController),0x011346554e4354494f4e204e4f5420455849535453604B80600B6000396000F3)
            mstore(add(640,codeController),0x602060006000807F000000000000000000000000000000000000000000000000)
            mstore(add(672,codeController),0x00000000000000005AFA60005136600080373636600080935AF43D6000803E60)
            mstore(add(704,codeController),0x46573D6000FD5B3D6000F3000000000000000000000000000000000000000000)
            addr := create(0,codeController,715)
        }
        DummyProxyController controller = DummyProxyController(addr);
        //controller.setOwner(address(1), address(1));
        require(controller.getOwner(address(1))==address(0),"TEST NOT PASS");        
        require(controller.getImplementation(address(1))==address(0),"TEST NOT PASS");

        address erc20 = address(new ERC20Imp());

        address proxyDirection = controller.createProxy(address(this), erc20);

        ERC20Imp proxy = ERC20Imp(proxyDirection);

        require(controller.getOwner(proxyDirection)==address(this),"TEST NOT PASS");        
        require(controller.getImplementation(proxyDirection)==erc20,"TEST NOT PASS");

        require(proxy.balanceOf(address(this))==0,"BALANCE SHOULD BE 0");

        proxy.mint(address(this), 20);

        require(proxy.balanceOf(address(this))==20,"BALANCE SHOULD BE 0");


        proxy.transfer(address(1), 5);

        require(proxy.balanceOf(address(this))==15,"BALANCE SHOULD BE 0");

        require(compareStrings(proxy.something(),"HELLO"));

        address erc20_2 = address(new ERC20Imp_2());

        controller.setImplementation(proxyDirection, erc20_2);

        require(proxy.balanceOf(address(this))==15,"BALANCE SHOULD BE 0");
        require(compareStrings(proxy.something(),"ANOTHER NAME"));
    }
}