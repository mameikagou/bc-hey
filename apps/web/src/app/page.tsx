"use client";
import SideBar from "@/components/Home/SideBar";
import {
	GridItemEight,
	GridItemFour,
	GridLayout,
} from "@/components/ui/GridLayout";
import { NextPage } from "next";
import AvatarComponent from "@/components/Profile/Avatar";
import connectMetaMask from "@/utils/connect";
import { useEffect } from "react";
import MetaMaskComponent from "@/utils/MetaMaskComponent";
import Swap from "@/components/Swap";
import Distribute from "@/components/Distribute";

const Home: NextPage = () => {
	return (
		<>
			<MetaMaskComponent />
			<GridLayout>
				<GridItemFour>
					<AvatarComponent />
				</GridItemFour>
				<GridItemEight>
					{/* <SideBar /> */}
					<Swap />
					<Distribute />
				</GridItemEight>
			</GridLayout>
		</>
	);
};
export default Home;
