async function main() {
    try {
        // 获取部署账户和其他测试账户
        const [deployer, user1, user2] = await ethers.getSigners();
        console.log("Deployer address:", await deployer.getAddress());
        console.log("User1 address:", await user1.getAddress());
        console.log("User2 address:", await user2.getAddress());

        // 部署 MockERC20
        const MockToken = await ethers.getContractFactory("MockERC20");
        const token = await MockToken.deploy(
            "Reward Token",
            "RWD",
            ethers.parseEther("1000000")
        );
        await token.waitForDeployment();
        const tokenAddress = await token.getAddress();
        console.log("\nToken deployed successfully");
        console.log("Token address:", tokenAddress);

        // 部署 RewardDistribution
        console.log("\nStarting RewardDistribution deployment...");
        const RewardDistribution = await ethers.getContractFactory("RewardDistribution");
        const rewardDistribution = await RewardDistribution.deploy(tokenAddress);
        await rewardDistribution.waitForDeployment();
        const rewardAddress = await rewardDistribution.getAddress();
        console.log("RewardDistribution deployed to:", rewardAddress);

        // 将合约地址保存到文件中，方便后续使用
        const fs = require('fs');
        const addresses = {
            tokenAddress: tokenAddress,
            rewardDistributionAddress: rewardAddress,
            deployer: await deployer.getAddress(),
            user1: await user1.getAddress(),
            user2: await user2.getAddress()
        };

        fs.writeFileSync(
            'deployedAddresses.json',
            JSON.stringify(addresses, null, 2)
        );
        console.log("\nAddresses saved to deployedAddresses.json");

    } catch (error) {
        console.error("Detailed error:", error);
        throw error;
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});