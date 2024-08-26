const hre = require("hardhat");

async function main() {
  // Deploy the RewardContract
  const deployedContract = await hre.ethers.deployContract("RewardContract");

  // Wait for the deployment to be mined
  await deployedContract.waitForDeployment();

  // Log the deployed contract address
  console.log(`RewardContract deployed to ${deployedContract.target}`);
}

// Catch errors and exit the process with failure code
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
