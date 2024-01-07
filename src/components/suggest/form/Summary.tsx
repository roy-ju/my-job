import SummaryContainer from './ui/SummaryContainer';

import useGetSummary from './hooks/useGetSummary';

export default function Summary() {
  const {
    locationData,
    realestateData,
    buyOrRentData,
    priceData,
    purposeData,
    pyounsData,
    addtionalCondtionsData,
    interviewAvailabletimesData,
    isRenderPurpose,
  } = useGetSummary();

  return (
    <div id="formSummary" tw="w-full flex-1 flex flex-col min-h-0 overflow-y-auto pt-10 pb-10 px-5 gap-6">
      <SummaryContainer title="위치">{locationData()}</SummaryContainer>

      <SummaryContainer title="부동산 종류">{realestateData()}</SummaryContainer>

      <SummaryContainer title="거래 종류">{buyOrRentData()}</SummaryContainer>

      <SummaryContainer title="가격">{priceData()}</SummaryContainer>

      <SummaryContainer title="매매 목적" isRender={isRenderPurpose}>
        {purposeData()}
      </SummaryContainer>

      <SummaryContainer title="평형 조건">{pyounsData()}</SummaryContainer>

      <SummaryContainer title="추가 조건">{addtionalCondtionsData()}</SummaryContainer>

      <SummaryContainer title="인터뷰">{interviewAvailabletimesData()}</SummaryContainer>
    </div>
  );
}
