import { ethers } from "ethers";
import RewardDistributionABI from "../artifacts/contracts/RewardDistribution.sol/RewardDistribution.json";
import MockERC20ABI from "../artifacts/contracts/MockERC20.sol/MockERC20.json";
import deployedAddresses from "../deployedAddresses.json";
// import 

export class ContractUtils {
    private provider: ethers.BrowserProvider;
    private rewardContract: ethers.Contract;
    private tokenContract: ethers.Contract;

    constructor() {
        // 使用 MetaMask 提供的 provider
        this.provider = new ethers.BrowserProvider(window.ethereum);

        this.rewardContract = new ethers.Contract(
            deployedAddresses.rewardDistributionAddress,
            RewardDistributionABI.abi,
            this.provider,
        );

        this.tokenContract = new ethers.Contract(
            deployedAddresses.tokenAddress,
            MockERC20ABI.abi,
            this.provider,
        );
    }

    // 连接钱包
    async connectWallet() {
        const signer = await this.provider.getSigner();
        this.rewardContract = this.rewardContract.connect(signer);
        this.tokenContract = this.tokenContract.connect(signer);
        return signer.getAddress();
    }

    // 查询用户奖励
    async getUserReward(address: string) {
        return await this.rewardContract.getUserReward(address);
    }

    // 领取奖励
    async claimReward() {
        const tx = await this.rewardContract.claimReward();
        await tx.wait();
        return tx;
    }

    // 管理员分配奖励
    async allocateReward(userAddress: string, amount: string) {
        const tx = await this.rewardContract.allocateReward(
            userAddress,
            amount,
        );
        await tx.wait();
        return tx;
    }
}
