const hre = require("hardhat");

async function main() {
    const RewardContract = await hre.ethers.getContractFactory("RewardContract");
    const rewardContract = await RewardContract.deploy();

    await rewardContract.deployed();

    console.log("RewardContract deployed to:", rewardContract.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});


// const hre = require("hardhat");

// async function main() {
//   const deployedContract = await hre.ethers.deployContract("Counter");
//   await deployedContract.waitForDeployment();
//   console.log(`Counter contract deployed to ${deployedContract.target}`);
// }

// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });