// interact.js
async function main() {
    // 读取部署的地址
    const addresses = require('../deployedAddresses.json');
    
    // 获取合约实例
    const rewardDistribution = await ethers.getContractAt(
        "RewardDistribution",
        addresses.rewardDistributionAddress
    );

    // 获取用户
    const [deployer, user1, user2] = await ethers.getSigners();

    // 测试分配奖励
    await rewardDistribution.allocateReward(
        addresses.user1,
        ethers.parseEther("100")
    );

    console.log("Reward allocated to:", addresses.user1);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});