/* eslint-disable sonarjs/no-duplicate-string */
import dotenv from "dotenv";
import { ethers, Wallet } from "ethers";

import { ProxyController__factory } from "./ControllerContract/ProxyController__factory";
import { BasicProxy__factory } from "./typechain/factories/BasicProxy__factory";
import { BasicUpgradeable__factory } from "./typechain/factories/BasicUpgradeable__factory";
import { ERC20Imp__factory } from "./typechain/factories/ERC20Imp__factory";

dotenv.config({ path: "./.env" });

let provider: ethers.providers.BaseProvider =
  new ethers.providers.JsonRpcProvider({
    url: "http://localhost:8545",
  });

if (process.argv[2] === "binance") {
  provider = new ethers.providers.JsonRpcProvider({
    url: "https://data-seed-prebsc-2-s2.binance.org:8545",
  });
} else if (process.argv[2] === "goerli") {
  if (!process.env.goerli_api_key) {
    console.error("GOERLI API KEY NOT CONFIGURED");
    process.exit(1);
  }
  provider = new ethers.providers.AlchemyProvider(
    "goerli",
    process.env.goerli_api_key
  );
} else if (process.argv[2] === "sepolia") {
  provider = ethers.providers.getDefaultProvider("sepolia");
} else if (process.argv[2] === "mumbai") {
  if (!process.env.mumbai_api_key) {
    console.error("MUMBAI API KEY NOT CONFIGURED");
    process.exit(1);
  }
  provider = new ethers.providers.AlchemyProvider(
    "maticmum",
    process.env.mumbai_api_key
  );
} else if (process.argv[2] === "rsk") {
  provider = new ethers.providers.JsonRpcProvider({
    url: "https://public-node.testnet.rsk.co",
  });
} else if (process.argv[2] === "fantom") {
  provider = new ethers.providers.JsonRpcProvider({
    url: "https://rpc.testnet.fantom.network/",
  });
} else if (process.argv[2] === "avalanche") {
  provider = new ethers.providers.JsonRpcProvider({
    url: "https://api.avax-test.network/ext/bc/C/rpc",
  });
} else if (process.argv[2] !== undefined) {
  console.error("INVALID NETWORK");
  process.exit(1);
}

ethers.providers.getDefaultProvider();

async function run() {
  const wallet = Wallet.fromMnemonic(process.env.mnemonic!).connect(provider);

  const zeppelingUpgradeableFactory = new BasicUpgradeable__factory(wallet);

  const zeppelingUpgradeable = await zeppelingUpgradeableFactory.deploy();

  await (await zeppelingUpgradeable.init()).wait();

  const erc20Factory = new ERC20Imp__factory(wallet);
  const erc20 = await erc20Factory.deploy();

  const basicProxyFactory = new BasicProxy__factory(wallet);
  const basicProxyAddr = (
    await basicProxyFactory.deploy(
      "0x0000000000000000000000000000000000000001",
      erc20.address
    )
  ).address;

  const controllerFactory = new ProxyController__factory(wallet);
  const controller = await controllerFactory.deploy();

  const tx = await (
    await controller.createProxy(
      "0x0000000000000000000000000000000000000001",
      erc20.address
    )
  ).wait();

  const myProxyAddr = tx.events![0].args![0];

  const basicProxy = ERC20Imp__factory.connect(basicProxyAddr, wallet);
  const myProxy = ERC20Imp__factory.connect(myProxyAddr, wallet);

  console.log("MINT 20");
  console.log("\tWITHOUT PROXY");
  console.log(
    `\t\t${(await erc20.estimateGas.mint(wallet.address, "20")).toString()}`
  );
  console.log("\tZEPPELING UPGRADEABLE");
  console.log(
    `\t\t${(
      await zeppelingUpgradeable.estimateGas.mint(wallet.address, "20")
    ).toString()}`
  );
  console.log("\tOPEN ZEPELLING PROXY");
  console.log(
    `\t\t${(
      await basicProxy.estimateGas.mint(wallet.address, "20")
    ).toString()}`
  );
  console.log("\tMY PROXY");
  console.log(
    `\t\t${(await myProxy.estimateGas.mint(wallet.address, "20")).toString()}`
  );

  await (await erc20.mint(wallet.address, "20")).wait();
  await (await zeppelingUpgradeable.mint(wallet.address, "20")).wait();
  await (await basicProxy.mint(wallet.address, "20")).wait();
  await (await myProxy.mint(wallet.address, "20")).wait();

  console.log("MINT 20");
  console.log("\tWITHOUT PROXY");
  console.log(
    `\t\t${(await erc20.estimateGas.mint(wallet.address, "20")).toString()}`
  );
  console.log("\tZEPPELING UPGRADEABLE");
  console.log(
    `\t\t${(
      await zeppelingUpgradeable.estimateGas.mint(wallet.address, "20")
    ).toString()}`
  );
  console.log("\tOPEN ZEPELLING PROXY");
  console.log(
    `\t\t${(
      await basicProxy.estimateGas.mint(wallet.address, "20")
    ).toString()}`
  );
  console.log("\tMY PROXY");
  console.log(
    `\t\t${(await myProxy.estimateGas.mint(wallet.address, "20")).toString()}`
  );

  await (await erc20.mint(wallet.address, "20")).wait();
  await (await zeppelingUpgradeable.mint(wallet.address, "20")).wait();
  await (await basicProxy.mint(wallet.address, "20")).wait();
  await (await myProxy.mint(wallet.address, "20")).wait();

  console.log("TRANSFER PART:");
  console.log("\tWITHOUT PROXY");
  console.log(
    `\t\t${(
      await erc20.estimateGas.transfer(
        "0x0000000000000000000000000000000000000001",
        "15"
      )
    ).toString()}`
  );
  console.log("\tZEPPELING UPGRADEABLE");
  console.log(
    `\t\t${(
      await zeppelingUpgradeable.estimateGas.transfer(
        "0x0000000000000000000000000000000000000001",
        "15"
      )
    ).toString()}`
  );
  console.log("\tOPEN ZEPELLING PROXY");
  console.log(
    `\t\t${(
      await basicProxy.estimateGas.transfer(
        "0x0000000000000000000000000000000000000001",
        "15"
      )
    ).toString()}`
  );
  console.log("\tMY PROXY");
  console.log(
    `\t\t${(
      await myProxy.estimateGas.transfer(
        "0x0000000000000000000000000000000000000001",
        "15"
      )
    ).toString()}`
  );

  await (
    await erc20.transfer("0x0000000000000000000000000000000000000001", "15")
  ).wait();
  await (
    await zeppelingUpgradeable.transfer(
      "0x0000000000000000000000000000000000000001",
      "15"
    )
  ).wait();
  await (
    await basicProxy.transfer(
      "0x0000000000000000000000000000000000000001",
      "15"
    )
  ).wait();
  await (
    await myProxy.transfer("0x0000000000000000000000000000000000000001", "15")
  ).wait();

  console.log("TRANSFER TOTAL");
  console.log("\tWITHOUT PROXY");
  console.log(
    `\t\t${(
      await erc20.estimateGas.transfer(
        "0x0000000000000000000000000000000000000001",
        "5"
      )
    ).toString()}`
  );
  console.log("\tZEPPELING UPGRADEABLE");
  console.log(
    `\t\t${(
      await zeppelingUpgradeable.estimateGas.transfer(
        "0x0000000000000000000000000000000000000001",
        "5"
      )
    ).toString()}`
  );
  console.log("\tOPEN ZEPELLING PROXY");
  console.log(
    `\t\t${(
      await basicProxy.estimateGas.transfer(
        "0x0000000000000000000000000000000000000001",
        "5"
      )
    ).toString()}`
  );
  console.log("\tMY PROXY");
  console.log(
    `\t\t${(
      await myProxy.estimateGas.transfer(
        "0x0000000000000000000000000000000000000001",
        "5"
      )
    ).toString()}`
  );
}

run().catch((error) => console.error(error));
