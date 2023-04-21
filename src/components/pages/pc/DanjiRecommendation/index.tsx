import { useAPI_GetDanjiDetail } from '@/apis/danji/danjiDetail';
import { useAPI_DanjiRealPricesPyoungList } from '@/apis/danji/danjiRealPricesPyoungList';
import danjiRecommendationFinal from '@/apis/danji/danjiRecommendationFinal';
import { Panel } from '@/components/atoms';
import { DanjiRecommendation as DanjiRecommendationTemplate } from '@/components/templates';
import { BuyOrRent } from '@/constants/enums';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import React, { ChangeEventHandler, useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default function DanjiRecommendation({ depth, panelWidth }: Props) {
  const router = useRouter(depth);

  const [step, setStep] = useState(0);
  const [buyOrRent, setBuyOrRent] = useState<number>();
  const [openResetPopup, setOpenResetPopup] = useState(false);
  const [tradeOrDepositPrice, setTradeOrDepositPrice] = useState('');
  const [monthlyRentFee, setMonthlyRentFee] = useState('');
  const [selectedGonggeupPyoungList, setSelectedGonggeupPyoungList] = useState<number[]>([]);
  const [pyoungInputValue, setPyoungInputValue] = useState('');
  const [purpose, setPurpose] = useState<number>();

  const [remainingAmountPaymentTime, setRemainingAmountPaymentTime] = useState<Date | null>(null);
  const [remainingAmountPaymentTimeType, setRemainingAmountPaymentType] = useState<string>('이후');

  const [moveInDate, setMoveInDate] = useState<Date | null>(null);
  const [moveInDateType, setMoveInDateType] = useState<string>('이후');
  const [totalFloors, setTotalFloors] = useState<number[]>([]);
  const [etc, setEtc] = useState('');
  const [isRenderFinalForm, setIsRenderFinalForm] = useState(false);
  const [checked, setChecked] = useState(false);

  const { danji } = useAPI_GetDanjiDetail({
    pnu: router?.query?.p as string,
    realestateType: router?.query?.rt ? Number(router.query.rt) : undefined,
  });

  const { list: danjiRealPricesPyoungList } = useAPI_DanjiRealPricesPyoungList({
    pnu: step === 3 ? danji?.pnu : undefined,
    realestateType: step === 3 ? danji?.type : undefined,
    buyOrRent,
  });

  const isValidate = useMemo(() => {
    if (step === 0) {
      return true;
    }
    if (step === 1) {
      if (buyOrRent) {
        return true;
      }
      return false;
    }

    if (step === 2) {
      if (buyOrRent === BuyOrRent.Buy) {
        if (Number(tradeOrDepositPrice)) {
          return true;
        }
        return false;
      }

      if (buyOrRent === BuyOrRent.Jeonsae) {
        if (Number(tradeOrDepositPrice) && Number(monthlyRentFee)) {
          return true;
        }
        return false;
      }
      return false;
    }

    if (step === 3) {
      return selectedGonggeupPyoungList.length > 0;
    }

    if (step === 4 && buyOrRent === BuyOrRent.Buy) {
      if (purpose === 1 && moveInDate && moveInDateType) {
        return true;
      }
      if (purpose === 2 && remainingAmountPaymentTime && remainingAmountPaymentTimeType) {
        return true;
      }
      return false;
    }

    if (step === 5 && buyOrRent === BuyOrRent.Buy) {
      return totalFloors.length > 0;
    }

    if (step === 4 && buyOrRent !== BuyOrRent.Buy) {
      return totalFloors.length > 0;
    }

    if (step === 6 && buyOrRent === BuyOrRent.Buy) {
      return true;
    }

    if (step === 5 && buyOrRent !== BuyOrRent.Buy) {
      return true;
    }

    return false;
  }, [
    buyOrRent,
    monthlyRentFee,
    moveInDate,
    moveInDateType,
    purpose,
    remainingAmountPaymentTime,
    remainingAmountPaymentTimeType,
    selectedGonggeupPyoungList.length,
    step,
    totalFloors.length,
    tradeOrDepositPrice,
  ]);

  /** stpe 1 거래종류 이벤트 핸들러 */
  const onChangeBuyOrRent = (val: number) => {
    if (buyOrRent) {
      setOpenResetPopup(true);
    } else {
      setBuyOrRent(val);
    }
  };

  /** stpe 2 돈관련 이벤트 핸들러 */
  const onChangeTradeOrDepositPrice = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    setTradeOrDepositPrice(e.target.value);
  }, []);

  /** stpe 2 돈관련 이벤트 핸들러 */
  const onChangeMonthlyRentFee = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    setMonthlyRentFee(e.target.value);
  }, []);

  /** stpe 3 평관련 이벤트 핸들러 */
  const onClickPyoungButton = useCallback(
    (val: number) => {
      if (selectedGonggeupPyoungList.includes(val)) {
        setSelectedGonggeupPyoungList((prev) => prev.filter((item) => item !== val));
      } else {
        setSelectedGonggeupPyoungList((prev) => [...prev, val]);
      }
    },
    [selectedGonggeupPyoungList],
  );

  /** stpe 3 평관련 이벤트 핸들러 */
  const onClickPyoungCloseButton = useCallback((val: number) => {
    setSelectedGonggeupPyoungList((prev) => prev.filter((item) => item !== val));
  }, []);

  /** stpe 3 평관련 이벤트 핸들러 */
  const onChangePyoungField = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    setPyoungInputValue(e.target.value);
  }, []);

  /** stpe 3 평관련 이벤트 핸들러 */
  const onClickPyoungDeleteIcon = useCallback(() => {
    setPyoungInputValue('');
  }, []);

  /** stpe 3 평관련 이벤트 핸들러 */
  const onClickPyoungAddIcon = useCallback(
    (val: string) => {
      if (!val) return;

      if (selectedGonggeupPyoungList.includes(Number(val))) {
        toast.error('이미 추가하신 평형입니다.');
      } else {
        setSelectedGonggeupPyoungList((prev) => [...prev, Number(val)]);
      }
    },
    [selectedGonggeupPyoungList],
  );

  /** stpe 4 매매목적 관련 이벤트 핸들러 */
  const onClickLive = useCallback(() => {
    setPurpose(1);
    setMoveInDateType('이후');

    if (remainingAmountPaymentTime) {
      setRemainingAmountPaymentTime(null);
    }
    if (remainingAmountPaymentTimeType) {
      setRemainingAmountPaymentType('이후');
    }
  }, [remainingAmountPaymentTime, remainingAmountPaymentTimeType]);

  /** stpe 4 매매목적 관련 이벤트 핸들러 */
  const onClickInvestment = useCallback(() => {
    setPurpose(2);
    setRemainingAmountPaymentType('이후');

    if (moveInDate) {
      setMoveInDate(null);
    }
    if (moveInDateType) {
      setMoveInDateType('이후');
    }
  }, [moveInDate, moveInDateType]);

  /** stpe 4 매매목적 관련 이벤트 핸들러 */
  const onChangeRemainingAmountPaymentTime = (val: Date | null) => {
    setRemainingAmountPaymentTime(val);
  };

  /** stpe 4 매매목적 관련 이벤트 핸들러 */
  const onChangeMoveInDate = (val: Date | null) => {
    setMoveInDate(val);
  };

  /** stpe 4 매매목적 관련 이벤트 핸들러 */
  const onChangeMoveInDateType = (val: string) => {
    setMoveInDateType(val);
  };

  /** stpe 4 매매목적 관련 이벤트 핸들러 */
  const onChangeRemainingAmountTimeType = (val: string) => {
    setRemainingAmountPaymentType(val);
  };

  /** stpe 4 Or 5 층수 이벤트 핸들러 */
  const onClickFloorButton = useCallback(
    (val: number) => {
      if (totalFloors.includes(val)) {
        setTotalFloors((prev) => prev.filter((item) => item !== val));
      } else {
        setTotalFloors((prev) => [...prev, val]);
      }
    },
    [totalFloors],
  );

  /** stpe 5 Or 6 텍스트필트 이벤트 핸들러 */
  const onChangeEtcField = useCallback<ChangeEventHandler<HTMLTextAreaElement>>((e) => {
    setEtc(e.target.value);
  }, []);

  /** 거래종류 변경시 팝업 이벤트 핸들러 */
  const onClosePopup = useCallback(() => {
    setOpenResetPopup(false);
  }, []);

  const onConfirmPopup = () => {
    setStep(0);
    setBuyOrRent(undefined);

    setMonthlyRentFee('');
    setTradeOrDepositPrice('');

    setSelectedGonggeupPyoungList([]);

    setPurpose(undefined);
    setMoveInDate(null);
    setMoveInDateType('이후');
    setRemainingAmountPaymentTime(null);
    setRemainingAmountPaymentType('이후');

    setTotalFloors([]);

    setEtc('');

    setOpenResetPopup(false);
  };

  const onChangeCheck = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    setChecked(e.target.checked);
  }, []);

  const handleCTA = async () => {
    const convertedTimeType = (val: string) => {
      if (val === '이전') return 1;
      if (val === '이후') return 2;
      if (val === '당일') return 3;
      return null;
    };

    const describeFloorType = (val: number) => {
      if (val === 1) return '저층';
      if (val === 2) return '중층';
      if (val === 3) return '고층';
      return '';
    };

    if (buyOrRent === BuyOrRent.Buy) {
      const res = await danjiRecommendationFinal({
        pnu: danji.pnu,
        realestate_type: danji.type,

        buy_or_rents: '1',

        trade_price: Number(tradeOrDepositPrice) * 10000,
        deposit: 0,
        monthly_rent_fee: 0,

        pyoungs: selectedGonggeupPyoungList.join(','),

        purpose: purpose === 1 ? '실거주' : '투자',

        remaining_amount_payment_time: purpose === 1 ? null : remainingAmountPaymentTime?.toISOString(),
        remaining_amount_payment_time_type: purpose === 1 ? null : convertedTimeType(remainingAmountPaymentTimeType),

        move_in_date: purpose === 2 ? null : moveInDate?.toISOString(),
        move_in_date_type: purpose === 2 ? null : convertedTimeType(moveInDateType),

        floors: totalFloors.map((item) => describeFloorType(item)).join(','),

        note: etc,
        add_to_regional_suggest: checked,
      });

      if (!res?.error_code) {
        router.replace(Routes.DanjiRecommendationSuccess, {
          searchParams: { p: danji.pnu, rt: danji.type.toString() },
        });
      }
    }
    if (buyOrRent === BuyOrRent.Jeonsae) {
      const res = await danjiRecommendationFinal({
        pnu: danji.pnu,
        realestate_type: danji.type,

        buy_or_rents: '2,3',

        trade_price: 0,
        deposit: Number(tradeOrDepositPrice) * 10000,
        monthly_rent_fee: monthlyRentFee ? Number(monthlyRentFee) * 10000 : 0,

        pyoungs: selectedGonggeupPyoungList.join(','),

        purpose: '',

        remaining_amount_payment_time: null,
        remaining_amount_payment_time_type: null,
        move_in_date: null,
        move_in_date_type: null,

        floors: totalFloors.map((item) => describeFloorType(item)).join(','),

        note: etc,
        add_to_regional_suggest: checked,
      });

      if (!res?.error_code) {
        router.replace(Routes.DanjiRecommendationSuccess, {
          searchParams: { p: danji.pnu, rt: danji.type.toString() },
        });
      }
    }
  };

  const onClickBack = () => {
    router.popLast();
  };

  const onClickBackFinalForm = () => {
    setIsRenderFinalForm(false);
    setChecked(false);
  };

  const onClickNext = (isValid: boolean) => {
    if (step === 5 && buyOrRent === BuyOrRent.Jeonsae) {
      setIsRenderFinalForm(true);
    }

    if (step === 6 && buyOrRent === BuyOrRent.Buy) {
      setIsRenderFinalForm(true);
    }

    if (isValid) {
      setStep((prev) => prev + 1);
    }
  };

  useEffect(() => {}, [buyOrRent]);

  if (!danji) return null;

  return (
    <>
      <Panel width={panelWidth}>
        <DanjiRecommendationTemplate
          danji={danji}
          step={step}
          buyOrRent={buyOrRent}
          tradeOrDepositPrice={tradeOrDepositPrice}
          monthlyRentFee={monthlyRentFee}
          isValidate={isValidate}
          danjiRealPricesPyoungList={danjiRealPricesPyoungList}
          selectedGonggeupPyoungList={selectedGonggeupPyoungList}
          pyoungInputValue={pyoungInputValue}
          purpose={purpose}
          remainingAmountPaymentTime={remainingAmountPaymentTime}
          remainingAmountPaymentTimeType={remainingAmountPaymentTimeType}
          moveInDate={moveInDate}
          moveInDateType={moveInDateType}
          totalFloors={totalFloors}
          etc={etc}
          isRenderFinalForm={isRenderFinalForm}
          openResetPopup={openResetPopup}
          onChangeBuyOrRent={onChangeBuyOrRent}
          onChangeTradeOrDepositPrice={onChangeTradeOrDepositPrice}
          onChangeMonthlyRentFee={onChangeMonthlyRentFee}
          onChangePyoungField={onChangePyoungField}
          onClickPyoungButton={onClickPyoungButton}
          onClickPyoungDeleteIcon={onClickPyoungDeleteIcon}
          onClickPyoungAddIcon={onClickPyoungAddIcon}
          onClickPyoungCloseButton={onClickPyoungCloseButton}
          onClickLive={onClickLive}
          onClickInvestment={onClickInvestment}
          onChangeRemainingAmountPaymentTime={onChangeRemainingAmountPaymentTime}
          onChangeMoveInDate={onChangeMoveInDate}
          onChangeMoveInDateType={onChangeMoveInDateType}
          onChangeRemainingAmountTimeType={onChangeRemainingAmountTimeType}
          onClickFloorButton={onClickFloorButton}
          onChangeEtcField={onChangeEtcField}
          onClosePopup={onClosePopup}
          onConfirmPopup={onConfirmPopup}
          onClickNext={onClickNext}
          onClickBack={onClickBack}
          onClickBackFinalForm={onClickBackFinalForm}
          checked={checked}
          onChangeCheck={onChangeCheck}
          handleCTA={handleCTA}
        />
      </Panel>
    </>
  );
}
