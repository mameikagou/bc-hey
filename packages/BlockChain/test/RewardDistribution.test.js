const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("RewardDistribution Contract", function () {
  let RewardDistribution, rewardDistribution, MockERC20, rewardToken;
  let admin, user1, user2;

  beforeEach(async function () {
    // 获取 signers
    [admin, user1, user2] = await ethers.getSigners();

    // 部署 MockERC20 合约
    MockERC20 = await ethers.getContractFactory("MockERC20");
    rewardToken = await MockERC20.deploy(
      "RewardToken", // name
      "RWT",         // symbol
      18,            // decimals
      ethers.utils.parseEther("10000") // initial supply
    );
    await rewardToken.deployed();

    // 部署 RewardDistribution 合约
    RewardDistribution = await ethers.getContractFactory("RewardDistribution");
    rewardDistribution = await RewardDistribution.deploy(rewardToken.address);
    await rewardDistribution.deployed();

    // 将奖励代币转移到 RewardDistribution 合约
    await rewardToken.transfer(rewardDistribution.address, ethers.utils.parseEther("5000"));
  });

  it("should allocate rewards correctly", async function () {
    await rewardDistribution.allocateReward(user1.address, ethers.utils.parseEther("100"));
    const reward = await rewardDistribution.getUserReward(user1.address);
    expect(reward).to.equal(ethers.utils.parseEther("100"));
  });

  it("should allow users to claim rewards", async function () {
    await rewardDistribution.allocateReward(user1.address, ethers.utils.parseEther("100"));
    await rewardDistribution.connect(user1).claimReward();
    const reward = await rewardDistribution.getUserReward(user1.address);
    expect(reward).to.equal(ethers.utils.parseEther("0")); 
    const userBalance = await rewardToken.balanceOf(user1.address);
    expect(userBalance).to.equal(ethers.utils.parseEther("100"));
  });
});
