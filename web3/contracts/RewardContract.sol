// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract RewardContract {
    mapping(address => uint256) public rewards;
    mapping(address => bool) public hasClaimedBadge;

    event RewardClaimed(address indexed user, uint256 amount);

    function claimReward(uint256 _amount) external {
        require(_amount > 0, "Amount must be greater than zero");
        rewards[msg.sender] += _amount;
        emit RewardClaimed(msg.sender, _amount);
    }

    function claimBadge() external {
        require(rewards[msg.sender] >= 100, "Insufficient points for a badge");
        require(!hasClaimedBadge[msg.sender], "Badge already claimed");
        
        hasClaimedBadge[msg.sender] = true;
        // Logic to assign badge (could be another contract or event)
    }

    function getReward() external view returns (uint256) {
        return rewards[msg.sender];
    }

    function hasClaimed() external view returns (bool) {
        return hasClaimedBadge[msg.sender];
    }
}

