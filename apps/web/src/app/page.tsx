import SideBar from '@/components/Home/SideBar';
import {
	GridItemEight,
	GridItemFour,
	GridLayout,
} from '@/components/ui/GridLayout';
import { NextPage } from 'next';

const Home: NextPage = () => {
	return (
		<>
			<GridLayout>
				<GridItemEight>
					<div>111</div>
				</GridItemEight>
				<GridItemFour>
					<SideBar />
				</GridItemFour>
			</GridLayout>
		</>
	);
};
export default Home;
