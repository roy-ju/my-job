import { memo, useEffect } from 'react';

import tw, { styled } from 'twin.macro';

import { TabsV2, TabsV2Wrraper } from '@/components/molecules/Tabs/TabsV2';

import { TradeProcessContainerElementId } from '../trade-process/constants/element_id';

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
  useEffect(() => {
    const tabsContainerOne = document.getElementById('negocio-trade-process-buy-tabs');
    const tabsContainerTwo = document.getElementById('negocio-trade-process-rent-tabs');

    const scrollContainer = document.getElementById(TradeProcessContainerElementId);

    if (scrollContainer && tabsContainerOne && tabsContainerTwo) {
      const stopScrollingAndReset = (e: MouseEvent) => {
        const button = e.currentTarget as HTMLButtonElement;

        if (value !== Number(button.value)) {
          const currentScrollTop = scrollContainer.scrollTop;

          scrollContainer.scrollTo(0, currentScrollTop);
          setTimeout(() => {
            scrollContainer.scrollTo(0, 0);
          }, 100);
        }
      };

      tabsContainerOne.addEventListener('click', stopScrollingAndReset);
      tabsContainerTwo.addEventListener('click', stopScrollingAndReset);

      return () => {
        tabsContainerOne.removeEventListener('click', stopScrollingAndReset);
        tabsContainerTwo.removeEventListener('click', stopScrollingAndReset);
      };
    }
  }, [value]); // value를 의존성 배열에 추가

  return (
    <Container css={[type === 'specialTerms' && tw`my-0`]}>
      <TabsV2Wrraper>
        <TabsV2>
          <TabsV2.Tab value={1} onClick={handleChange} id="negocio-trade-process-buy-tabs">
            <TabsV2.Text selected={value === 1}>{v1Title}</TabsV2.Text>
            {value === 1 && <TabsV2.Indicator layoutId="process-tab-indicator" />}
          </TabsV2.Tab>
        </TabsV2>
      </TabsV2Wrraper>
      <TabsV2Wrraper>
        <TabsV2>
          <TabsV2.Tab value={2} onClick={handleChange} id="negocio-trade-process-rent-tabs">
            <TabsV2.Text selected={value === 2}>{v2Title}</TabsV2.Text>
            {value === 2 && <TabsV2.Indicator layoutId="process-tab-indicator" />}
          </TabsV2.Tab>
        </TabsV2>
      </TabsV2Wrraper>
    </Container>
  );
}

export default memo(Tabs);
