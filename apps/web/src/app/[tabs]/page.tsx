import Com from './com';
import Contain, { SwapTab } from './swap';
// 设计思路, 一个组件只传值进去, 一个组件只对外展示自己的行为, 不设计具体的数据;
export default function UniversalSwapFlow({
  params,
}: {
  params: Promise<{ tabs: SwapTab }>;
}) {
  console.log('params', params);
  return (
    <>
      {/* <Com /> */}
      <Contain />
    </>
  );
}
