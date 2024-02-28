import tw, { styled, theme } from 'twin.macro';

import { SuggestDetailResponse } from '@/services/suggests/types';

import ArrowRight from '@/assets/icons/arrow_right_20.svg';

import ArrowDown from '@/assets/icons/arrow_down_20.svg';

import useSummaryCTAHandler from './hooks/useSummaryCTAHandler';

import RealestatatesLabel from './RealestatatesLabel';

import PurposeOrMoveInDate from './PurposeOrMoveInDate';

import AdditionalConditions from './AdditionalConditions';

import Note from './Note';

import CreatedTime from '../suggest-requested-list/CreatedTime';

import Price from '../suggest-requested-list/Price';

import BuyOrRent from '../suggest-requested-list/BuyOrRent';

import Negotiable from '../suggest-requested-list/Negotiable';

import Pyoung from '../suggest-requested-list/Pyoung';

type SummaryProps = { data: SuggestDetailResponse & ErrorResponse };

const MySuggestInfo = styled.div`
  ${tw`px-5 py-2`}
`;

const SummaryHeader = styled.div`
  ${tw`flex flex-row items-center`}
`;

const SummaryInfo = styled.div`
  ${tw`flex flex-col gap-0.5 pt-2`}
`;

const TitleButton = styled.button`
  ${tw`flex flex-row items-center`}
`;

const Title = styled.p`
  ${tw`flex-1 text-left text-gray-800 text-heading_01`}
`;

const BuyOrRentPriceNegotiableWrraper = styled.div`
  ${tw`text-gray-700 text-body_02`}
`;

const Seperator = styled.div`
  ${tw`w-full [min-height: 24px]`}
`;

const SummaryDetailHeader = styled.div`
  ${tw`border-t border-t-gray-200`}
`;

const SummaryDetailHeaderButton = styled.button`
  ${tw`flex items-center justify-center gap-0.5 mx-auto w-full h-full py-4`}

  span {
    ${tw`text-gray-700 text-body_02`}
  }
`;

export default function Summary({ data }: SummaryProps) {
  const { openSummaryDetail, renderRoutingDanjiDetailButton, handleRouterDanjiDetail, handleClickOpenSummaryDetail } =
    useSummaryCTAHandler({ data });

  return (
    <>
      <MySuggestInfo>
        <SummaryHeader>
          <RealestatatesLabel realestates={data.realestate_types} />
          <CreatedTime time={data.created_time ?? ''} />
        </SummaryHeader>

        <SummaryInfo>
          <TitleButton
            css={[!renderRoutingDanjiDetailButton && tw`pointer-events-none`]}
            onClick={handleRouterDanjiDetail}
          >
            <Title>{data.request_target_text}</Title>
            {renderRoutingDanjiDetailButton && <ArrowRight color={theme`colors.gray.700`} />}
          </TitleButton>
          <BuyOrRentPriceNegotiableWrraper>
            <BuyOrRent buyOrRents={data.buy_or_rents} />
            <Price
              tradeOrDepositPrice={data.trade_or_deposit_price ?? 0}
              monthlyRentFee={data.monthly_rent_fee ?? 0}
              quickSale={data.quick_sale ?? false}
            />
            <Negotiable negotiable={data.negotiable ?? false} />
          </BuyOrRentPriceNegotiableWrraper>
          <Pyoung pyoung={data.pyoung_text} />
        </SummaryInfo>
      </MySuggestInfo>
      <Seperator />

      {openSummaryDetail && (
        <div tw="py-8 border-t mx-5 flex flex-col gap-5">
          <PurposeOrMoveInDate
            buyOrRent={data?.buy_or_rents}
            purpose={data?.purpose}
            investAmount={data?.invest_amount ?? 0}
            moveInDate={data?.move_in_date}
            moveInDateType={data?.move_in_date_type}
          />

          {data?.additional_conditions && (
            <AdditionalConditions
              buyOrRents={data.buy_or_rents}
              danjiOrRegion={data.danji_or_regional}
              realestateTypes={data.realestate_types}
              additionalConditions={data.additional_conditions}
            />
          )}

          <Note note={data?.note} />
        </div>
      )}

      <SummaryDetailHeader>
        <SummaryDetailHeaderButton onClick={handleClickOpenSummaryDetail}>
          <span>{openSummaryDetail ? '접기' : '자세히 보기'} </span>
          <ArrowDown
            color={theme`colors.gray.600`}
            css={[openSummaryDetail ? tw`transition rotate-180` : tw`transition rotate-0`]}
          />
        </SummaryDetailHeaderButton>
      </SummaryDetailHeader>
    </>
  );
}

// <div tw="px-5 pt-7 pb-10">
//   <div>
//     <div tw="block  mb-4 w-full">
//       <div tw="mb-1 flex justify-between items-center">
//         <div tw="flex items-center gap-1.5">
//           {realestateTypes.map((type) => (
//             <Chip key={type} variant={RealestateTypeChipVariant[type]}>
//               {RealestateTypeString[type]}
//             </Chip>
//           ))}

//           {danjiOrRegional === DanjiOrRegionalType.Danji ? (
//             <span tw="text-gray-1000 text-info line-clamp-1">{value.suggestDetailData?.request_target_text}</span>
//           ) : (
//             <Chip variant="gray">{value.suggestDetailData?.request_target_text.split(' ').slice(-1)}</Chip>
//           )}
//         </div>

//         {renderDanjiShowUICondition && danjiOrRegional === DanjiOrRegionalType.Danji && (
//           <Button
//             variant="outlined"
//             size="small"
//             onClick={() => {
//               handleClickDanjiDetail();
//             }}
//           >
//             단지 보기
//           </Button>
//         )}
//       </div>
//       <div tw="text-left">
//         <div tw="flex items-center mb-1">
//           <div tw="text-b1 font-bold text-gray-1000 mr-1">
//             {buyOrRentText}{' '}
//             <PriceText
//               tradeOrDepositPrice={value.suggestDetailData?.trade_or_deposit_price}
//               monthlyRentFee={value.suggestDetailData?.monthly_rent_fee ?? 0}
//               quickSale={value.suggestDetailData?.quick_sale ?? false}
//             />
//           </div>
//           {value.suggestDetailData?.negotiable && <StatusChip variant="white">협의가능</StatusChip>}
//         </div>

//         {value.suggestDetailData?.pyoung_text && (
//           <div tw="text-gray-700 text-info">평형 {value.suggestDetailData?.pyoung_text}</div>
//         )}

//         {value.suggestDetailData?.move_in_date && (
//           <div tw="text-gray-700 text-info">
//             입주희망일 <Moment format="YY.MM.DD">{value.suggestDetailData?.move_in_date}</Moment>{' '}
//             {TimeTypeString[value.suggestDetailData?.move_in_date_type]}
//           </div>
//         )}

//         {value.suggestDetailData?.purpose === '투자' && (
//           <div tw="text-gray-700 text-info">
//             투자예산 <Numeral koreanNumber>{value.suggestDetailData?.invest_amount}</Numeral>
//           </div>
//         )}
//       </div>
//     </div>

//     {value.suggestDetailData?.note && value.suggestDetailData?.additional_conditions && (
//       <ExpandableText tw="mb-5">
//         {value.suggestDetailData?.note}, {value.suggestDetailData.additional_conditions.split(',').join(', ')}
//       </ExpandableText>
//     )}

//     {value.suggestDetailData?.note && !value.suggestDetailData?.additional_conditions && (
//       <ExpandableText tw="mb-5">{value.suggestDetailData?.note}</ExpandableText>
//     )}

//     {!value.suggestDetailData?.note && value.suggestDetailData?.additional_conditions && (
//       <ExpandableText tw="mb-5">
//         {value.suggestDetailData.additional_conditions.split(',').join(', ')}
//       </ExpandableText>
//     )}

//     <div tw="flex flex-col items-center  gap-4">
//       <Button variant="outlined" tw="w-full" onClick={handleClickSuggestUpdate}>
//         구해요 요청 수정
//       </Button>
//       <button onClick={openDeletePopup} type="button" tw="underline text-info leading-4 text-gray-1000">
//         구해요 요청 취소
//       </button>
//     </div>
//   </div>

//   {deletePopup && (
//     <OverlayPresenter>
//       <Popup>
//         <Popup.ContentGroup tw="py-6">
//           <Popup.SubTitle tw="text-center">
//             {hasActiveChatRoom ? (
//               <>
//                 요청을 취소 하시겠습니까?
//                 <br />
//                 추천 내역과 대화중인 채팅방이 삭제됩니다.
//                 <br />
//                 신규 추천을 그만 받고 싶으시다면
//                 <br />
//                 요청 중단을 해주세요.
//               </>
//             ) : (
//               <>
//                 요청을 취소하시겠습니까?
//                 <br />
//                 요청 사항 및 추천받은 내역이 삭제 됩니다.
//               </>
//             )}
//           </Popup.SubTitle>
//         </Popup.ContentGroup>
//         <Popup.ButtonGroup>
//           <Popup.CancelButton onClick={closeDeletePopup}>돌아가기</Popup.CancelButton>
//           <Popup.ActionButton onClick={handleDelete}>요청취소</Popup.ActionButton>
//         </Popup.ButtonGroup>
//       </Popup>
//     </OverlayPresenter>
//   )}
// </div>
