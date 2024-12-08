"use client";

import { FC, memo } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { HEY_API_URL } from '@/data/constants';
const Sidebar: FC = () => {
	return (
		<>
			<GitCoin />
            <StaffPicks/>
		</>
	);
};

export default memo(Sidebar);
const GitCoin: FC = () => {
	return (
		<aside
			className='!border-[#3D614D] !bg-[#3D614D]/10 mb-4 space-y-4 p-5 text-[#3D614D] dark:bg-[#3D614D]/50"'>
			<img
				alt="Gitcoin emoji"
				className="mx-auto h-20"
				src={"https://sponsors.vuejs.org/images/crmeb.svg?v2"}
			/>
			<div className="space-y-3 text-center">
				<b>Support hey on Gitcoin Grants Round 22</b>
				{/* <div className={rubikMonoOneFont.className}>
					<CountdownTimer targetDate="2024-11-07T00:59:00+00:00" />
				</div> */}
				<div>
					<Link
						className="font-bold underline"
						href="https://hey.xyz/gitcoin"
						// onClick={() => Leafwatch.track(MISCELLANEOUS.OPEN_GITCOIN)}
						target="_blank">
						<button>Contribute now</button>
					</Link>
				</div>
			</div>
		</aside>
	);
};

const StaffPicks: FC = () => {
	const getStaffPicks = async (): Promise<unknown[]> => {
		const response: {
			data: { result: unknown[] };
		} = await axios.get(`${HEY_API_URL}/staff-picks`);

		return response.data.result;
	};

	const {
		data: picks,
		error: picksError,
		isLoading: picksLoading,
	} = useQuery({
		queryFn: getStaffPicks,
		queryKey: ['GET_STAFF_PICKS_QUERY_KEY'],
	});
	return (
		<div>
			{picks?.map((pick) => {
				console.log(pick);
                return <div></div>
			})}
		</div>
	);
};
