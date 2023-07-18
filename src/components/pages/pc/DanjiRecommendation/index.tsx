/* eslint-disable react-hooks/exhaustive-deps */
import { useAPI_GetDanjiDetail } from '@/apis/danji/danjiDetail';
import { useAPI_DanjiRealPricesPyoungList } from '@/apis/danji/danjiRealPricesPyoungList';
import danjiRecommendationFinal from '@/apis/danji/danjiRecommendationFinal';
import { AuthRequired, Panel } from '@/components/atoms';
import { OverlayPresenter, Popup } from '@/components/molecules';
import { DanjiRecommendation as DanjiRecommendationTemplate } from '@/components/templates';
import { BuyOrRent } from '@/constants/enums';
import { useIsomorphicLayoutEffect, useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import React, { ChangeEventHandler, useCallback, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

interface Props {
  depth: number;
  panelWidth?: string;
}

const prefixDanjiRecommend: string = 'danji-recommend-';

export default function DanjiRecommendation({ depth, panelWidth }: Props) {
  const router = useRouter(depth);

  const [openPopup, setOpenPopup] = useState(false);

  const [step, setStep] = useState(1);
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
  const [totalFloors, setTotalFloors] = useState<number[]>([1, 2, 3]);
  const [etc, setEtc] = useState('');
  const [isRenderFinalForm, setIsRenderFinalForm] = useState(false);

  const [forms, setForms] = useState<string[]>([`${prefixDanjiRecommend}default`]);

  const { danji } = useAPI_GetDanjiDetail({
    danjiId: router?.query?.danjiID ? Number(router.query.danjiID) : null,
    realestateType: router?.query?.rt ? Number(router.query.rt) : undefined,
  });

  const { list: danjiRealPricesPyoungList } = useAPI_DanjiRealPricesPyoungList({
    danjiId: danji.danji_id,
    realestateType: danji?.type,
    buyOrRent: buyOrRent || null,
  });

  const isValidate = useMemo(() => {
    if (step === 0) {
      return true;
    }

    if (step === 1) {
      return selectedGonggeupPyoungList.length > 0;
    }

    if (step === 2) {
      return selectedGonggeupPyoungList.length > 0 && totalFloors.length > 0;
    }

    if (step === 3) {
      if (buyOrRent && selectedGonggeupPyoungList.length > 0 && totalFloors.length > 0) {
        return true;
      }
      return false;
    }

    if (step === 4 && buyOrRent === BuyOrRent.Buy) {
      if (
        purpose === 1 &&
        moveInDate &&
        moveInDateType &&
        buyOrRent &&
        selectedGonggeupPyoungList.length > 0 &&
        totalFloors.length > 0
      ) {
        return true;
      }
      if (
        purpose === 2 &&
        remainingAmountPaymentTime &&
        remainingAmountPaymentTimeType &&
        buyOrRent &&
        selectedGonggeupPyoungList.length > 0 &&
        totalFloors.length > 0
      ) {
        return true;
      }
      return false;
    }

    if (step === 5 && buyOrRent === BuyOrRent.Buy) {
      if (
        (purpose === 1 || purpose === 2) &&
        (remainingAmountPaymentTime || moveInDate) &&
        buyOrRent &&
        selectedGonggeupPyoungList.length > 0 &&
        totalFloors.length > 0
      ) {
        return true;
      }
      return false;
    }

    if (step === 6 && buyOrRent === BuyOrRent.Buy) {
      if (
        (purpose === 1 || purpose === 2) &&
        (remainingAmountPaymentTime || moveInDate) &&
        selectedGonggeupPyoungList.length > 0 &&
        totalFloors.length > 0
      ) {
        return true;
      }
      return false;
    }

    if (step === 4 && buyOrRent !== BuyOrRent.Buy) {
      if (selectedGonggeupPyoungList.length > 0 && totalFloors.length > 0) {
        return true;
      }

      return false;
    }

    if (step === 5 && buyOrRent !== BuyOrRent.Buy) {
      if (selectedGonggeupPyoungList.length > 0 && totalFloors.length > 0) {
        return true;
      }
      return false;
    }

    return false;
  }, [
    buyOrRent,
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

  /** 거래종류 이벤트 핸들러 */
  const onChangeBuyOrRent = (val: number) => {
    if (buyOrRent) {
      if (step >= 3) {
        setOpenResetPopup(true);
        return;
      }
      setBuyOrRent(val);
    } else {
      setBuyOrRent(val);
    }
  };

  /** 돈관련 이벤트 핸들러 */
  const onChangeTradeOrDepositPrice = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    setTradeOrDepositPrice(e.target.value);
  }, []);

  /** 돈관련 이벤트 핸들러 */
  const onChangeMonthlyRentFee = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    setMonthlyRentFee(e.target.value);
  }, []);

  /** 평관련 이벤트 핸들러 */
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

  /** 평관련 이벤트 핸들러 */
  const onClickPyoungCloseButton = useCallback((val: number) => {
    setSelectedGonggeupPyoungList((prev) => prev.filter((item) => item !== val));
  }, []);

  /** 평관련 이벤트 핸들러 */
  const onChangePyoungField = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    setPyoungInputValue(e.target.value);
  }, []);

  /** 평관련 이벤트 핸들러 */
  const onClickPyoungDeleteIcon = useCallback(() => {
    setPyoungInputValue('');
  }, []);

  /** 평관련 이벤트 핸들러 */
  const onClickPyoungAddIcon = useCallback(
    (val: string) => {
      if (!val) return;

      if (selectedGonggeupPyoungList.includes(Number(val))) {
        toast.error('이미 추가하신 평형입니다.', { toastId: 'toast_already' });
        setPyoungInputValue('');
      } else {
        setSelectedGonggeupPyoungList((prev) => [...prev, Number(val)]);
        setPyoungInputValue('');
      }
    },
    [selectedGonggeupPyoungList],
  );

  /** 매매목적 관련 이벤트 핸들러 */
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

  /** 매매목적 관련 이벤트 핸들러 */
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

  /** 매매목적 관련 이벤트 핸들러 */
  const onChangeRemainingAmountPaymentTime = (val: Date | null) => {
    setRemainingAmountPaymentTime(val);
  };

  /** 매매목적 관련 이벤트 핸들러 */
  const onChangeMoveInDate = (val: Date | null) => {
    setMoveInDate(val);
  };

  /** 매매목적 관련 이벤트 핸들러 */
  const onChangeMoveInDateType = (val: string) => {
    setMoveInDateType(val);
  };

  /** 매매목적 관련 이벤트 핸들러 */
  const onChangeRemainingAmountTimeType = (val: string) => {
    setRemainingAmountPaymentType(val);
  };

  /** 층수 이벤트 핸들러 */
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

  /** 텍스트필트 이벤트 핸들러 */
  const onChangeEtcField = useCallback<ChangeEventHandler<HTMLTextAreaElement>>((e) => {
    if (e.target.value.length > 200) {
      setEtc(e.target.value.slice(0, 200));
      toast.error('더 이상 입력할 수 없습니다.', { toastId: 'toast_already' });
    } else {
      setEtc(e.target.value);
    }
  }, []);

  /** 거래종류 변경시 팝업 이벤트 핸들러 */
  const onClosePopup = useCallback(() => {
    setOpenResetPopup(false);
  }, []);

  const onConfirmPopup = () => {
    setStep(1);
    setBuyOrRent(undefined);

    setMonthlyRentFee('');
    setTradeOrDepositPrice('');

    setSelectedGonggeupPyoungList([]);
    setPyoungInputValue('');

    setPurpose(undefined);
    setMoveInDate(null);
    setMoveInDateType('이후');
    setRemainingAmountPaymentTime(null);
    setRemainingAmountPaymentType('이후');

    setTotalFloors([1, 2, 3]);

    setEtc('');

    setForms([`${prefixDanjiRecommend}default`]);

    setOpenResetPopup(false);
  };

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
        danji_id: danji.danji_id,
        realestate_type: danji.type,

        buy_or_rents: '1',

        trade_price: Number(tradeOrDepositPrice || 0) * 10000,
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
        add_to_regional_suggest: false,
      });

      if (!res?.error_code) {
        if (router.query.listingID) {
          router.replace(Routes.DanjiRecommendationSuccess, {
            searchParams: {
              listingID: router.query.listingID as string,
              danjiID: danji.danji_id.toString(),
              rt: danji.type.toString(),
            },
          });
        } else {
          router.replace(Routes.DanjiRecommendationSuccess, {
            searchParams: { danjiID: danji.danji_id.toString(), rt: danji.type.toString() },
          });
        }
      }
    }
    if (buyOrRent === BuyOrRent.Jeonsae) {
      const res = await danjiRecommendationFinal({
        danji_id: danji.danji_id,
        realestate_type: danji.type,

        buy_or_rents: '2,3',

        trade_price: 0,
        deposit: tradeOrDepositPrice ? Number(tradeOrDepositPrice) * 10000 : 0,
        monthly_rent_fee: monthlyRentFee ? Number(monthlyRentFee) * 10000 : 0,

        pyoungs: selectedGonggeupPyoungList.join(','),

        purpose: '',

        remaining_amount_payment_time: null,
        remaining_amount_payment_time_type: null,
        move_in_date: null,
        move_in_date_type: null,

        floors: totalFloors.map((item) => describeFloorType(item)).join(','),

        note: etc,
        add_to_regional_suggest: false,
      });

      if (!res?.error_code) {
        if (router.query.listingID) {
          router.replace(Routes.DanjiRecommendationSuccess, {
            searchParams: {
              listingID: router.query.listingID as string,
              danjiID: danji.danji_id.toString(),
              rt: danji.type.toString(),
            },
          });
        } else {
          router.replace(Routes.DanjiRecommendationSuccess, {
            searchParams: { danjiID: danji.danji_id.toString(), rt: danji.type.toString() },
          });
        }
      }
    }
  };

  const onClickBack = () => {
    if (step === 1) {
      setOpenPopup(true);
    }

    if (step === 2) {
      setStep((prev) => prev - 1);
      setForms([`${prefixDanjiRecommend}default`]);
    }

    if (step === 3) {
      setStep((prev) => prev - 1);
      if (buyOrRent === BuyOrRent.Buy) {
        setForms([`${prefixDanjiRecommend}default`, `${prefixDanjiRecommend}floor`]);
      } else {
        setForms([`${prefixDanjiRecommend}default`, `${prefixDanjiRecommend}floor`]);
      }
    }

    if (step === 4) {
      setStep((prev) => prev - 1);
      if (buyOrRent === BuyOrRent.Buy) {
        setForms([
          `${prefixDanjiRecommend}default`,
          `${prefixDanjiRecommend}floor`,
          `${prefixDanjiRecommend}buyOrRent`,
        ]);
      } else {
        setForms([
          `${prefixDanjiRecommend}default`,
          `${prefixDanjiRecommend}floor`,
          `${prefixDanjiRecommend}buyOrRent`,
        ]);
      }
    }

    if (step === 5 && buyOrRent === BuyOrRent.Jeonsae) {
      setStep((prev) => prev - 1);
      setForms([
        `${prefixDanjiRecommend}default`,
        `${prefixDanjiRecommend}floor`,
        `${prefixDanjiRecommend}buyOrRent`,
        `${prefixDanjiRecommend}price`,
      ]);
    }

    if (step === 5 && buyOrRent === BuyOrRent.Buy) {
      setStep((prev) => prev - 1);
      setForms([
        `${prefixDanjiRecommend}default`,
        `${prefixDanjiRecommend}floor`,
        `${prefixDanjiRecommend}buyOrRent`,
        `${prefixDanjiRecommend}purpose`,
      ]);
    }

    if (step === 6 && buyOrRent === BuyOrRent.Buy) {
      setStep((prev) => prev - 1);
      setForms([
        `${prefixDanjiRecommend}default`,
        `${prefixDanjiRecommend}floor`,
        `${prefixDanjiRecommend}buyOrRent`,
        `${prefixDanjiRecommend}purpose`,
        `${prefixDanjiRecommend}price`,
      ]);
    }
  };

  const onClickBackFinalForm = () => {
    setIsRenderFinalForm(false);

    if (step === 6 && buyOrRent === BuyOrRent.Jeonsae) {
      setStep(5);
    }

    if (step === 7 && buyOrRent === BuyOrRent.Buy) {
      setStep(6);
    }
  };

  const onClickNext = (isValid: boolean) => {
    if (step === 1) {
      setForms((prev) => [...prev, `${prefixDanjiRecommend}floor`]);
    }

    if (step === 2) {
      setForms((prev) => [...prev, `${prefixDanjiRecommend}buyOrRent`]);
    }

    if (step === 3) {
      if (buyOrRent === BuyOrRent.Buy) {
        setForms((prev) => [...prev, `${prefixDanjiRecommend}purpose`]);
      } else {
        setForms((prev) => [...prev, `${prefixDanjiRecommend}price`]);
      }
    }

    if (step === 4) {
      if (buyOrRent === BuyOrRent.Buy) {
        setForms((prev) => [...prev, `${prefixDanjiRecommend}price`]);
      } else {
        setForms((prev) => [...prev, `${prefixDanjiRecommend}etc`]);
      }
    }

    if (step === 5 && buyOrRent === BuyOrRent.Buy) {
      setForms((prev) => [...prev, `${prefixDanjiRecommend}etc`]);
    }

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

  useIsomorphicLayoutEffect(() => {
    const currentForm = forms[forms.length - 1];

    const formContainer = document.getElementById(`${prefixDanjiRecommend}formContainer`);
    const formElement = document.getElementById(currentForm);

    const containerHeight = formContainer?.getBoundingClientRect().height ?? 0;

    if (formElement) {
      formElement.style.minHeight = `${containerHeight}px`;
      const prevForm = forms[forms.length - 2];
      if (prevForm) {
        const prevFormElement = document.getElementById(prevForm);
        if (prevFormElement) {
          prevFormElement.style.minHeight = '';
        }
      }

      setTimeout(() => formElement.scrollIntoView({ behavior: 'smooth' }), 10);
    }
  }, [forms, isRenderFinalForm]);

  if (!danji) return null;

  return (
    <AuthRequired ciRequired depth={depth}>
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
          handleCTA={handleCTA}
        />
      </Panel>
      {openPopup && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup>
              <Popup.Title>추천받기를 종료하시겠습니까?</Popup.Title>
              <Popup.Body>
                추천받기를 종료하시면 입력하신 내용이 모두 삭제됩니다.
                <br />
                입력한 내용을 확인 또는 수정하시려면 화면을 위로 이동해 주세요.
              </Popup.Body>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.CancelButton onClick={() => setOpenPopup(false)}>닫기</Popup.CancelButton>
              <Popup.ActionButton onClick={() => router.popLast()}>추천받기 종료</Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
    </AuthRequired>
  );
}
