'use client';
import { Separator, SizableText, Tabs, styled } from 'tamagui';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

export enum SwapTab {
  Swap = 'swap',
  Limit = 'limit',
  Send = 'send',
  Buy = 'buy',
}

const TabsContent = styled(Tabs.Content, {});

const TabsList = styled(Tabs.List, {
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'row',

  gap: '3rem',
});

const HoverText = styled(SizableText, {
  paddingVertical: 5,
  paddingHorizontal: 3,
  hoverStyle: {
    backgroundColor: '#EBEBEB',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
});

export default function MainComponent() {
  const [currentTab, setCurrentTab] = useState(SwapTab.Swap);
  const router = useRouter();
  const onTabClick = useCallback(
    (tab: SwapTab) => {
      router.push(`${tab}`);
      setCurrentTab(tab);
    },
    [setCurrentTab, router]
  );
  return (
    <>
      <Tabs
        orientation="vertical"
        flexDirection="row"
        value={currentTab} // State表示受控
        width={400}
        height={50}
        borderRadius="4"
        borderWidth="0.25"
        overflow="hidden"
        onValueChange={onTabClick as (value: string) => void} // 用枚举属性，替代String
      >
        <TabsList>
          <Tabs.Tab value="swap">
            <HoverText fontFamily="">Swap</HoverText>
          </Tabs.Tab>
          <Tabs.Tab value="limit">
            <HoverText fontFamily="">Limit</HoverText>
          </Tabs.Tab>
          <Tabs.Tab value="send">
            <HoverText fontFamily="">Send</HoverText>
          </Tabs.Tab>
          <Tabs.Tab value="buy">
            <HoverText fontFamily="">Buy</HoverText>
          </Tabs.Tab>
        </TabsList>
        <Separator />
        <TabsContent value="swap">

        </TabsContent>
        <TabsContent value="limit"></TabsContent>
        <TabsContent value="send"></TabsContent>
        <TabsContent value="buy"></TabsContent>
      </Tabs>
    </>
  );
}

const Swap=()=>{
  return(<>
  </>)
}
