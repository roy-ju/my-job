import { useMemo } from 'react';

import { Button, Chip, Moment, Numeral, StatusChip } from '@/components/atoms';

import { ExpandableText, OverlayPresenter, Popup } from '@/components/molecules';

import { DanjiOrRegionalType, RealestateType, BuyOrRent } from '@/constants/enums';

import { RealestateTypeChipVariant, RealestateTypeString, TimeTypeString } from '@/constants/strings';

import PriceText from './PriceText';

import useMySuggestDetailStore from './hooks/useMySuggestDetailStore';

import useSummaryCTAHandler from './hooks/useSummaryCTAHandler';

type SummaryProps = { depth?: number };

export default function Summary({ depth }: SummaryProps) {
  const value = useMySuggestDetailStore();

  const {
    renderDanjiShowUICondition,
    deletePopup,
    openDeletePopup,
    closeDeletePopup,
    handleDelete,
    handleClickDanjiDetail,
    handleClickSuggestUpdate,
  } = useSummaryCTAHandler({ depth });

  const realestateTypes = useMemo(
    () =>
      Array.from(
        new Set(
          value?.suggestDetailData?.realestate_types
            ?.split(',')
            .map((d) => Number(d))
            .map((d) => (d === RealestateType.Yunrip ? RealestateType.Dasaedae : d)) ?? [],
        ),
      ),
    [value?.suggestDetailData?.realestate_types],
  );

  const buyOrRent = value?.suggestDetailData?.buy_or_rents;

  const buyOrRentText = Number(buyOrRent) === BuyOrRent.Buy ? '매매' : '전월세';

  const danjiOrRegional = value?.suggestDetailData?.danji_or_regional ?? 0;

  const hasActiveChatRoom = value?.suggestDetailData?.has_active_chat_room;

  if (!value?.suggestDetailData) return null;

  return (
    <div tw="px-5 pt-7 pb-10">
      <div>
        <div tw="block  mb-4 w-full">
          <div tw="mb-1 flex justify-between items-center">
            <div tw="flex items-center gap-1.5">
              {realestateTypes.map((type) => (
                <Chip key={type} variant={RealestateTypeChipVariant[type]}>
                  {RealestateTypeString[type]}
                </Chip>
              ))}

              {danjiOrRegional === DanjiOrRegionalType.Danji ? (
                <span tw="text-gray-1000 text-info line-clamp-1">{value.suggestDetailData?.request_target_text}</span>
              ) : (
                <Chip variant="gray">{value.suggestDetailData?.request_target_text.split(' ').slice(-1)}</Chip>
              )}
            </div>

            {renderDanjiShowUICondition && danjiOrRegional === DanjiOrRegionalType.Danji && (
              <Button
                variant="outlined"
                size="small"
                onClick={() => {
                  handleClickDanjiDetail();
                }}
              >
                단지 보기
              </Button>
            )}
          </div>
          <div tw="text-left">
            <div tw="flex items-center mb-1">
              <div tw="text-b1 font-bold text-gray-1000 mr-1">
                {buyOrRentText}{' '}
                <PriceText
                  tradeOrDepositPrice={value.suggestDetailData?.trade_or_deposit_price}
                  monthlyRentFee={value.suggestDetailData?.monthly_rent_fee ?? 0}
                  quickSale={value.suggestDetailData?.quick_sale ?? false}
                />
              </div>
              {value.suggestDetailData?.negotiable && <StatusChip variant="white">협의가능</StatusChip>}
            </div>

            {value.suggestDetailData?.pyoung_text && (
              <div tw="text-gray-700 text-info">평형 {value.suggestDetailData?.pyoung_text}</div>
            )}

            {value.suggestDetailData?.move_in_date && (
              <div tw="text-gray-700 text-info">
                입주희망일 <Moment format="YY.MM.DD">{value.suggestDetailData?.move_in_date}</Moment>{' '}
                {TimeTypeString[value.suggestDetailData?.move_in_date_type]}
              </div>
            )}

            {value.suggestDetailData?.purpose === '투자' && (
              <div tw="text-gray-700 text-info">
                투자예산 <Numeral koreanNumber>{value.suggestDetailData?.invest_amount}</Numeral>
              </div>
            )}
          </div>
        </div>

        {value.suggestDetailData?.note && value.suggestDetailData?.additional_conditions && (
          <ExpandableText tw="mb-5">
            {value.suggestDetailData?.note}, {value.suggestDetailData.additional_conditions.split(',').join(', ')}
          </ExpandableText>
        )}

        {value.suggestDetailData?.note && !value.suggestDetailData?.additional_conditions && (
          <ExpandableText tw="mb-5">{value.suggestDetailData?.note}</ExpandableText>
        )}

        {!value.suggestDetailData?.note && value.suggestDetailData?.additional_conditions && (
          <ExpandableText tw="mb-5">
            {value.suggestDetailData.additional_conditions.split(',').join(', ')}
          </ExpandableText>
        )}

        <div tw="flex flex-col items-center  gap-4">
          <Button variant="outlined" tw="w-full" onClick={handleClickSuggestUpdate}>
            구해요 요청 수정
          </Button>
          <button onClick={openDeletePopup} type="button" tw="underline text-info leading-4 text-gray-1000">
            구해요 요청 취소
          </button>
        </div>
      </div>

      {deletePopup && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup tw="py-6">
              <Popup.SubTitle tw="text-center">
                {hasActiveChatRoom ? (
                  <>
                    요청을 취소 하시겠습니까?
                    <br />
                    추천 내역과 대화중인 채팅방이 삭제됩니다.
                    <br />
                    신규 추천을 그만 받고 싶으시다면
                    <br />
                    요청 중단을 해주세요.
                  </>
                ) : (
                  <>
                    요청을 취소하시겠습니까?
                    <br />
                    요청 사항 및 추천받은 내역이 삭제 됩니다.
                  </>
                )}
              </Popup.SubTitle>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.CancelButton onClick={closeDeletePopup}>돌아가기</Popup.CancelButton>
              <Popup.ActionButton onClick={handleDelete}>요청취소</Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
    </div>
  );
}
