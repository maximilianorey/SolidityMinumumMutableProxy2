/*
    0x61 //-----BEGIN CONTRUCTOR-----
    0x03
    0x71 //PUSH LENGH OF CODE
    0x60
    0x00 // PUSH 0
    0x81 // DUP2 (LENGH OF CODE)
    0x60
    0x10 // PUSH 16 (LENGTH OF CONSTRUCTOR)
    0x82 // DUP3 (0)
    0x39 // CODECOPY
    0x30 // ADDRSS(this)
    0x61
    0x03
    0x2E // DIRECTION OF CONTROLLER ADDRESS IN PROXY
    0x52 // MSTORE
    0xF3 // RETURN
    0x36 //CALLDATASIZE -----BEGIN CONTROLLER----- 
    0x60
    0x0E // DIRECTION OF JUMPI 1
    0x57 //JUMPI
    0x33 // MSG.CALLER
    0x54 // SLOAD (GET IMPL)
    0x60
    0x00 // PUSH 0
    0x52 // MSTORE
    0x60
    0x20 //PUSH 32
    0x60
    0x00 // PUSH 0
    0xFD // REVERT
    0x5B // DEST JUMPI 1
    0x34 // callValue 
    0x61 
    0x01
    0xDF // PUSH DIRECTION NOT PAYABLE FUNCTION
    0x57 // JUMPI
    0x60
    0x00 // PUSH 0
    0x35 // CALLDATALOAD
    0x60
    0xE0 // PUSH 224
    0x1C // SHR
    0x80 // DUP1 (FUNCTION NAME)
    0x63
    0xfa
    0x54
    0x41
    0x61 // PUSH getOwner(address)
    0x14 // EQ
    0x60
    0x59 // DIRECTION OF JUMPI GET OWNER
    0x57 //JUMPI
    0x80 // DUP1 (FUNCTION NAME)
    0x63
    0x15
    0xac
    0x72
    0xca // PUSH getImplementation(address)
    0x14 // EQ
    0x60
    0x7D // DIRECTION OF JUMPI GET IMPLEMENTATION
    0x57 //JUMPI
    0x80 // DUP1 (FUNCTION NAME)
    0x63
    0x25
    0xb5
    0x67
    0x27 // PUSH createProxy(address,address)
    0x14 // EQ
    0x61
    0x01
    0x65 // DIRECTION OF JUMPI createProxy
    0x57 //JUMPI
    0x80 // DUP1 (FUNCTION NAME)
    0x63
    0x29
    0x9a
    0x7b
    0xcc // PUSH setOwner(address,address)
    0x14 // EQ
    0x60
    0x8A // DIRECTION OF JUMPI SET OWNER
    0x57 //JUMPI
    0x80 // DUP1 (FUNCTION NAME)
    0x63
    0x8f
    0x8f
    0xba
    0xb4 // PUSH setImplementation(address,address)
    0x14 // EQ
    0x60
    0xEA // DIRECTION OF JUMPI SET IMPLEMENTATION
    0x57 //JUMPI
    0x60 // BEGIN FUNCTION NOT EXISTS
    0x38 // LENGTH ERROR MESSAGE
    0x80 // DUP1 (LENGTH ERROR MESSAGE)
    0x61
    0x02
    0x6E // OFFSET (DIRECTION FUNCTION NOT EXISTS)
    0x60
    0x00 // DST OFFSET
    0x39 // CODECOPY
    0x60
    0x00 // PUSH 0
    0xFD // REVERT
    0x5B // DEST GET OWNER
    0x60
    0x04 // PUSH 4
    0x35 // CALLDATALOAD
    0x74
    0x01
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x17 //OR
    0x54 //SLOAD
    0x60
    0x00 //PUSH 0
    0x52 //MSTORE
    0x60
    0x20 //PUSH 32
    0x60
    0x00 // PUSH 0
    0xF3 // RETURN
    0x5B // DEST GET IMPLEMENTATION
    0x60
    0x04 // PUSH 4
    0x35 // CALLDATALOAD
    0x54 //SLOAD
    0x60
    0x00 //PUSH 0
    0x52 //MSTORE
    0x60
    0x20 //PUSH 32
    0x60
    0x00 // PUSH 0
    0xF3 // RETURN
    0x5B // DEST SET OWNER
    0x60
    0x04 // PUSH 4
    0x35 // CALLDATALOAD
    0x74
    0x01
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x17 //OR
    0x80 // DUP1
    0x54 //SLOAD
    0x33 // CALLER
    0x14 // EQ
    0x60
    0xB8 // PUSH DIRECTION OF JUMPI CALLER IS THE OWNER (SET OWNER)
    0x57 //JUMPI
    0x60
    0x3C // LENGTH ERROR CALLER IS NOT THE OWNER
    0x80 // DUP1 (LENGTH ERROR CALLER IS NOT THE OWNER)
    0x61
    0x01
    0xF9 // DIRECTION ERROR CALLER IS NOT THE OWNER
    0x60
    0x00 // PUSH 0
    0x39 // CODECOPY
    0x60
    0x00 // PUSH 0
    0xFD // REVERT
    0x5B //JUMPDST CALLER IS THE OWNER (SET OWNER)
    0x60
    0x24 // PUSH 36
    0x35 // CALLDATALOAD
    0x90 // SWAP1
    0x55 // SSTORE
    0x60
    0x24 // PUSH 36
    0x35 // CALLDATALOAD
    0x60
    0x04 // PUSH 4
    0x35 // CALLDATALOAD
    0x7F //PUSH OwnerChanged
    0xb5
    0x32
    0x07
    0x3b
    0x38
    0xc8
    0x31
    0x45
    0xe3
    0xe5
    0x13
    0x53
    0x77
    0xa0
    0x8b
    0xf9
    0xaa
    0xb5
    0x5b
    0xc0
    0xfd
    0x7c
    0x11
    0x79
    0xcd
    0x4f
    0xb9
    0x95
    0xd2
    0xa5
    0x15
    0x9c
    0x60
    0x00 // PUSH 0
    0x80 // DUP1 (0)
    0xA3 // LOG3
    0x00 // STOP
    0x5B // DEST SET IMPLEMENTATION
    0x60
    0x24 // PUSH 36
    0x35 // CALLDATALOAD
    0x80 // DUP1 (parameter implementation)
    0x80 // DUP1 (parameter implementation)
    0x3B // EXTCODESIZE
    0x61
    0x01
    0x01 // PUSH DIRECTION VALID CONTRACT (setImplementation)
    0x57 // JUMPI 
    0x60
    0x37 // LENGTH NOT VALID CONTRACT
    0x80 // DUP (LENGTH NOT VALID CONTRACT)
    0x61
    0x02
    0xA6 // DIRECTION NOT VALID CONTRACT
    0x60
    0x00 // PSUH 0
    0x39 // CODECOPY
    0x60
    0x00 // PSUH 0
    0xFD // REVERT
    0x5B // VALID CONTRACT (setImplementation)
    0x54 // SLOAD
    0x61
    0x01
    0xEC // PUSH DIRECTION IMPLEMENTATION IS PROXY CODE
    0x57 // JUMPI 
    0x60
    0x04 // PUSH 4
    0x35 // CALLDATALOAD
    0x74
    0x01
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x17 //OR
    0x54 //SLOAD
    0x33 // CALLER
    0x14 // EQ
    0x61
    0x01
    0x34 // PUSH DIRECTION OF JUMPI CALLER IS THE OWNER (SET IMPLEMENTATION)
    0x57 //JUMPI
    0x60
    0x3C // LENGTH ERROR CALLER IS NOT THE OWNER
    0x80 // DUP1 (LENGTH ERROR CALLER IS NOT THE OWNER)
    0x61
    0x01
    0xF9 // DIRECTION ERROR CALLER IS NOT THE OWNER
    0x60
    0x00 // PUSH 0
    0x39 // CODECOPY
    0x60
    0x00 // PUSH 0
    0xFD // REVERT
    0x5B //JUMPDST CALLER IS THE OWNER (SET IMPLEMENTATION)
    0x60
    0x04 // PUSH 4
    0x35 // CALLDATALOAD
    0x55 // SSTORE
    0x60
    0x24 // PUSH 36
    0x35 // CALLDATALOAD
    0x60
    0x04 // PUSH 4
    0x35 // CALLDATALOAD
    0x7F //PUSH ImplementationChanged
    0xcf
    0xbf
    0x40
    0x28
    0xad
    0xd9
    0x31
    0x8b
    0xbf
    0x71
    0x6f
    0x08
    0xc3
    0x48
    0x59
    0x5a
    0xfb
    0x06
    0x3b
    0x0e
    0x9f
    0xee
    0xd1
    0xf8
    0x6d
    0x33
    0x68
    0x1a
    0x4b
    0x3e
    0xd4
    0xd3
    0x60
    0x00 // PUSH 0
    0x80 // DUP1 (0)
    0xA3 // LOG3
    0x00 // STOP
    0x5B //DIRECTION OF JUMPI createProxy(address,address)
    0x60
    0x24 // PUSH 36
    0x35 // CALLDATALOAD
    0x80 // DUP1 (parameter implementation)
    0x3B // EXTCODESIZE
    0x61
    0x01
    0x7B // PUSH DIRECTION VALID CONTRACT (createProxy)
    0x57 // JUMPI 
    0x60
    0x37 // LENGTH NOT VALID CONTRACT
    0x80 // DUP (LENGTH NOT VALID CONTRACT)
    0x61
    0x02
    0xA6 // DIRECTION NOT VALID CONTRACT
    0x60
    0x00 // PSUH 0
    0x39 // CODECOPY
    0x60
    0x00 // PSUH 0
    0xFD // REVERT
    0x5B // VALID CONTRACT (createProxy)
    0x54 //SLOAD
    0x61
    0x01
    0xEC // PUSH DIRECTION IMPLEMENTATION IS PROXY CODE
    0x57 // JUMPI
    0x60
    0x56 // PUSH LENGTH OF PROXY CODE
    0x80 // DUP1 (LENGTH OF PROXY CODE)
    0x61
    0x03
    0x1B // PUSH DIRECTION OF PROXY CODE
    0x60
    0x00 // PUSH 0
    0x39 // CODECOPY
    0x60
    0x00 // PUSH 0
    0x80 // DUP1 (0)
    0xF0 // CREATE
    0x60
    0x24 // PUSH 36
    0x35 // CALLDATALOAD
    0X80 // DUP1 (implementation)
    0x82 // DUP3 (CONTRACT ADDRESS)
    0x55 // SSTORE
    0x60
    0x04 // PUSH 4
    0x35 // CALLDATALOAD (owner)
    0x80 // DUP2 (owner)
    0x83 // DUP4 (CONTRACT ADDRESS)
    0x74
    0x01
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x17 // OR
    0x55 // SSTORE
    0x82 // DUP3 (CONTRACT ADDRESS)
    0x7F // PUSH ContractCreated
    0x12
    0x02
    0xc6
    0x1d
    0x7d
    0x89
    0xc7
    0x6b
    0xa1
    0x49
    0x3b
    0x08
    0x57
    0x33
    0xed
    0xe0
    0x4e
    0x07
    0x1a
    0x2a
    0x76
    0xbb
    0x0F
    0xba
    0xe1
    0x34
    0x5f
    0x12
    0x8f
    0xe8
    0xb2
    0x9d
    0x60
    0x00 // PUSH 0
    0x80 // DUP1 (0)
    0xa4 // LOG4
    0x60
    0x00 // PUSH 0
    0x52 // MSTORE
    0x60
    0x20 // PUSH 32
    0x60
    0x00 // PUSH 0
    0xf3 // RETURN
    0x5B // DEST NOT PAYABLE FUNCTION
    0x60
    0x39 // LENGTH OF ERROR MESSAGE
    0x80 // DUP1 (LENGTH OF ERROR MESSAGE)
    0x61
    0x02
    0x35 // OFFSET (DIRECTION NOT PAYABLE FUNCTION)
    0x60
    0x00 // DST OFFSET
    0x39 // CODECOPY
    0x60
    0x00 // PUSH 0
    0xFD // REVERT
    0x5B // IMPLEMENTATION IS PROXY CODE
    0x60
    0x3E // LENGTH IMPLEMENTATION IS A PROXY
    0x80 // DUP1 (IMPLEMENTATION IS A PROXY)
    0x61
    0x02
    0xDD // DIRECTION IMPLEMENTATION IS A PROXY
    0x60
    0x00 // PUSH 0
    0x39 // CODECOPY
    0x60
    0x00 // PUSH 0
    0xFD //REVERT
    0x08 // START CALLER IS NOT THE OWNER
    0xc3
    0x79
    0xa0
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x01
    0x17
    0x43
    0x41
    0x4c
    0x4c
    0x45
    0x52
    0x20
    0x49
    0x53
    0x20
    0x4e
    0x4f
    0x54
    0x20
    0x54
    0x48
    0x45
    0x20
    0x4f
    0x57
    0x4e
    0x45
    0x52
    0x08 // START NOT PAYABLE FUNCTION
    0xc3
    0x79
    0xa0
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x01
    0x14
    0x4e 
    0x4f
    0x54
    0x20
    0x50
    0x41
    0x59
    0x41
    0x42
    0x4c
    0x45
    0x20
    0x46
    0x55
    0x4e
    0x43
    0x54
    0x49
    0x4f
    0x4e
    0x08 // START FUNCTION NOT EXISTS
    0xc3
    0x79
    0xa0
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x01
    0x13
    0x46
    0x55
    0x4e
    0x43
    0x54
    0x49
    0x4f
    0x4e
    0x20
    0x4e
    0x4f
    0x54
    0x20
    0x45
    0x58
    0x49
    0x53
    0x54
    0x53
    0x08 // START NOT VALID CONTRACT
    0xc3
    0x79
    0xa0
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x01
    0x12
    0x4e
    0x4f
    0x54
    0x20
    0x56
    0x41
    0x4c
    0x49
    0x44
    0x20
    0x43
    0x4f
    0x4e
    0x54
    0x52
    0x41
    0x43
    0x54
    0x08 // START IMPLEMENTATION IS A PROXY
    0xc3
    0x79
    0xa0
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x01
    0x19
    0x49
    0x4d
    0x50
    0x4c
    0x45
    0x4d
    0x45
    0x4e
    0x54
    0x41
    0x54
    0x49
    0x4f
    0x4e
    0x20
    0x49
    0x53
    0x20
    0x41
    0x20
    0x50
    0x52
    0x4f
    0x58
    0x59
    0x60 // -----BEGIN PROXY CONSTRUCTOR-----
    0x4B // PUSH PROXY LENGTH
    0x80 // DUP1 (PROXY LENGTH)
    0x60
    0x0B // CONTRUCTOR LENGTH
    0x60
    0x00 // PUSH 0
    0x39 // CODECOPY
    0x60
    0x00 // PUSH 0
    0xF3 // RETURN
    0x60 // -----BEGIN PROXY CODE-----
    0x20 // PUSH 20 (RET LENGTH)
    0x60
    0x00 // PUSH 0 (RET OFFSET)
    0x60
    0x00 // PUSH 0 (ARGS LENGTH)
    0x80 // DUP1 (0) (ARGS OFFSET)
    0x7F // push32. The following zeros will be overwritten by the address of controller
    0x00 // CONTROLLER ADDRESS IN PROXY
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x00
    0x5A // GAS
    0xFA // STATIC CALL
    0x60
    0x00 // PUSH 0
    0x51 // MLOAD
    0x36 // call data size
    0x60
    0x00 // PUSH 0
    0x80 // DUP1 (0)
    0x37 // calldatacopy
    0x36 // call data size (ret offset)
    0x36 // call data size (args length)
    0x60
    0x00 // PUSH 0 (ARGS OFFSET)
    0x80 // DUP1 (0) (RET LENGTH)
    0x93 // SWAP4
    0x5A // gas
    0xF4 // delegate call
    0x3D //returnDataSize
    0x60
    0x00
    0x80 //DUP1 (0) (ret offset)
    0x3E //return data copy
    0x60
    0x46 // push 58
    0x57 //jumpi
    0x3D //returnDataSize
    0x60
    0x00 // PUSH 0 (ret offset)
    0xFD //revert
    0x5B //jumpdest
    0x3D //returnDataSize
    0x60
    0x00 // PUSH 0 (ret offset)
    0xF3 //return
*/

import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides, Signer, utils } from "ethers";

import type {
  ProxyController,
  ProxyControllerInterface,
} from "./ProxyController";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "contr",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "impl",
        type: "address",
      },
    ],
    name: "ContractCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "contr",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newImp",
        type: "address",
      },
    ],
    name: "ImplementationChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "contr",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnerChanged",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "impl",
        type: "address",
      },
    ],
    name: "createProxy",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "getImplementation",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "getOwner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
    ],
    name: "setImplementation",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "setOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "610371600081601082393061032E52F336600E57335460005260206000FD5B346101DF5760003560E01C8063fa54416114605957806315ac72ca14607D57806325b5672714610165578063299a7bcc14608A5780638f8fbab41460EA5760388061026E6000396000FD5B60043574010000000000000000000000000000000000000000175460005260206000F35B6004355460005260206000F35B60043574010000000000000000000000000000000000000000178054331460B857603C806101F96000396000FD5B60243590556024356004357Fb532073b38c83145e3e5135377a08bf9aab55bc0fd7c1179cd4fb995d2a5159c600080A3005B60243580803B610101576037806102A66000396000FD5B546101EC57600435740100000000000000000000000000000000000000001754331461013457603C806101F96000396000FD5B600435556024356004357Fcfbf4028add9318bbf716f08c348595afb063b0e9feed1f86d33681a4b3ed4d3600080A3005B602435803B61017B576037806102A66000396000FD5B546101EC5760568061031B600039600080F06024358082556004358083740100000000000000000000000000000000000000001755827F1202c61d7d89c76ba1493b085733ede04e071a2a76bb0Fbae1345f128fe8b29d600080a460005260206000f35B6039806102356000396000FD5B603E806102DD6000396000FD08c379a000000000000000000000000000000000000000000000000000000000000000011743414c4c4552204953204e4f5420544845204f574e455208c379a00000000000000000000000000000000000000000000000000000000000000001144e4f542050415941424c452046554e4354494f4e08c379a000000000000000000000000000000000000000000000000000000000000000011346554e4354494f4e204e4f542045584953545308c379a00000000000000000000000000000000000000000000000000000000000000001124e4f542056414c494420434f4e545241435408c379a0000000000000000000000000000000000000000000000000000000000000000119494d504c454d454e544154494f4e20495320412050524f5859604B80600B6000396000F3602060006000807F00000000000000000000000000000000000000000000000000000000000000005AFA60005136600080373636600080935AF43D6000803E6046573D6000FD5B3D6000F3";

export class ProxyController__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ProxyController> {
    return super.deploy(overrides || {}) as Promise<ProxyController>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): ProxyController {
    return super.attach(address) as ProxyController;
  }
  connect(signer: Signer): ProxyController__factory {
    return super.connect(signer) as ProxyController__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ProxyControllerInterface {
    return new utils.Interface(_abi) as ProxyControllerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ProxyController {
    return new Contract(address, _abi, signerOrProvider) as ProxyController;
  }
}
