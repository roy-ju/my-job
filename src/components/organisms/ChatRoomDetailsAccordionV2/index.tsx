/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { ChatRoomAccordionsProps } from '@/apis/chat/getChatRoomDetail';
import { Chip } from '@/components/atoms';
import { Accordion } from '@/components/molecules';
import {
  ChatRoomType,
  DanjiOrRegionalType,
  describeBuyOrRent,
  BuyOrRent,
  RealestateType,
  describeTimeType,
} from '@/constants/enums';
import { RealestateTypeChipVariant, RealestateTypeString } from '@/constants/strings';
import { formatNumberInKorean } from '@/utils';
import moment from 'moment';
import { useState } from 'react';

type ChatRoomDetailsAccordionV2Props = {
  accordionDetails: ChatRoomAccordionsProps;
  chatRoomType: number;
  onClickNavigateToListingDetail?: (listingID?: number, biddingID?: Nullable<number>) => void;
  onClickNavigateToSuggestDetail?: (suggestID?: number) => void;
  onClickNavigateToSuggestRecommended?: (suggestRecommendID?: number) => void;
};

export default function ChatRoomDetailsAccordionV2({
  accordionDetails,
  chatRoomType,
  onClickNavigateToListingDetail,
  onClickNavigateToSuggestDetail,
  onClickNavigateToSuggestRecommended,
}: ChatRoomDetailsAccordionV2Props) {
  const [open, setOpen] = useState(false);

  const [subTab, setSubTab] = useState(0);

  if (chatRoomType === ChatRoomType.Agent) {
    return (
      <Accordion
        tw="border-b border-t border-gray-300"
        onChange={(v) => {
          if (v) {
            setOpen(v);
          } else {
            setSubTab(0);
          }
        }}
      >
        <Accordion.Summary tw="text-subhead_02 px-5 py-4" isNewIconSmall>
          <div tw="flex flex-row justify-between">
            현재 진행 사항
            <p tw="text-body_01 text-gray-700 inline mr-0.5">상세정보 {open ? '접기' : '보기'}</p>
          </div>
        </Accordion.Summary>

        <Accordion.Details tw="bg-gray-100 mx-5 mb-5 [border-radius: 8px]">
          <Accordion
            tw="bg-transparent"
            onChange={(v) => {
              if (v) {
                setSubTab(1);
              } else {
                setSubTab(0);
              }
            }}
            expanded={subTab === 1}
          >
            <Accordion.Summary tw="text-body_01 px-4 py-3" isNewIconSmallV2>
              <div tw="flex flex-row items-center">
                <div tw="[border-radius: 50%] w-0.5 h-0.5 bg-gray-1000 mx-2" />
                매물 등록
                <div tw="ml-auto mr-0.5 text-subhead_01 text-nego">
                  {accordionDetails.listingItem1Count} <span tw="text-body_01 text-gray-800 ml-0.5">건</span>
                </div>
              </div>
            </Accordion.Summary>
            {accordionDetails.listingItem1Count ? (
              <Accordion.Details tw="flex flex-col mx-5 gap-3 max-h-[192px] overflow-y-auto">
                {accordionDetails?.listingItem1Arr?.map((item) => (
                  <div
                    key={`listingItem1-${item.listing_id}`}
                    tw="h-14 flex flex-row bg-white px-4 py-2 [box-shadow: 0px 2px 10px 0px #0000000F] [border-radius: 8px] items-center hover:bg-gray-300 cursor-pointer"
                    onClick={() => {
                      onClickNavigateToListingDetail?.(item.listing_id, item.bidding_id);
                    }}
                  >
                    <div tw="min-w-[60px]">
                      {item.realestate_type ? (
                        <Chip variant={RealestateTypeChipVariant[item.realestate_type]}>
                          {RealestateTypeString[item.realestate_type]}
                        </Chip>
                      ) : (
                        <Chip variant="gray">등록 대기</Chip>
                      )}
                    </div>

                    <div tw="[text-overflow: ellipsis] overflow-hidden whitespace-nowrap text-gray-800">
                      <div tw="[text-overflow: ellipsis] overflow-hidden whitespace-nowrap text-body_01">
                        {item.listing_title}
                      </div>
                      <div tw="text-body_01">
                        {describeBuyOrRent(item.buy_or_rent)}&nbsp;|&nbsp;
                        {item.monthly_rent_fee
                          ? `${formatNumberInKorean(item.trade_or_deposit_price)} / ${formatNumberInKorean(
                              item.monthly_rent_fee,
                            )}`
                          : `${formatNumberInKorean(item.trade_or_deposit_price)}`}
                      </div>
                    </div>
                  </div>
                ))}
              </Accordion.Details>
            ) : (
              <Accordion.Details tw="mx-5 pb-6 text-body_01 text-gray-600 text-center border-b border-b-gray-300">
                내역이 없습니다.
              </Accordion.Details>
            )}
          </Accordion>

          <Accordion
            tw="bg-transparent"
            onChange={(v) => {
              if (v) {
                setSubTab(2);
              } else {
                setSubTab(0);
              }
            }}
            expanded={subTab === 2}
          >
            <Accordion.Summary tw="text-body_01 px-4 py-3" isNewIconSmallV2>
              <div tw="flex flex-row items-center">
                <div tw="[border-radius: 50%] w-0.5 h-0.5 bg-gray-1000 mx-2" />
                가격 협상 중인 매물
                <div tw="ml-auto mr-0.5 text-subhead_01 text-nego">
                  {accordionDetails.listingItem2Count} <span tw="text-body_01 text-gray-800 ml-0.5">건</span>
                </div>
              </div>
            </Accordion.Summary>
            {accordionDetails.listingItem2Count ? (
              <Accordion.Details tw="flex flex-col mx-5 gap-3 max-h-[192px] overflow-y-auto">
                {accordionDetails?.listingItem2Arr?.map((item) => (
                  <div
                    key={`listingItem2-${item.listing_id}`}
                    tw="h-14 flex flex-row bg-white px-4 py-2 [box-shadow: 0px 2px 10px 0px #0000000F] [border-radius: 8px] items-center hover:bg-gray-300 cursor-pointer"
                    onClick={() => onClickNavigateToListingDetail?.(item.listing_id, item.bidding_id)}
                  >
                    <div tw="min-w-[60px]">
                      <Chip variant={RealestateTypeChipVariant[item.realestate_type]}>
                        {RealestateTypeString[item.realestate_type]}
                      </Chip>
                    </div>

                    <div tw="[text-overflow: ellipsis] overflow-hidden whitespace-nowrap text-gray-800">
                      <div tw="[text-overflow: ellipsis] overflow-hidden whitespace-nowrap text-body_01">
                        {item.listing_title}
                      </div>
                      <div tw="text-body_01">
                        {describeBuyOrRent(item.buy_or_rent)}&nbsp;|&nbsp;
                        {item.monthly_rent_fee
                          ? `${formatNumberInKorean(item.trade_or_deposit_price)} / ${formatNumberInKorean(
                              item.monthly_rent_fee,
                            )}`
                          : `${formatNumberInKorean(item.trade_or_deposit_price)}`}
                      </div>
                    </div>
                  </div>
                ))}
              </Accordion.Details>
            ) : (
              <Accordion.Details tw="mx-5 pb-6 text-body_01 text-gray-600 text-center border-b border-b-gray-300">
                내역이 없습니다.
              </Accordion.Details>
            )}
          </Accordion>

          <Accordion
            tw="bg-transparent"
            onChange={(v) => {
              if (v) {
                setSubTab(3);
              } else {
                setSubTab(0);
              }
            }}
            expanded={subTab === 3}
          >
            <Accordion.Summary tw="text-body_01 px-4 py-3" isNewIconSmallV2>
              <div tw="flex flex-row items-center">
                <div tw="[border-radius: 50%] w-0.5 h-0.5 bg-gray-1000 mx-2" />
                추천받은 구해요 요청
                <div tw="ml-auto mr-0.5 text-subhead_01 text-nego">
                  {accordionDetails.suggestCount} <span tw="text-body_01 text-gray-800 ml-0.5">건</span>
                </div>
              </div>
            </Accordion.Summary>

            {accordionDetails.suggestCount ? (
              <Accordion.Details tw="flex flex-col mx-5 gap-3 mb-4 max-h-[256px] overflow-y-auto">
                {accordionDetails?.suggestItemArr?.map((item) => {
                  const buyOrRentText = item.buy_or_rents === BuyOrRent.Buy.toString() ? '매매' : '전월세';
                  const realestateTypes = Array.from(
                    new Set(
                      item?.realestate_types
                        ?.split(',')
                        .map((d) => Number(d))
                        .map((d) => (d === RealestateType.Yunrip ? RealestateType.Dasaedae : d)) ?? [],
                    ),
                  );

                  return (
                    <div
                      key={`suggestItem-${item.suggest_id}`}
                      tw="h-[72px] flex flex-row bg-white px-4 py-2 [box-shadow: 0px 2px 10px 0px #0000000F] [border-radius: 8px] items-center hover:bg-gray-300 cursor-pointer"
                      onClick={() => onClickNavigateToSuggestDetail?.(item.suggest_id)}
                    >
                      <div tw="min-w-[60px]">
                        <Chip variant={item.danji_or_regional === DanjiOrRegionalType.Danji ? 'nego' : 'blue'}>
                          {item.danji_or_regional === DanjiOrRegionalType.Danji ? '단지' : '지역'}
                        </Chip>
                      </div>

                      <div tw="[text-overflow: ellipsis] overflow-hidden whitespace-nowrap text-gray-800">
                        <div tw="[text-overflow: ellipsis] overflow-hidden whitespace-nowrap text-body_01">
                          {item.request_target_text}
                        </div>
                        <div tw="text-body_01">
                          {item.quick_sale ? '급매물' : buyOrRentText}
                          {!item.quick_sale && <>&nbsp;|&nbsp;</>}
                          {!item.quick_sale &&
                            (item.monthly_rent_fee
                              ? `${formatNumberInKorean(item.trade_or_deposit_price)} / ${formatNumberInKorean(
                                  item.monthly_rent_fee,
                                )}`
                              : `${formatNumberInKorean(item.trade_or_deposit_price)}`)}
                        </div>
                        <div tw="[text-overflow: ellipsis] overflow-hidden whitespace-nowrap text-body_01">
                          {item.danji_or_regional === DanjiOrRegionalType.Regional &&
                            `${realestateTypes.map((i) => RealestateTypeString[i])}`}

                          {item.danji_or_regional === DanjiOrRegionalType.Regional && item.pyoung_text && (
                            <>
                              &nbsp;|&nbsp;
                              {item.pyoung_text}
                            </>
                          )}

                          {item.danji_or_regional === DanjiOrRegionalType.Danji && item.pyoung_text && (
                            <>{item.pyoung_text}</>
                          )}

                          {item.move_in_date && (
                            <>
                              &nbsp;|&nbsp; 입주희망일 : {moment(item.move_in_date).format('YY.MM.DD')}{' '}
                              {describeTimeType(item.move_in_date_type)}
                            </>
                          )}

                          {!!item.invest_amount && (
                            <>&nbsp;|&nbsp; 투자예산 : {formatNumberInKorean(item.invest_amount)}</>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Accordion.Details>
            ) : (
              <Accordion.Details tw="mx-5 pb-6 text-body_01 text-gray-600 text-center">
                내역이 없습니다.
              </Accordion.Details>
            )}
          </Accordion>
        </Accordion.Details>
      </Accordion>
    );
  }

  if (chatRoomType === ChatRoomType.BuyerSeller) {
    return (
      <Accordion
        tw="border-b border-t border-gray-300"
        onChange={(v) => {
          if (v) {
            setOpen(v);
          } else {
            setSubTab(0);
          }
        }}
      >
        <Accordion.Summary tw="text-subhead_02 px-5 py-4" isNewIconSmall>
          <div tw="flex flex-row justify-between">
            현재 진행 사항
            <p tw="text-body_01 text-gray-700 inline mr-0.5">상세정보 {open ? '접기' : '보기'}</p>
          </div>
        </Accordion.Summary>

        <Accordion.Details tw="bg-gray-100 mx-5 mb-5 [border-radius: 8px]">
          <Accordion
            tw="bg-transparent"
            onChange={(v) => {
              if (v) {
                setSubTab(3);
              } else {
                setSubTab(0);
              }
            }}
            expanded={subTab === 3}
          >
            <Accordion.Summary tw="text-body_01 px-4 py-3" isNewIconSmallV2>
              <div tw="flex flex-row items-center">
                <div tw="[border-radius: 50%] w-0.5 h-0.5 bg-gray-1000 mx-2" />
                추천받은 구해요 요청
                <div tw="ml-auto mr-0.5 text-subhead_01 text-nego">
                  {accordionDetails.suggestCount} <span tw="text-body_01 text-gray-800 ml-0.5">건</span>
                </div>
              </div>
            </Accordion.Summary>

            {accordionDetails.suggestCount ? (
              <Accordion.Details tw="flex flex-col mx-5 gap-3 max-h-[256px] overflow-y-auto">
                {accordionDetails?.suggestItemArr?.map((item) => {
                  const buyOrRentText = item.buy_or_rents === BuyOrRent.Buy.toString() ? '매매' : '전월세';
                  const realestateTypes = Array.from(
                    new Set(
                      item?.realestate_types
                        ?.split(',')
                        .map((d) => Number(d))
                        .map((d) => (d === RealestateType.Yunrip ? RealestateType.Dasaedae : d)) ?? [],
                    ),
                  );
                  return (
                    <div
                      key={`suggestItem-${item.suggest_id}`}
                      tw="h-[72px] flex flex-row bg-white px-4 py-2 [box-shadow: 0px 2px 10px 0px #0000000F] [border-radius: 8px] items-center hover:bg-gray-300 cursor-pointer"
                      onClick={() => onClickNavigateToSuggestDetail?.(item.suggest_id)}
                    >
                      <div tw="min-w-[60px]">
                        <Chip variant={item.danji_or_regional === DanjiOrRegionalType.Danji ? 'nego' : 'blue'}>
                          {item.danji_or_regional === DanjiOrRegionalType.Danji ? '단지' : '지역'}
                        </Chip>
                      </div>

                      <div tw="[text-overflow: ellipsis] overflow-hidden whitespace-nowrap text-gray-800">
                        <div tw="[text-overflow: ellipsis] overflow-hidden whitespace-nowrap text-body_01">
                          {item.request_target_text}
                        </div>
                        <div tw="text-body_01">
                          {item.quick_sale ? '급매물' : buyOrRentText}
                          {!item.quick_sale && <>&nbsp;|&nbsp;</>}
                          {!item.quick_sale &&
                            (item.monthly_rent_fee
                              ? `${formatNumberInKorean(item.trade_or_deposit_price)} / ${formatNumberInKorean(
                                  item.monthly_rent_fee,
                                )}`
                              : `${formatNumberInKorean(item.trade_or_deposit_price)}`)}
                        </div>
                        <div tw="[text-overflow: ellipsis] overflow-hidden whitespace-nowrap text-body_01">
                          {item.danji_or_regional === DanjiOrRegionalType.Regional &&
                            `${realestateTypes.map((i) => RealestateTypeString[i])}`}

                          {item.danji_or_regional === DanjiOrRegionalType.Regional && item.pyoung_text && (
                            <>
                              &nbsp;|&nbsp;
                              {item.pyoung_text}
                            </>
                          )}

                          {item.danji_or_regional === DanjiOrRegionalType.Danji && item.pyoung_text && (
                            <>{item.pyoung_text}</>
                          )}

                          {item.move_in_date && (
                            <>
                              &nbsp;|&nbsp; 입주희망일 : {moment(item.move_in_date).format('YY.MM.DD')}{' '}
                              {describeTimeType(item.move_in_date_type)}
                            </>
                          )}

                          {!!item.invest_amount && (
                            <>&nbsp;|&nbsp; 투자예산 : {formatNumberInKorean(item.invest_amount)}</>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Accordion.Details>
            ) : (
              <Accordion.Details tw="mx-5 pb-6 text-body_01 text-gray-600 text-center border-b border-b-gray-300">
                내역이 없습니다.
              </Accordion.Details>
            )}
          </Accordion>

          <Accordion
            tw="bg-transparent"
            onChange={(v) => {
              if (v) {
                setSubTab(4);
              } else {
                setSubTab(0);
              }
            }}
            expanded={subTab === 4}
          >
            <Accordion.Summary tw="text-body_01 px-4 py-3" isNewIconSmallV2>
              <div tw="flex flex-row items-center">
                <div tw="[border-radius: 50%] w-0.5 h-0.5 bg-gray-1000 mx-2" />
                추천한 구해요 요청
                <div tw="ml-auto mr-0.5 text-subhead_01 text-nego">
                  {accordionDetails.recommendCount} <span tw="text-body_01 text-gray-800 ml-0.5">건</span>
                </div>
              </div>
            </Accordion.Summary>
            {accordionDetails.recommendCount ? (
              <Accordion.Details tw="flex flex-col mx-5 gap-3 mb-4 max-h-[256px] overflow-y-auto">
                {accordionDetails?.recommendItemArr?.map((item) => {
                  const buyOrRentText = item.buy_or_rents === BuyOrRent.Buy.toString() ? '매매' : '전월세';
                  const realestateTypes = Array.from(
                    new Set(
                      item?.realestate_types
                        ?.split(',')
                        .map((d) => Number(d))
                        .map((d) => (d === RealestateType.Yunrip ? RealestateType.Dasaedae : d)) ?? [],
                    ),
                  );
                  return (
                    <div
                      key={`recommendItem-${item.suggest_id}`}
                      tw="h-[72px] flex flex-row bg-white px-4 py-2 [box-shadow: 0px 2px 10px 0px #0000000F] [border-radius: 8px] items-center hover:bg-gray-300 cursor-pointer"
                      onClick={() => onClickNavigateToSuggestRecommended?.(item.suggest_recommend_id)}
                    >
                      <div tw="min-w-[60px]">
                        <Chip variant={item.danji_or_regional === DanjiOrRegionalType.Danji ? 'nego' : 'blue'}>
                          {item.danji_or_regional === DanjiOrRegionalType.Danji ? '단지' : '지역'}
                        </Chip>
                      </div>

                      <div tw="[text-overflow: ellipsis] overflow-hidden whitespace-nowrap text-gray-800">
                        <div tw="[text-overflow: ellipsis] overflow-hidden whitespace-nowrap text-body_01">
                          {item.request_target_text}
                        </div>
                        <div tw="text-body_01">
                          {item.quick_sale ? '급매물' : buyOrRentText}
                          {!item.quick_sale && <>&nbsp;|&nbsp;</>}
                          {!item.quick_sale &&
                            (item.monthly_rent_fee
                              ? `${formatNumberInKorean(item.trade_or_deposit_price)} / ${formatNumberInKorean(
                                  item.monthly_rent_fee,
                                )}`
                              : `${formatNumberInKorean(item.trade_or_deposit_price)}`)}
                        </div>
                        <div tw="[text-overflow: ellipsis] overflow-hidden whitespace-nowrap text-body_01">
                          {item.danji_or_regional === DanjiOrRegionalType.Regional &&
                            `${realestateTypes.map((i) => RealestateTypeString[i])}`}

                          {item.danji_or_regional === DanjiOrRegionalType.Regional && item.pyoung_text && (
                            <>
                              &nbsp;|&nbsp;
                              {item.pyoung_text}
                            </>
                          )}

                          {item.danji_or_regional === DanjiOrRegionalType.Danji && item.pyoung_text && (
                            <>{item.pyoung_text}</>
                          )}

                          {item.move_in_date && (
                            <>
                              &nbsp;|&nbsp; 입주희망일 : {moment(item.move_in_date).format('YY.MM.DD')}{' '}
                              {describeTimeType(item.move_in_date_type)}
                            </>
                          )}

                          {!!item.invest_amount && (
                            <>&nbsp;|&nbsp; 투자예산 : {formatNumberInKorean(item.invest_amount)}</>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Accordion.Details>
            ) : (
              <Accordion.Details tw="mx-5 pb-6 text-body_01 text-gray-600 text-center">
                내역이 없습니다.
              </Accordion.Details>
            )}
          </Accordion>
        </Accordion.Details>
      </Accordion>
    );
  }

  return null;
}
