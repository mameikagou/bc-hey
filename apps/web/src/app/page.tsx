import {
  GridItemEight,
  GridItemFour,
  GridLayout,
} from '@/components/ui/GridLayout';

export default function Home<NextPage>() {
  return (
    <>
      <GridLayout>
        <GridItemEight>
          <div>111</div>
        </GridItemEight>
        <GridItemFour>
          <div>222</div>
        </GridItemFour>
      </GridLayout>
    </>
  );
}
