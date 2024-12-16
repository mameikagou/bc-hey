import { ethers } from "ethers";
import { useProfileStore } from "@/store/useProfileStore";

async function connectMetaMask() {
    const [userAddress, setAddress] = useProfileStore(
        (state) => [state.userAddress, state.setAddress],
    );
    if (window.ethereum) {
        try {
            await window.ethereum.request({ method: "eth_requestAccounts" });

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            const _userAddress = await signer.getAddress();
            setAddress(_userAddress);
            console.log("userAddress",userAddress)
        } catch (error) {
            console.error("Error connecting to MetaMask:", error);
        }
    } else {
        console.error("MetaMask is not installed");
    }
}

export default connectMetaMask;
