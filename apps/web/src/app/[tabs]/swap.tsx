"use client";
import { Separator, SizableText, styled } from "tamagui";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Select, Tabs } from "@arco-design/web-react";

const Option = Select.Option;
const TabPane = Tabs.TabPane;
export enum SwapTab {
  Swap = "swap",
  Limit = "limit",
  Send = "send",
  Buy = "buy",
}

// const TabsContent = styled(Tabs.Content, {});

// const TabsList = styled(Tabs.List, {
//   display: "flex",
//   justifyContent: "center",
//   flexDirection: "row",

//   gap: "3rem",
// });

const HoverText = styled(SizableText, {
  paddingVertical: 5,
  paddingHorizontal: 3,
  hoverStyle: {
    backgroundColor: "#EBEBEB",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
});

export default function MainComponent() {
  const [currentTab, setCurrentTab] = useState(SwapTab.Swap);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const path = pathname.split("/").pop();
    if (path && Object.values(SwapTab).includes(path as SwapTab)) {
      setCurrentTab(path as SwapTab);
    }
  }, [pathname]);

  const onTabClick = useCallback(
    (tab: SwapTab) => {
      router.push(`${tab}`);
      // 不应该直接更新tab，会导致状态不一致发生闪回；
      // setCurrentTab(tab);
    },
    [setCurrentTab, router],
  );

  const [curremtPage, setCurrentPage] = useState<number>(0);
  const pageSize = 5;
  const [options, setOptions] = useState<Array<string>>();
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://api.github.com/repositories/1300192/issues?per_page=5&page=1",
        {
          headers: {
            "Authorization":
              `TOKEN ${process.env.GithubToken}`,
          },
        },
      );
      setOptions(response.data || []);
      console.log("res", response);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Tabs activeTab={currentTab}  onChange={onTabClick as (tab: string) => void}>
        <TabPane key={SwapTab.Swap} title="swap">
          <HoverText fontFamily="">Swap</HoverText>
        </TabPane>
        <TabPane key={SwapTab.Limit} title="limit">
          <HoverText fontFamily="">Limit</HoverText>
          <Select
            style={{ width: 345 }}
            mode="multiple"
          >
            {options?.map((option, index) => (
              <Option value={option} key={index}>
                {option?.url}
              </Option>
            ))}
          </Select>
        </TabPane>
        <TabPane key={SwapTab.Send} title="send">
          <HoverText fontFamily="">Send</HoverText>
        </TabPane>
        <TabPane key={SwapTab.Buy} title="buy">
          <HoverText fontFamily="">Buy</HoverText>
        </TabPane>
      </Tabs>
    </>
  );
}

const Swap = () => {
  return (
    <>
    </>
  );
};
