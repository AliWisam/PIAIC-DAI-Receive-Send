require("@nomiclabs/hardhat-waffle");
require('dotenv').config()
require('@nomiclabs/hardhat-ethers');
require("@nomiclabs/hardhat-etherscan");
// const { mnemonic } = require('./secrets.json');

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**npx hardhat run scripts/deploy.js --network
 * @type import('hardhat/config').HardhatUserConfig
 */
 module.exports = {
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    hardhat: {
      chainId: 1337
    },
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/25663c11196d4eb696bd19bbf6b0796c",
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.5.15"
      },
      {
        version: "0.8.0",
        settings: { } 
      }
    ]
  },
  //ehtereum API key
  etherscan: {
    apiKey: "ZT7NMAJNR62F53F28IYHFABAFV1WST8U77",
  },
};
//0x386522c0B5D2A9738925997497A23b783519A600