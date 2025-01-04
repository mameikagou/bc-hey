const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("RewardDistribution", function () {
    let RewardDistribution, rewardDistribution;
    let MockERC20, rewardToken;
    let admin, user1, user2;
    const initialSupply = ethers.parseEther("10000");
    const rewardAmount = ethers.parseEther("100");

    beforeEach(async function () {
        // 获取测试账户
        [admin, user1, user2] = await ethers.getSigners();

        // 部署 MockERC20 代币
        MockERC20 = await ethers.getContractFactory("MockERC20");
        rewardToken = await MockERC20.deploy(
            "Reward Token",
            "RWD",
            initialSupply
        );
        await rewardToken.waitForDeployment();

        // 部署奖励分发合约
        RewardDistribution = await ethers.getContractFactory("RewardDistribution");
        rewardDistribution = await RewardDistribution.deploy(await rewardToken.getAddress());
        await rewardDistribution.waitForDeployment();

        // 转移代币到奖励合约
        await rewardToken.transfer(
            await rewardDistribution.getAddress(), 
            ethers.parseEther("5000")
        );
    });

    describe("Basic Functions", function () {
        it("Should set the right admin", async function () {
            expect(await rewardDistribution.admin()).to.equal(admin.address);
        });

        it("Should set the right token", async function () {
            expect(await rewardDistribution.rewardToken()).to.equal(
                await rewardToken.getAddress()
            );
        });
    });

    describe("Reward Allocation", function () {
        it("Should allocate rewards correctly", async function () {
            await rewardDistribution.allocateReward(
                user1.address, 
                rewardAmount
            );
            
            const reward = await rewardDistribution.getUserReward(user1.address);
            expect(reward).to.equal(rewardAmount);
        });

        it("Should emit RewardAllocated event", async function () {
            const tx = await rewardDistribution.allocateReward(user1.address, rewardAmount);
            const receipt = await tx.wait();
            
            const event = receipt.logs[0];
            const decodedEvent = rewardDistribution.interface.parseLog(event);
            
            expect(decodedEvent.name).to.equal("RewardAllocated");
            expect(decodedEvent.args[0]).to.equal(user1.address);
            expect(decodedEvent.args[1]).to.equal(rewardAmount);
        });

        it("Should fail if non-admin tries to allocate", async function () {
            await expect(
                rewardDistribution.connect(user1).allocateReward(user2.address, rewardAmount)
            ).to.be.revertedWith("Only admin can call this function");
        });
    });

    describe("Reward Claiming", function () {
        beforeEach(async function () {
            await rewardDistribution.allocateReward(user1.address, rewardAmount);
        });

        it("Should emit RewardClaimed event", async function () {
            const tx = await rewardDistribution.connect(user1).claimReward();
            const receipt = await tx.wait();
            
            // 找到 RewardClaimed 事件
            const rewardClaimedEvent = receipt.logs.find(log => {
                try {
                    const decoded = rewardDistribution.interface.parseLog(log);
                    return decoded.name === "RewardClaimed";
                } catch {
                    return false;
                }
            });
            
            const decodedEvent = rewardDistribution.interface.parseLog(rewardClaimedEvent);
            expect(decodedEvent.name).to.equal("RewardClaimed");
            expect(decodedEvent.args[0]).to.equal(user1.address);
            expect(decodedEvent.args[1]).to.equal(rewardAmount);
        });
    });
});
