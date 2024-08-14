const { expect } = require("chai");

describe("RewardContract", function () {
    it("Should deploy and interact with the contract", async function () {
        const RewardContract = await ethers.getContractFactory("RewardContract");
        const rewardContract = await RewardContract.deploy();
        await rewardContract.deployed();

        const [owner] = await ethers.getSigners();

        // Check initial reward
        expect(await rewardContract.getReward()).to.equal(0);

        // Claim reward
        await rewardContract.claimReward(50);
        expect(await rewardContract.getReward()).to.equal(50);

        // Claim badge
        await rewardContract.claimReward(50); // Total reward should be 100 now
        await rewardContract.claimBadge();
        expect(await rewardContract.hasClaimed()).to.be.true;
    });
});
