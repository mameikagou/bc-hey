// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract RewardDistribution {
    address public admin;
    IERC20 public rewardToken;

    // 用户待领取的奖励余额
    mapping(address => uint256) public userRewards;

    // 事件
    event RewardAllocated(address indexed user, uint256 amount);
    event RewardClaimed(address indexed user, uint256 amount);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }

    constructor(address _tokenAddress) {
        require(_tokenAddress != address(0), "Invalid token address");
        admin = msg.sender;
        rewardToken = IERC20(_tokenAddress);
    }

    /// @notice 为用户分配奖励
    /// @param user 用户地址
    /// @param tokenAmount 分配的奖励数量
    function allocateReward(address user, uint256 tokenAmount) external onlyAdmin {
        require(user != address(0), "Invalid user address");
        require(tokenAmount > 0, "Token amount must be greater than 0");
        userRewards[user] += tokenAmount;

        emit RewardAllocated(user, tokenAmount);
    }

    /// @notice 用户领取奖励
    function claimReward() external {
        uint256 rewardAmount = userRewards[msg.sender];
        require(rewardAmount > 0, "No rewards to claim");
        require(rewardToken.balanceOf(address(this)) >= rewardAmount, "Insufficient contract balance");

        userRewards[msg.sender] = 0; // 重置用户奖励余额
        rewardToken.transfer(msg.sender, rewardAmount);

        emit RewardClaimed(msg.sender, rewardAmount);
    }

    /// @notice 查询用户当前待领取的奖励数量
    /// @param user 用户地址
    /// @return 待领取奖励数量
    function getUserReward(address user) external view returns (uint256) {
        return userRewards[user];
    }
}
