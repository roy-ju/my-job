import SummaryContainer from './ui/SummaryContainer';

import useGetSummary from './hooks/useGetSummary';

export default function Summary() {
  const {
    locationData,
    realestateData,
    buyOrRentData,
    priceData,
    purposeData,
    moveInDateData,
    pyoungsData,
    addtionalCondtionsData,
    interviewAvailabletimesData,
    isRenderPurpose,
  } = useGetSummary();

  return (
    <div id="formSummary" tw="w-full flex-1 flex flex-col min-h-0 overflow-y-auto pt-10 pb-10 px-5 gap-6">
      <SummaryContainer title="위치">{locationData()}</SummaryContainer>
      <SummaryContainer title="원하는 집">
        {realestateData()} / {buyOrRentData()}
        <br />
        {priceData()}
      </SummaryContainer>
      <SummaryContainer title="거래 목적" isRender={isRenderPurpose}>
        {purposeData()}
      </SummaryContainer>
      <SummaryContainer title="희망 입주 날짜" isRender={!isRenderPurpose}>
        {moveInDateData()}
      </SummaryContainer>
      <SummaryContainer title="평수">{pyoungsData()}</SummaryContainer>
      <SummaryContainer title="추가 조건">{addtionalCondtionsData()}</SummaryContainer>
      <SummaryContainer title="인터뷰">{interviewAvailabletimesData()}</SummaryContainer>
    </div>
  );
}
