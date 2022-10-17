/* eslint-disable sonarjs/no-duplicate-string */
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";

import { ProxyController__factory } from "../src/ControllerContract/ProxyController__factory";
import { ERC20Imp__factory } from "../src/typechain";

describe("MutableProxy", function () {
  it("Should deploy a proxy with controller and call to transparent functions of proxy, and later change implementation", async function () {
    const [wallet] = await ethers.getSigners();

    const controllerFactory = new ProxyController__factory(wallet);
    const controller = await controllerFactory.deploy();

    const erc20_1 = await (
      await ethers.getContractFactory("ERC20Imp")
    ).deploy();

    const tx = await (
      await controller.createProxy(wallet.address, erc20_1.address)
    ).wait();

    const proxyAddr = tx.events![0].args![0];

    const ERC20Imp = ERC20Imp__factory.connect(proxyAddr, wallet);

    expect((await ERC20Imp.balanceOf(wallet.address)).isZero()).to.be.equal(
      true
    );
    await (await ERC20Imp.mint(wallet.address, "1000000000000000000")).wait();
    expect((await ERC20Imp.balanceOf(wallet.address)).toString()).to.be.equal(
      "1000000000000000000"
    );

    await (
      await ERC20Imp.transfer(
        "0x0000000000000000000000000000000000000001",
        "500000000000000000"
      )
    ).wait();

    expect((await ERC20Imp.balanceOf(wallet.address)).toString()).to.be.equal(
      "500000000000000000"
    );

    expect(
      (
        await ERC20Imp.balanceOf("0x0000000000000000000000000000000000000001")
      ).toString()
    ).to.be.equal("500000000000000000");

    expect(await ERC20Imp.something()).to.be.equal("HELLO");

    const erc20_2_instance = await (
      await ethers.getContractFactory("ERC20Imp_2")
    ).deploy();

    const txSI = await (
      await controller.setImplementation(
        ERC20Imp.address,
        erc20_2_instance.address
      )
    ).wait();

    expect(txSI.events![0].event!).to.be.equal("ImplementationChanged");
    expect(txSI.events![0].args![0]).to.be.equal(ERC20Imp.address);
    expect(txSI.events![0].args![1]).to.be.equal(erc20_2_instance.address);

    expect(await ERC20Imp.something()).to.be.equal("ANOTHER NAME");

    expect((await ERC20Imp.balanceOf(wallet.address)).toString()).to.be.equal(
      "500000000000000000"
    );

    expect(
      (
        await ERC20Imp.balanceOf("0x0000000000000000000000000000000000000001")
      ).toString()
    ).to.be.equal("500000000000000000");

    const invalidContract = new Contract(
      controller.address,
      [
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
          name: "invalidF",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      wallet
    );

    await expect(
      invalidContract.invalidF(
        ERC20Imp.address,
        "0x0000000000000000000000000000000000000001"
      )
    ).to.be.revertedWith("FUNCTION NOT EXISTS");

    const payableContract = new Contract(
      controller.address,
      [
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
          stateMutability: "payable",
          type: "function",
        },
      ],
      wallet
    );

    await expect(
      payableContract.setOwner(
        ERC20Imp.address,
        "0x0000000000000000000000000000000000000001",
        { value: "20" }
      )
    ).to.be.revertedWith("NOT PAYABLE FUNCTION");

    const txCO = await (
      await controller.setOwner(
        ERC20Imp.address,
        "0x0000000000000000000000000000000000000001"
      )
    ).wait();

    expect(txCO.events![0].event!).to.be.equal("OwnerChanged");
    expect(txCO.events![0].args![0]).to.be.equal(ERC20Imp.address);
    expect(txCO.events![0].args![1]).to.be.equal(
      "0x0000000000000000000000000000000000000001"
    );

    await expect(
      controller.setOwner(
        ERC20Imp.address,
        "0x0000000000000000000000000000000000000001"
      )
    ).to.be.revertedWith("CALLER IS NOT THE OWNER");

    await expect(
      controller.setImplementation(
        ERC20Imp.address,
        "0x0000000000000000000000000000000000000001"
      )
    ).to.be.revertedWith("CALLER IS NOT THE OWNER");
  });
});
