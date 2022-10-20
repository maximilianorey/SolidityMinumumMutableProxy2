import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";

import { ProxyController__factory } from "../src/ControllerContract/ProxyController__factory";

describe("MutableProxy", function () {
  it("Should deploy a proxy with controller and call to transparent functions of proxy, and later change implementation", async function () {
    const [wallet] = await ethers.getSigners();

    const controllerFactory = new ProxyController__factory(wallet);
    const controller = await controllerFactory.deploy();

    const erc20Factory = await ethers.getContractFactory("ERC20Imp");
    const erc20_1 = await erc20Factory.deploy();

    const tx = await (
      await controller.createProxy(wallet.address, erc20_1.address)
    ).wait();

    expect(tx.events![0].event).to.be.equal("ContractCreated");
    expect(tx.events![0].args![1]).to.be.equal(wallet.address);
    expect(tx.events![0].args![2]).to.be.equal(erc20_1.address);

    const proxyAddr = tx.events![0].args![0];

    const proxy = erc20Factory.attach(proxyAddr);

    expect((await proxy.balanceOf(wallet.address)).isZero()).to.be.equal(true);
    await (await proxy.mint(wallet.address, "1000000000000000000")).wait();
    expect((await proxy.balanceOf(wallet.address)).toString()).to.be.equal(
      "1000000000000000000"
    );

    await (
      await proxy.transfer(
        "0x0000000000000000000000000000000000000001",
        "500000000000000000"
      )
    ).wait();

    expect((await proxy.balanceOf(wallet.address)).toString()).to.be.equal(
      "500000000000000000"
    );

    expect(
      (
        await proxy.balanceOf("0x0000000000000000000000000000000000000001")
      ).toString()
    ).to.be.equal("500000000000000000");

    expect(await proxy.something()).to.be.equal("HELLO");

    const erc20_2_instance = await (
      await ethers.getContractFactory("ERC20Imp_2")
    ).deploy();

    const txSI = await (
      await controller.setImplementation(
        proxy.address,
        erc20_2_instance.address
      )
    ).wait();

    expect(txSI.events![0].event!).to.be.equal("ImplementationChanged");
    expect(txSI.events![0].args![0]).to.be.equal(proxy.address);
    expect(txSI.events![0].args![1]).to.be.equal(erc20_2_instance.address);

    expect(await proxy.something()).to.be.equal("ANOTHER NAME");

    expect((await proxy.balanceOf(wallet.address)).toString()).to.be.equal(
      "500000000000000000"
    );

    expect(
      (
        await proxy.balanceOf("0x0000000000000000000000000000000000000001")
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
        proxy.address,
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
        proxy.address,
        "0x0000000000000000000000000000000000000001",
        { value: "20" }
      )
    ).to.be.revertedWith("NOT PAYABLE FUNCTION");

    const txCO = await (
      await controller.setOwner(
        proxy.address,
        "0x0000000000000000000000000000000000000001"
      )
    ).wait();

    expect(txCO.events![0].event!).to.be.equal("OwnerChanged");
    expect(txCO.events![0].args![0]).to.be.equal(proxy.address);
    expect(txCO.events![0].args![1]).to.be.equal(
      "0x0000000000000000000000000000000000000001"
    );

    await expect(
      controller.setOwner(
        proxy.address,
        "0x0000000000000000000000000000000000000001"
      )
    ).to.be.revertedWith("CALLER IS NOT THE OWNER");

    await expect(
      controller.setImplementation(proxy.address, erc20_1.address)
    ).to.be.revertedWith("CALLER IS NOT THE OWNER");
  });
});
