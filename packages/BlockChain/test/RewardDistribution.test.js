const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("RewardDistribution Contract", function () {
  let RewardDistribution, rewardDistribution, RewardToken, rewardToken;
  let admin, user1, user2;

  beforeEach(async function () {
    // 部署 ERC20 Token 合约
    [admin, user1, user2] = await ethers.getSigners();
    RewardToken = await ethers.getContractFactory("MockERC20");
    rewardToken = await RewardToken.deploy("RewardToken", "RWT", 18, ethers.utils.parseEther("10000"));
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
    expect(await rewardDistribution.getUserReward(user1.address)).to.equal(ethers.utils.parseEther("100"));
  });

  it("should allow user to claim rewards", async function () {
    // 分配奖励
    await rewardDistribution.allocateReward(user1.address, ethers.utils.parseEther("100"));

    // 用户领取奖励
    await rewardDistribution.connect(user1).claimReward();

    // 检查用户余额是否增加
    expect(await rewardToken.balanceOf(user1.address)).to.equal(ethers.utils.parseEther("100"));

    // 检查合约余额是否减少
    expect(await rewardToken.balanceOf(rewardDistribution.address)).to.equal(ethers.utils.parseEther("4900"));

    // 检查用户待领取奖励是否清零
    expect(await rewardDistribution.getUserReward(user1.address)).to.equal(0);
  });

  it("should revert if non-admin tries to allocate rewards", async function () {
    await expect(
      rewardDistribution.connect(user1).allocateReward(user2.address, ethers.utils.parseEther("50"))
    ).to.be.revertedWith("Only admin can call this function");
  });

  it("should revert if user tries to claim without rewards", async function () {
    await expect(rewardDistribution.connect(user1).claimReward()).to.be.revertedWith("No rewards to claim");
  });

  it("should revert if contract has insufficient balance to claim", async function () {
    // 分配超过合约余额的奖励
    await rewardDistribution.allocateReward(user1.address, ethers.utils.parseEther("6000"));
    await expect(rewardDistribution.connect(user1).claimReward()).to.be.revertedWith("Insufficient contract balance");
  });
});
