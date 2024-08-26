// import { ethers } from "ethers";
// import RewardContractABI from "../RewardContractABI.json";

// const CONTRACT_ADDRESS = "0xE15b7292eF850113e1F2285E4D64eD2613bebDb5";

// let provider;
// let contract;
// let signer;

// export const initializeContract = async () => {
//     if (!window.ethereum) {
//         throw new Error("MetaMask is required");
//     }

//     provider = new ethers.providers.Web3Provider(window.ethereum);
//     signer = provider.getSigner();
//     contract = new ethers.Contract(CONTRACT_ADDRESS, RewardContractABI, signer);
// };

// export const claimReward = async (amount) => {
//     if (!contract) await initializeContract();
//     const tx = await contract.claimReward(ethers.utils.parseUnits(amount.toString(), "ether"));
//     await tx.wait(); // Wait for transaction to be mined
// };

// export const claimBadge = async () => {
//     if (!contract) await initializeContract();
//     const tx = await contract.claimBadge();
//     await tx.wait(); // Wait for transaction to be mined
// };

// export const getReward = async () => {
//     if (!contract) await initializeContract();
//     const reward = await contract.getReward();
//     return ethers.utils.formatUnits(reward, "ether");
// };

// export const hasClaimed = async () => {
//     if (!contract) await initializeContract();
//     return await contract.hasClaimed();
// };
