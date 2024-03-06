import tw, { styled } from 'twin.macro';

import { TabsV2, TabsV2Wrraper } from '@/components/molecules/Tabs/TabsV2';

const Container = styled.div`
  ${tw`relative flex w-full px-2 my-2`}
`;

type ProcessTabsProps = { value?: number; handleChange?: (e: NegocioMouseEvent<HTMLButtonElement>) => void };

export default function ProcessTabs({ value, handleChange }: ProcessTabsProps) {
  return (
    <Container>
      <TabsV2Wrraper>
        <TabsV2>
          <TabsV2.Tab value={1} onClick={handleChange}>
            <TabsV2.Text selected={value === 1}>매매 거래 절차</TabsV2.Text>
            {value === 1 && <TabsV2.Indicator layoutId="process-tab-indicator" />}
          </TabsV2.Tab>
        </TabsV2>
      </TabsV2Wrraper>
      <TabsV2Wrraper>
        <TabsV2>
          <TabsV2.Tab value={2} onClick={handleChange}>
            <TabsV2.Text selected={value === 2}>전월세 거래 절차</TabsV2.Text>
            {value === 2 && <TabsV2.Indicator layoutId="process-tab-indicator" />}
          </TabsV2.Tab>
        </TabsV2>
      </TabsV2Wrraper>
    </Container>
  );
}
