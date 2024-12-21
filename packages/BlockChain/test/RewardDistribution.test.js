const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("RewardDistribution Contract", function () {
  let RewardDistribution, rewardDistribution, RewardToken, rewardToken;
  let admin, user1, user2;

  beforeEach(async function () {
    // 获取 signers
    [admin, user1, user2] = await ethers.getSigners();

    // 部署 MockERC20 合约
    const RewardToken = await ethers.getContractFactory("MockERC20");
    rewardToken = await RewardToken.deploy(
      "RewardToken", // name
      "RWT",         // symbol
      18,            // decimals
      ethers.utils.parseEther("10000") // initial supply
    );
    await rewardToken.deployed();

    // 部署 RewardDistribution 合约
    const RewardDistribution = await ethers.getContractFactory("RewardDistribution");
    rewardDistribution = await RewardDistribution.deploy(rewardToken.address);
    await rewardDistribution.deployed();

    // 将奖励代币转移到 RewardDistribution 合约
    await rewardToken.transfer(rewardDistribution.address, ethers.utils.parseEther("5000"));
  });

  it("should allocate rewards correctly", async function () {
    await rewardDistribution.allocateReward(user1.address, ethers.utils.parseEther("100"));
    expect(await rewardDistribution.getUserReward(user1.address)).to.equal(ethers.utils.parseEther("100"));
  });
});
