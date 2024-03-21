import { memo } from 'react';

import tw, { styled } from 'twin.macro';

import { TabsV2, TabsV2Wrraper } from '@/components/molecules/Tabs/TabsV2';

const Container = styled.div`
  ${tw`relative flex w-full px-2 my-2`}
`;

type TabsProps = {
  type: 'tradeProcess' | 'specialTerms';
  v1Title: string;
  v2Title: string;
  value?: number;
  handleChange?: (e: NegocioMouseEvent<HTMLButtonElement>) => void;
};

function Tabs({ type, value, handleChange, v1Title, v2Title }: TabsProps) {
  return (
    <Container css={[type === 'specialTerms' && tw`my-0`]}>
      <TabsV2Wrraper>
        <TabsV2>
          <TabsV2.Tab value={1} onClick={handleChange}>
            <TabsV2.Text selected={value === 1}>{v1Title}</TabsV2.Text>
            {value === 1 && <TabsV2.Indicator layoutId="process-tab-indicator" />}
          </TabsV2.Tab>
        </TabsV2>
      </TabsV2Wrraper>
      <TabsV2Wrraper>
        <TabsV2>
          <TabsV2.Tab value={2} onClick={handleChange}>
            <TabsV2.Text selected={value === 2}>{v2Title}</TabsV2.Text>
            {value === 2 && <TabsV2.Indicator layoutId="process-tab-indicator" />}
          </TabsV2.Tab>
        </TabsV2>
      </TabsV2Wrraper>
    </Container>
  );
}

export default memo(Tabs);
