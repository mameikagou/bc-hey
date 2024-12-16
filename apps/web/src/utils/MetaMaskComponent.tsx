import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useProfileStore } from "@/store/useProfileStore";
import { useShallow } from "zustand/react/shallow";
const MetaMaskComponent: React.FC = () => {
  // 通过useShallow来解决无限循环重复渲染的问题
  // https://ouweiya.github.io/zustand-zh/docs/guides/prevent-rerenders-with-use-shallow
  const [userAddress, setAddress] = useProfileStore(
    useShallow(
      (state) => [state.userAddress, state.setAddress],
    ),
  );
  const [cachedAddress, setCachedAddress] = useState<string | null>(null);
  useEffect(() => {
    async function connectMetaMask() {
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" });

          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();

          const _userAddress = await signer.getAddress();
          if (_userAddress !== cachedAddress) {
            setAddress(_userAddress);
            setCachedAddress(_userAddress);
            console.log("userAddress", _userAddress);
          }
        } catch (error) {
          console.error("Error connecting to MetaMask:", error);
        }
      } else {
        console.error("MetaMask is not installed");
      }
    }

    connectMetaMask();
  }, [setAddress, userAddress]); // 添加依赖项

  return <></>;
};

export default MetaMaskComponent;
