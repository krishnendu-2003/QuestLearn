import React, { useEffect, useState } from "react";
import { claimReward, claimBadge, getReward, hasClaimed } from "../services/SmartContractService";

const RewardComponent = () => {
    const [reward, setReward] = useState(0);
    const [claimed, setClaimed] = useState(false);

    useEffect(() => {
        const fetchReward = async () => {
            const reward = await getReward();
            setReward(reward);
        };

        const checkClaimStatus = async () => {
            const status = await hasClaimed();
            setClaimed(status);
        };

        fetchReward();
        checkClaimStatus();
    }, []);

    const handleClaimReward = async () => {
        await claimReward(10); // Claim 10 units of reward
        const newReward = await getReward();
        setReward(newReward);
    };

    const handleClaimBadge = async () => {
        await claimBadge();
        const status = await hasClaimed();
        setClaimed(status);
    };

    return (
        <div>
            <h1>Reward Component</h1>
            <p>Current Reward: {reward} ETH</p>
            <button onClick={handleClaimReward}>Claim Reward</button>
            {!claimed ? (
                <button onClick={handleClaimBadge}>Claim Badge</button>
            ) : (
                <p>Badge claimed!</p>
            )}
        </div>
    );
};

export default RewardComponent;
