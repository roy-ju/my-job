import { GetDanjiDetailResponse } from '@/apis/danji/danjiDetail';
import { GetDanjiRealPricesPyoungListResponse } from '@/apis/danji/danjiRealPricesPyoungList';
import { Button, PersistentBottomBar, Separator } from '@/components/atoms';
import { DatePicker, Dropdown, NavigationHeader, OverlayPresenter, Popup, TextField } from '@/components/molecules';
import { BuyOrRent } from '@/constants/enums';
import { cuttingDot } from '@/utils/fotmat';
import moment from 'moment';
import React, { useMemo, useRef } from 'react';
import tw from 'twin.macro';
import CloseContained from '@/assets/icons/close_contained.svg';
import CloseContainedBlack from '@/assets/icons/close_contained_black.svg';
import { formatNumberInKorean } from '@/utils';

export const BasicInfo = ({ danji, isPb = false }: { danji: GetDanjiDetailResponse; isPb?: boolean }) => (
  <div tw="flex flex-col px-5 pt-10" css={[isPb ? tw`pb-7` : tw`pb-10`]}>
    <span tw="text-b1 font-bold">{danji.name}</span>
    <span tw="text-info [line-height: 1.25rem]">{danji.road_name_address || danji.jibun_address}</span>
    <div tw="flex items-center gap-1" css={[isPb ? tw`mb-0` : tw`mb-0`]}>
      {danji.total_saedae_count && (
        <>
          <span tw="text-info text-gray-700">{danji.total_saedae_count || '-'}세대</span>
        </>
      )}

      {danji.total_dong_count && (
        <>
          <div tw="w-px h-2 bg-gray-300 mx-1" />
          <span tw="text-info text-gray-700">총 {danji.total_dong_count || '-'}동</span>
        </>
      )}

      {danji.jeonyong_min > 0 && danji.jeonyong_max === 0 && (
        <>
          <div tw="w-px h-2 bg-gray-300 mx-1" />
          <span tw="text-info text-gray-700">{`전용 ${cuttingDot(danji.jeonyong_min)}㎡`}</span>
        </>
      )}

      {danji.jeonyong_min === 0 && danji.jeonyong_max > 0 && (
        <>
          <div tw="w-px h-2 bg-gray-300 mx-1" />
          <span tw="text-info text-gray-700">{`전용 ${cuttingDot(danji.jeonyong_max)}㎡`}</span>
        </>
      )}

      {danji.jeonyong_min > 0 && danji.jeonyong_max > 0 && (
        <>
          <div tw="w-px h-2 bg-gray-300 mx-1" />
          <span tw="text-info text-gray-700">
            {cuttingDot(danji.jeonyong_min) === cuttingDot(danji?.jeonyong_max)
              ? `전용 ${cuttingDot(danji?.jeonyong_min)}㎡`
              : `전용 ${cuttingDot(danji?.jeonyong_min)}㎡ ~ ${cuttingDot(danji?.jeonyong_max)}㎡`}
          </span>
        </>
      )}

      {danji.construction_start_date?.replaceAll(' ', '') && (
        <>
          <div tw="w-px h-2 bg-gray-300" />
          <span tw="text-info text-gray-700">{moment(danji.construction_start_date).format('YYYY.MM')} 준공</span>
        </>
      )}
    </div>
  </div>
);

export const GuideInfo = () => (
  <div tw="px-5 pt-7 pb-10 text-b1 font-bold">
    최소 10명의 중개사님에게 추천 요청이 발송됩니다.
    <br />
    <br />
    일일이 발품 팔지 않고 숨겨진 매물을 찾고,
    <br />
    중개사님의 제안을 비교해서 협의 여부를 선택해 보세요.
  </div>
);

export const BuyOrRentField = ({
  buyOrRent,
  onChangeBuyOrRent,
}: {
  buyOrRent?: number;
  onChangeBuyOrRent?: (val: number) => void;
}) => (
  <div tw="flex flex-col px-5 py-10 gap-4">
    <span tw="text-b1 font-bold">매물의 거래 종류를 선택해 주세요.</span>
    <div tw="flex items-center gap-3">
      <Button
        variant="outlined"
        size="bigger"
        tw="flex-1"
        selected={buyOrRent === BuyOrRent.Buy}
        onClick={() => {
          if (onChangeBuyOrRent) {
            onChangeBuyOrRent(BuyOrRent.Buy);
          }
        }}
      >
        매매
      </Button>
      <Button
        variant="outlined"
        size="bigger"
        tw="flex-1"
        selected={buyOrRent === BuyOrRent.Jeonsae}
        onClick={() => {
          if (onChangeBuyOrRent) {
            onChangeBuyOrRent(BuyOrRent.Jeonsae);
          }
        }}
      >
        전월세
      </Button>
    </div>
  </div>
);

export const PriceField = ({
  buyOrRent,
  tradeOrDepositPrice,
  monthlyRentFee,
  onChangeTradeOrDepositPrice,
  onChangeMonthlyRentFee,
}: {
  buyOrRent?: number;
  tradeOrDepositPrice?: string;
  monthlyRentFee?: string;
  onChangeTradeOrDepositPrice?: React.ChangeEventHandler<HTMLInputElement>;
  onChangeMonthlyRentFee?: React.ChangeEventHandler<HTMLInputElement>;
}) => {
  const priceLabel = useMemo(() => {
    if (buyOrRent === BuyOrRent.Buy) {
      if (tradeOrDepositPrice) {
        return '매매 가격';
      }
      return '매매 가격 입력';
    }
    if (buyOrRent === BuyOrRent.Jeonsae) {
      if (tradeOrDepositPrice) {
        return '보증금 가격';
      }
      return '보증금 가격 입력';
    }

    return '';
  }, [buyOrRent, tradeOrDepositPrice]);

  return (
    <div tw="flex flex-col px-5 py-10 gap-4">
      <span tw="text-b1 font-bold">매물의 가격대를 알려주세요.</span>

      <div>
        <TextField variant="outlined">
          <TextField.PriceInput label={priceLabel} value={tradeOrDepositPrice} onChange={onChangeTradeOrDepositPrice} />
        </TextField>
        {!!tradeOrDepositPrice && (
          <TextField.PriceHelperMessage tw="mr-4">{tradeOrDepositPrice}</TextField.PriceHelperMessage>
        )}
      </div>

      {buyOrRent === BuyOrRent.Jeonsae && (
        <div>
          <TextField variant="outlined">
            <TextField.PriceInput
              label={monthlyRentFee && monthlyRentFee.length !== 0 ? '월차임 가격' : '월차임 가격 입력'}
              value={monthlyRentFee}
              onChange={onChangeMonthlyRentFee}
            />
          </TextField>
          {!!monthlyRentFee && <TextField.PriceHelperMessage tw="mr-4">{monthlyRentFee}</TextField.PriceHelperMessage>}
        </div>
      )}

      <span tw="text-info text-gray-700">
        희망하시는 가격을 기준으로 거래 가능한 매물을 추천해드립니다. 시세와 과도하게 차이가 나는 가격을 제시하면
        추천받을 수 있는 매물 수가 적거나 없을 수 있습니다
      </span>
    </div>
  );
};

export const IntersetedPyoungField = ({
  danjiRealPricesPyoungList,
  selectedGonggeupPyoungList,
  pyoungInputValue,
  onChangePyoungField,
  onClickPyoungDeleteIcon,
  onClickPyoungAddIcon,
  onClickPyoungButton,
  onClickPyoungCloseButton,
}: {
  danjiRealPricesPyoungList?: GetDanjiRealPricesPyoungListResponse['list'];
  selectedGonggeupPyoungList: number[];
  pyoungInputValue: string;
  onChangePyoungField?: React.ChangeEventHandler<HTMLInputElement>;
  onClickPyoungDeleteIcon?: () => void;
  onClickPyoungAddIcon?: (val: string) => void;
  onClickPyoungButton?: (val: number) => void;
  onClickPyoungCloseButton?: (val: number) => void;
}) => {
  const isShowDanjiRealPricesPyoungList = useMemo(() => {
    if (danjiRealPricesPyoungList && danjiRealPricesPyoungList.length > 0) {
      return true;
    }
    return false;
  }, [danjiRealPricesPyoungList]);

  return (
    <>
      <div tw="px-5 pt-10">
        <span tw="text-b1 font-bold">
          {isShowDanjiRealPricesPyoungList ? '관심있는 평수를 선택해 주세요.' : '관심있는 평수를 입력해 주세요.'}
        </span>
      </div>
      <div tw="flex flex-col pt-4 px-5 gap-4">
        {danjiRealPricesPyoungList && isShowDanjiRealPricesPyoungList && (
          <div tw="flex flex-wrap gap-2 pb-7 [max-width: 280px]">
            {danjiRealPricesPyoungList.map((item) => (
              <Button
                variant="outlined"
                key={item.gonggeup_pyoung}
                size="small"
                tw="[border-radius: 32px] whitespace-nowrap"
                onClick={() => {
                  if (onClickPyoungButton) {
                    onClickPyoungButton(item.gonggeup_pyoung);
                  }
                }}
                selected={selectedGonggeupPyoungList.includes(item.gonggeup_pyoung)}
              >
                {item.gonggeup_pyoung}평
              </Button>
            ))}
          </div>
        )}
      </div>
      <div tw="flex flex-col px-5 pt-7 pb-10 gap-4">
        <span tw="text-b2">직접입력</span>
        <TextField variant="outlined">
          <TextField.NumericInput
            label={pyoungInputValue ? '평 수' : '평수 입력'}
            value={pyoungInputValue}
            onChange={onChangePyoungField}
          />
          <TextField.Trailing tw="flex items-center">
            <Button variant="ghost" size="small" onClick={onClickPyoungDeleteIcon}>
              <CloseContained />
            </Button>
            <Button
              size="small"
              onClick={() => {
                if (onClickPyoungAddIcon) {
                  onClickPyoungAddIcon(pyoungInputValue);
                }
              }}
            >
              확인
            </Button>
          </TextField.Trailing>
        </TextField>
        {selectedGonggeupPyoungList && selectedGonggeupPyoungList.length > 0 && (
          <div tw="flex flex-wrap gap-2 [max-width: 280px]">
            {selectedGonggeupPyoungList.map((item) => (
              <Button
                variant="outlined"
                key={item}
                selected
                tw="px-3 [border-radius: 32px]"
                size="small"
                onClick={() => {
                  if (onClickPyoungCloseButton) {
                    onClickPyoungCloseButton(item);
                  }
                }}
              >
                <CloseContainedBlack style={{ marginRight: '4px' }} />
                {item}평
              </Button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export const LiveOrInvestmentField = ({
  purpose,
  remainingAmountPaymentTime,
  remainingAmountPaymentTimeType,
  moveInDate,
  moveInDateType,
  onClickLive,
  onClickInvestment,
  onChangeRemainingAmountPaymentTime,
  onChangeMoveInDate,
  onChangeMoveInDateType,
  onChangeRemainingAmountTimeType,
}: {
  purpose?: number;
  remainingAmountPaymentTime: Date | null;
  remainingAmountPaymentTimeType?: string;
  moveInDate: Date | null;
  moveInDateType?: string;
  onClickLive?: () => void;
  onClickInvestment?: () => void;
  onChangeRemainingAmountPaymentTime?: (val: Date | null) => void;
  onChangeMoveInDate?: (val: Date | null) => void;
  onChangeMoveInDateType?: (val: string) => void;
  onChangeRemainingAmountTimeType?: (val: string) => void;
}) => {
  const minDate = useRef(new Date());
  return (
    <div tw="w-full py-10">
      <div tw="px-5">
        <span tw="text-b1 font-bold">매매 거래의 목적은 무엇인가요?</span>
      </div>
      <div
        tw="w-full flex items-center gap-3 pt-4 px-5"
        css={[purpose ? tw`pb-7 [border-bottom: 1px solid #E9ECEF ]` : tw`pb-10`]}
      >
        <Button variant="outlined" onClick={onClickLive} tw="flex-1" size="bigger" selected={purpose === 1}>
          실거주
        </Button>
        <Button variant="outlined" onClick={onClickInvestment} tw="flex-1" size="bigger" selected={purpose === 2}>
          투자
        </Button>
      </div>
      {purpose === 1 && (
        <div tw="pt-7 px-5">
          <span tw="text-b1 font-bold">입주일</span>
          <div tw="flex items-center mt-4 gap-3">
            <DatePicker
              variant="outlined"
              tw="flex-1 min-w-0"
              placeholder="날짜"
              minDate={minDate.current}
              value={moveInDate}
              onChange={(v) => onChangeMoveInDate?.(v)}
            />
            <Dropdown
              tw="flex-1 min-w-0"
              value={moveInDateType}
              variant="outlined"
              onChange={(v) => onChangeMoveInDateType?.(v)}
            >
              <Dropdown.Option value="이전">이전</Dropdown.Option>
              <Dropdown.Option value="이후">이후</Dropdown.Option>
              <Dropdown.Option value="당일">당일</Dropdown.Option>
            </Dropdown>
          </div>
        </div>
      )}
      {purpose === 2 && (
        <div tw="pt-7 px-5">
          <span tw="text-b1 font-bold">잔금일</span>
          <div tw="flex items-center mt-4 gap-3">
            <DatePicker
              variant="outlined"
              tw="flex-1 min-w-0"
              placeholder="날짜"
              minDate={minDate.current}
              value={remainingAmountPaymentTime}
              onChange={(v) => onChangeRemainingAmountPaymentTime?.(v)}
            />
            <Dropdown
              tw="flex-1 min-w-0"
              value={remainingAmountPaymentTimeType}
              variant="outlined"
              onChange={(v) => onChangeRemainingAmountTimeType?.(v)}
            >
              <Dropdown.Option value="이전">이전</Dropdown.Option>
              <Dropdown.Option value="이후">이후</Dropdown.Option>
              <Dropdown.Option value="당일">당일</Dropdown.Option>
            </Dropdown>
          </div>
        </div>
      )}
    </div>
  );
};

export const InterestedFloor = ({
  totalFloors,
  onClickFloorButton,
}: {
  totalFloors: number[];
  onClickFloorButton: (val: number) => void;
}) => (
  <div tw="w-full py-10 px-5">
    <span tw="text-b1 font-bold">관심있는 층수를 선택해 주세요. (복수선택)</span>
    <div tw="flex gap-3 items-center mt-4">
      <Button variant="outlined" tw="flex-1" selected={totalFloors.includes(1)} onClick={() => onClickFloorButton?.(1)}>
        저층
      </Button>
      <Button variant="outlined" tw="flex-1" selected={totalFloors.includes(2)} onClick={() => onClickFloorButton?.(2)}>
        중층
      </Button>
      <Button variant="outlined" tw="flex-1" selected={totalFloors.includes(3)} onClick={() => onClickFloorButton?.(3)}>
        고층
      </Button>
    </div>
  </div>
);

export const EtcField = ({
  type,
  etc,
  onChangeEtcField,
}: {
  type: number;
  etc: string;
  onChangeEtcField?: React.ChangeEventHandler<HTMLTextAreaElement>;
}) => (
  <div tw="w-full py-10 px-5">
    <div tw="flex flex-col gap-1">
      <span tw="text-b1 font-bold">네고를 위한 추가 조건이 있다면 알려주세요. (선택)</span>
      <span tw="text-info text-gray-700">자세히 알려주실수록 거래가능성이 높아져요.</span>
    </div>

    <div tw="flex gap-3 items-center mt-3">
      <TextField variant="outlined" tw="w-full">
        {type === 1 ? (
          <TextField.TextArea
            value={etc}
            onChange={onChangeEtcField}
            tw="min-h-[54px] placeholder:[font-size: 14px] placeholder:[line-height: 22px] py-4"
            placeholder="예) 판상형을 원해요, 정남향을 원해요"
            spellCheck="false"
          />
        ) : (
          <TextField.TextArea
            value={etc}
            onChange={onChangeEtcField}
            tw="min-h-[54px] placeholder:[font-size: 14px] placeholder:[line-height: 22px] py-4"
            placeholder="예) 판상형을 원해요, 정남향을 원해요"
            spellCheck="false"
          />
        )}
      </TextField>
    </div>
    <div tw="[text-align: right] mt-1.5">
      <span tw="text-info [line-height: 14px]">{etc.length} / 200</span>
    </div>
  </div>
);

export default function DanjiRecommendation({
  danji,
  step,
  buyOrRent,
  tradeOrDepositPrice,
  monthlyRentFee,
  isValidate,
  danjiRealPricesPyoungList,
  selectedGonggeupPyoungList,
  pyoungInputValue,
  purpose,
  remainingAmountPaymentTime,
  remainingAmountPaymentTimeType,
  moveInDate,
  moveInDateType,
  totalFloors,
  etc,
  openResetPopup,
  isRenderFinalForm,
  onChangeBuyOrRent,
  onChangeTradeOrDepositPrice,
  onChangeMonthlyRentFee,
  onChangePyoungField,
  onClickPyoungButton,
  onClickPyoungDeleteIcon,
  onClickPyoungAddIcon,
  onClickPyoungCloseButton,
  onClickLive,
  onClickInvestment,
  onChangeRemainingAmountPaymentTime,
  onChangeMoveInDate,
  onChangeMoveInDateType,
  onChangeRemainingAmountTimeType,
  onClickFloorButton,
  onChangeEtcField,
  onClosePopup,
  onConfirmPopup,
  onClickNext,
  onClickBack,
  onClickBackFinalForm,
  handleCTA,
}: {
  danji: GetDanjiDetailResponse;
  step?: number;
  buyOrRent?: number;
  tradeOrDepositPrice?: string;
  monthlyRentFee?: string;
  isValidate?: boolean;
  danjiRealPricesPyoungList?: GetDanjiRealPricesPyoungListResponse['list'];
  selectedGonggeupPyoungList: number[];
  pyoungInputValue: string;
  purpose?: number;
  remainingAmountPaymentTime: Date | null;
  remainingAmountPaymentTimeType?: string;
  moveInDate: Date | null;
  moveInDateType?: string;
  totalFloors: number[];
  etc: string;
  openResetPopup?: boolean;
  isRenderFinalForm: boolean;
  onChangeBuyOrRent?: (val: number) => void;
  onChangeTradeOrDepositPrice?: React.ChangeEventHandler<HTMLInputElement>;
  onChangeMonthlyRentFee?: React.ChangeEventHandler<HTMLInputElement>;
  onChangePyoungField?: React.ChangeEventHandler<HTMLInputElement>;
  onClickPyoungButton?: (val: number) => void;
  onClickPyoungDeleteIcon?: () => void;
  onClickPyoungAddIcon?: (val: string) => void;
  onClickPyoungCloseButton?: (val: number) => void;
  onClickLive?: () => void;
  onClickInvestment?: () => void;
  onChangeRemainingAmountPaymentTime?: (val: Date | null) => void;
  onChangeMoveInDate?: (val: Date | null) => void;
  onChangeMoveInDateType?: (val: string) => void;
  onChangeRemainingAmountTimeType?: (val: string) => void;
  onClickFloorButton: (val: number) => void;
  onChangeEtcField?: React.ChangeEventHandler<HTMLTextAreaElement>;
  onClosePopup?: () => void;
  onConfirmPopup?: () => void;
  onClickNext?: (val: boolean) => void;
  onClickBack?: () => void;
  onClickBackFinalForm?: () => void;
  handleCTA: () => void;
}) {
  return (
    <>
      <div tw="w-full relative h-full flex flex-col">
        <NavigationHeader>
          {!isRenderFinalForm && onClickBack && <NavigationHeader.BackButton onClick={onClickBack} />}
          {isRenderFinalForm && onClickBackFinalForm && <NavigationHeader.BackButton onClick={onClickBackFinalForm} />}
          <NavigationHeader.Title>단지 매물 추천받기</NavigationHeader.Title>
        </NavigationHeader>

        {!isRenderFinalForm && (
          <div id="danji-recommend-formContainer" tw="flex-1 overflow-auto">
            {typeof step === 'number' && step > 0 && (
              <>
                <div id="danji-recommend-default">
                  <GuideInfo />
                  <Separator tw="w-full [min-height: 8px] h-2 bg-gray-300" />
                  <BasicInfo danji={danji} />
                  <Separator tw="w-full [min-height: 8px] h-2 bg-gray-300" />
                  <IntersetedPyoungField
                    danjiRealPricesPyoungList={danjiRealPricesPyoungList}
                    selectedGonggeupPyoungList={selectedGonggeupPyoungList}
                    pyoungInputValue={pyoungInputValue}
                    onChangePyoungField={onChangePyoungField}
                    onClickPyoungDeleteIcon={onClickPyoungDeleteIcon}
                    onClickPyoungAddIcon={onClickPyoungAddIcon}
                    onClickPyoungButton={onClickPyoungButton}
                    onClickPyoungCloseButton={onClickPyoungCloseButton}
                  />
                  <Separator tw="w-full [min-height: 8px] h-2 bg-gray-300" />
                </div>
              </>
            )}

            {typeof step === 'number' && step > 1 && (
              <div id="danji-recommend-floor">
                <InterestedFloor totalFloors={totalFloors} onClickFloorButton={onClickFloorButton} />
                <Separator tw="w-full [min-height: 8px] h-2 bg-gray-300" />
              </div>
            )}

            {typeof step === 'number' && step > 2 && (
              <div id="danji-recommend-buyOrRent">
                <BuyOrRentField buyOrRent={buyOrRent} onChangeBuyOrRent={onChangeBuyOrRent} />
                <Separator tw="w-full [min-height: 8px] h-2 bg-gray-300" />
              </div>
            )}

            {typeof step === 'number' && step > 3 && buyOrRent === BuyOrRent.Buy && (
              <div id="danji-recommend-purpose">
                <LiveOrInvestmentField
                  purpose={purpose}
                  remainingAmountPaymentTime={remainingAmountPaymentTime}
                  remainingAmountPaymentTimeType={remainingAmountPaymentTimeType}
                  moveInDate={moveInDate}
                  moveInDateType={moveInDateType}
                  onClickLive={onClickLive}
                  onClickInvestment={onClickInvestment}
                  onChangeRemainingAmountPaymentTime={onChangeRemainingAmountPaymentTime}
                  onChangeMoveInDate={onChangeMoveInDate}
                  onChangeMoveInDateType={onChangeMoveInDateType}
                  onChangeRemainingAmountTimeType={onChangeRemainingAmountTimeType}
                />
                <Separator tw="w-full [min-height: 8px] h-2 bg-gray-300" />
              </div>
            )}

            {typeof step === 'number' && step > 4 && buyOrRent === BuyOrRent.Buy && (
              <div id="danji-recommend-price">
                <PriceField
                  buyOrRent={buyOrRent}
                  tradeOrDepositPrice={tradeOrDepositPrice}
                  monthlyRentFee={monthlyRentFee}
                  onChangeTradeOrDepositPrice={onChangeTradeOrDepositPrice}
                  onChangeMonthlyRentFee={onChangeMonthlyRentFee}
                />
                <Separator tw="w-full [min-height: 8px] h-2 bg-gray-300" />
              </div>
            )}

            {typeof step === 'number' && step > 5 && buyOrRent === BuyOrRent.Buy && (
              <div id="danji-recommend-etc">
                <EtcField etc={etc} onChangeEtcField={onChangeEtcField} type={1} />
              </div>
            )}

            {typeof step === 'number' && step > 3 && buyOrRent !== BuyOrRent.Buy && (
              <div id="danji-recommend-price">
                <PriceField
                  buyOrRent={buyOrRent}
                  tradeOrDepositPrice={tradeOrDepositPrice}
                  monthlyRentFee={monthlyRentFee}
                  onChangeTradeOrDepositPrice={onChangeTradeOrDepositPrice}
                  onChangeMonthlyRentFee={onChangeMonthlyRentFee}
                />
                <Separator tw="w-full [min-height: 8px] h-2 bg-gray-300" />
              </div>
            )}

            {typeof step === 'number' && step > 4 && buyOrRent !== BuyOrRent.Buy && (
              <div id="danji-recommend-etc">
                <EtcField etc={etc} onChangeEtcField={onChangeEtcField} type={2} />
              </div>
            )}
          </div>
        )}
        {isRenderFinalForm && (
          <div tw="flex-1 overflow-auto">
            <div tw="py-7 px-5">
              <span tw="text-b1 font-bold">입력한 내용으로 매물추천을 받아 볼래요.</span>
            </div>
            <Separator tw="w-full [min-height: 8px] h-2 bg-gray-300" />
            <BasicInfo danji={danji} isPb />
            <div tw="px-5 py-7 [border-top: 1px solid #E9ECEF]">
              <span tw="text-b1 font-bold">원하는 매물</span>
              <div tw="text-b2 flex justify-between mb-2 mt-4">
                <span>거래 종류</span>
                <span>{buyOrRent === BuyOrRent.Buy ? '매매' : '전월세'}</span>
              </div>
              <div tw="text-b2 flex justify-between mb-2">
                <span>가격</span>
                {buyOrRent === BuyOrRent.Buy && (
                  <span>{formatNumberInKorean(Number(tradeOrDepositPrice) * 10000)}</span>
                )}
                {buyOrRent === BuyOrRent.Jeonsae &&
                  (monthlyRentFee ? (
                    <span>
                      {formatNumberInKorean(Number(tradeOrDepositPrice) * 10000)}&nbsp;/&nbsp;
                      {formatNumberInKorean(Number(monthlyRentFee) * 10000)}
                    </span>
                  ) : (
                    <span>{formatNumberInKorean(Number(tradeOrDepositPrice) * 10000)}</span>
                  ))}
              </div>
              <div tw="text-b2 flex justify-between mb-2">
                <span>관심있는 평수</span>
                <span>{selectedGonggeupPyoungList.map((item) => `${item}평`).join(',')}</span>
              </div>
              {buyOrRent === BuyOrRent.Buy && (
                <div tw="text-b2 flex justify-between mb-2">
                  <span>매매 목적</span>
                  <div tw="flex items-center">
                    {purpose === 1 && <span>실거주,&nbsp;</span>}
                    {purpose === 1 && <span>입주일&nbsp;</span>}
                    {moveInDate && <span>{moment(moveInDate).format('YYYY.MM.DD')}&nbsp;</span>}
                    {purpose === 1 && moveInDateType && <span>{moveInDateType}</span>}
                    {purpose === 2 && <span>투자,&nbsp;</span>}
                    {purpose === 2 && <span>잔금일&nbsp;</span>}
                    {remainingAmountPaymentTime && (
                      <span>{moment(remainingAmountPaymentTime).format('YYYY.MM.DD')}&nbsp;</span>
                    )}
                    {purpose === 2 && remainingAmountPaymentTimeType && <span>{remainingAmountPaymentTimeType}</span>}
                  </div>
                </div>
              )}
              {etc && (
                <div tw="text-b2 flex justify-between">
                  <span>추가 조건</span>
                  <span tw="[max-width: 244px] whitespace-pre-wrap [text-align: right]">{etc}</span>
                </div>
              )}
            </div>

            <Separator tw="w-full [min-height: 8px] h-2 bg-gray-300" />
            <div tw="flex items-center pt-[30px] px-5 gap-2" />
          </div>
        )}
        <PersistentBottomBar>
          {isRenderFinalForm && (
            <Button tw="w-full" size="bigger" onClick={handleCTA}>
              추천 받기
            </Button>
          )}
          {!isRenderFinalForm && (
            <div>
              <Button
                tw="w-full"
                size="bigger"
                disabled={!isValidate}
                onClick={() => {
                  if (onClickNext) {
                    onClickNext(true);
                  }
                }}
              >
                다음
              </Button>
              {step && step > 1 && (
                <p tw="text-info [line-height: 16px] [text-align: center] mt-[7px]">
                  수정을 원하시면 위로 스크롤하세요.
                </p>
              )}
            </div>
          )}
        </PersistentBottomBar>
      </div>
      {openResetPopup && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup tw="py-6">
              <Popup.Title>
                거래 종류를 변경하시면 처음부터 다시 입력하셔야 합니다. 거래 종류를 변경하시겠습니까?
              </Popup.Title>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.CancelButton onClick={onClosePopup}>취소</Popup.CancelButton>
              <Popup.ActionButton onClick={onConfirmPopup}>확인</Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
    </>
  );
}
