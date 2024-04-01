import tw, { styled } from 'twin.macro';

import Container from '@/components/atoms/Container';

import { NavigationHeader } from '@/components/molecules';

import useIosWebkitNoneApplySafeArea from '@/hooks/useIosWebkitNoneApplySafeArea';

import { MarginTopEight } from '@/components/atoms/Margin';

import Tabs from './trade-process/Tabs';

import Lists from './trade-process/Lists';

import useHandleClickBack from './trade-process/hooks/useHandleClickBack';

import useProcessTabsHandler from './trade-process/hooks/useProcessTabsHandler';

import Buy_Process from './trade-process/constants/buyProcess';

import JeonWolsae_Process from './trade-process/constants/jeonwolsaeProcess';

import { TradeProcessContainerElementId } from './trade-process/constants/element_id';

const FlexContents = styled.div`
  ${tw`relative flex flex-col flex-1 h-full px-5 pt-10 pb-5 overflow-x-hidden overflow-y-auto`}
`;

export default function TradeProcess() {
  const { handleClickBack } = useHandleClickBack();

  const { tab, handleChangeTab } = useProcessTabsHandler();

  useIosWebkitNoneApplySafeArea();

  return (
    <Container>
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={handleClickBack} />
        <NavigationHeader.Title>부동산 거래 절차</NavigationHeader.Title>
      </NavigationHeader>
      <MarginTopEight />

      <Tabs value={tab} handleChange={handleChangeTab} v1Title="매매 거래 절차" v2Title="전월세 거래 절차" />
      <FlexContents id={TradeProcessContainerElementId}>
        <MarginTopEight />
        <Lists tab={tab} list={tab === 1 ? Buy_Process : JeonWolsae_Process} />
      </FlexContents>
    </Container>
  );
}
