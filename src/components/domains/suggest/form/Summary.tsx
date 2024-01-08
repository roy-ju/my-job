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
      <SummaryContainer title="원하는 집">
        {realestateData()} / {buyOrRentData()} / {priceData()}
      </SummaryContainer>
      <SummaryContainer title="거래 목적" isRender={isRenderPurpose}>
        {purposeData()}
      </SummaryContainer>
      <SummaryContainer title="평수">{pyounsData()}</SummaryContainer>
      <SummaryContainer title="추가 조건">{addtionalCondtionsData()}</SummaryContainer>
      <SummaryContainer title="인터뷰">{interviewAvailabletimesData()}</SummaryContainer>
    </div>
  );
}
