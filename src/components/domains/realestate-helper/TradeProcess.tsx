import tw, { styled } from 'twin.macro';

import Container from '@/components/atoms/Container';

import { NavigationHeader } from '@/components/molecules';

import useIosWebkitNoneApplySafeArea from '@/hooks/useIosWebkitNoneApplySafeArea';

import ProcessTab from './trade-process/ProcessTabs';

import Lists from './trade-process/Lists';

import useHandleClickBack from './trade-process/hooks/useHandleClickBack';

import useProcessTabs from './trade-process/hooks/useProcessTabs';

import Buy_Process from './trade-process/constants/buyProcess';

import JeonWolsae_Process from './trade-process/constants/jeonwolsaeProcess';

const FlexContents = styled.div`
  ${tw`relative flex flex-col flex-1 h-full px-5 pt-10 pb-5 overflow-x-hidden overflow-y-auto`}
`;

export default function TradeProcess() {
  const { handleClickBack } = useHandleClickBack();

  const { tab, handleChangeTab } = useProcessTabs();

  useIosWebkitNoneApplySafeArea();

  return (
    <Container>
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={handleClickBack} />
        <NavigationHeader.Title>부동산 거래 절차</NavigationHeader.Title>
      </NavigationHeader>
      <ProcessTab value={tab} handleChange={handleChangeTab} />
      <FlexContents>
        <Lists tab={tab} list={tab === 1 ? Buy_Process : JeonWolsae_Process} />
      </FlexContents>
    </Container>
  );
}
