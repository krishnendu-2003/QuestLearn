require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    fuji: {
      url: process.env.API_URL,
      chainId: 43113,
      accounts: [`0x`+ process.env.PRIVATE_KEY],
    },
  },
};