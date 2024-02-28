import { memo, useState, useCallback, useEffect, useMemo } from 'react';

import { toast } from 'react-toastify';

import { useRouter } from '@/hooks/utils';

import { AuthRequired, Loading, Panel } from '@/components/atoms';

import { OverlayPresenter, Popup } from '@/components/molecules';

import { SuggestListingForm } from '@/components/templates';

import { BuyOrRent } from '@/constants/enums';

import Routes from '@/router/routes';

import createSuggestRecommend from '@/apis/suggest/createSuggestRecommend';

import useAPI_GetSuggestDetail from '@/apis/suggest/getSuggestDetail';

import { useFetchDanjiSuggestsList } from '@/services/danji/useFetchDanjiSuggestsList';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);

  const suggestID = useMemo(
    () => (router?.query?.suggestID ? Number(router.query.suggestID) : undefined),
    [router?.query?.suggestID],
  );

  const danjiID = useMemo(
    () => (router?.query?.danjiID ? Number(router.query.danjiID) : undefined),
    [router?.query?.danjiID],
  );

  const userAddressID = useMemo(
    () => (router?.query?.userAddressID ? Number(router.query.userAddressID as string) : undefined),
    [router?.query?.userAddressID],
  );

  const selectedAddress = useMemo(
    () => (router?.query?.addressDetail ? (router.query.addressDetail as string) : ''),
    [router?.query?.addressDetail],
  );

  const { mutate } = useFetchDanjiSuggestsList({
    danjiID,
    pageSize: 10,
  });

  const { data: suggestData, isLoading } = useAPI_GetSuggestDetail(suggestID);

  const [buyOrRent, setBuyOrRent] = useState<number>();

  const [tradePrice, setTradePrice] = useState<string>('');

  const [monthlyRentFee, setMonthlyRentFee] = useState<string>('');

  const [floor, setFloor] = useState<string>('');

  const [pyoungArea, setPyoungArea] = useState<string>('');

  const [meterArea, setMeterArea] = useState<string>('');

  const [direction, setDirection] = useState<string>('');

  const [description, setDescription] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);

  const [showInActivePopup, setShowInActivePopup] = useState(false);

  const handleChangeBuyOrRent = useCallback(
    (val: number | undefined) => {
      if (buyOrRent === val) return;

      setBuyOrRent(val);
      setTradePrice('');
      setMonthlyRentFee('');
    },
    [buyOrRent],
  );

  const handleChangePrice = useCallback((val: string) => {
    setTradePrice(val);
  }, []);

  const handleChangeMonthlyRentFee = useCallback((val: string) => {
    setMonthlyRentFee(val);
  }, []);

  const handleChangeFloor = useCallback((val: string) => {
    setFloor(val);
  }, []);

  const handleChangePyoungArea = useCallback((val: string) => {
    setPyoungArea(val);
  }, []);

  const handleChangeMeterArea = useCallback((val: string) => {
    setMeterArea(val);
  }, []);

  const handleChangeDirection = useCallback((val: string) => {
    setDirection(val);
  }, []);

  const handleChangeDescription = useCallback((val: string) => {
    setDescription(val);
  }, []);

  const disabledCTA = useMemo(() => {
    // 주소가 없을 때
    if (!selectedAddress || !userAddressID) return true;

    // 거래종류가 없을 때
    if (!buyOrRent) return true;

    // 금액이 없을 때
    if ((buyOrRent === BuyOrRent.Buy || buyOrRent === BuyOrRent.Jeonsae) && !tradePrice) return true;

    // 금액이 없을 때
    if (buyOrRent === BuyOrRent.Wolsae && (!tradePrice || !monthlyRentFee)) return true;

    // 추천의견이 없을 때
    if (!description) return true;

    return false;
  }, [userAddressID, selectedAddress, buyOrRent, description, monthlyRentFee, tradePrice]);

  const handleCTA = useCallback(async () => {
    if (!userAddressID || !selectedAddress || !buyOrRent || !description || !suggestID) return;

    setLoading(true);

    const res = await createSuggestRecommend({
      user_address_id: userAddressID,

      suggest_id: suggestID,

      address_free_text: selectedAddress,

      buy_or_rent: buyOrRent,

      trade_price: buyOrRent === BuyOrRent.Buy ? (tradePrice ? Number(tradePrice) * 10000 : 0) : undefined,

      deposit:
        buyOrRent === BuyOrRent.Jeonsae || buyOrRent === BuyOrRent.Wolsae
          ? tradePrice
            ? Number(tradePrice) * 10000
            : 0
          : undefined,

      monthly_rent_fee:
        buyOrRent === BuyOrRent.Wolsae ? (monthlyRentFee ? Number(monthlyRentFee) * 10000 : 0) : undefined,

      floor: floor || undefined,

      jeonyong_areas: meterArea || undefined,

      direction: direction ? `${direction}향` : undefined,

      note: description,
    });

    setTimeout(() => {
      setLoading(false);
    }, 1000);

    if (!res) {
      toast.success('매물 추천이 완료되었습니다.', { toastId: 'suggestRecommendSuccess' });

      mutate();

      router.replace(Routes.SuggestDetail, {
        searchParams: {
          ...(danjiID ? { danjiID: `${danjiID}` as string } : {}),
          ...(suggestID ? { suggestID: `${suggestID}` as string } : {}),
        },
      });
    }
  }, [
    userAddressID,
    selectedAddress,
    buyOrRent,
    danjiID,
    description,
    direction,
    floor,
    meterArea,
    monthlyRentFee,
    mutate,
    router,
    suggestID,
    tradePrice,
  ]);

  const handleInActivePopupCTA = useCallback(() => {
    router.popAll();
  }, [router]);

  useEffect(() => {
    if (router?.query?.floor) {
      setFloor(router.query.floor as string);
    }
  }, [router?.query?.floor]);

  useEffect(() => {
    if (!router?.query?.danjiID || !router?.query?.userAddressID || !router?.query?.suggestID) {
      setShowInActivePopup(true);
    }
  }, [router?.query?.danjiID, router?.query?.suggestID, router?.query?.userAddressID]);

  return (
    <AuthRequired depth={depth} ciRequired>
      <Panel width={panelWidth}>
        {!showInActivePopup &&
          (isLoading ? (
            <div tw="py-20">
              <Loading />
            </div>
          ) : suggestData ? (
            <SuggestListingForm
              data={suggestData}
              address={selectedAddress}
              buyOrRent={buyOrRent}
              onChangeBuyOrRent={handleChangeBuyOrRent}
              tradePrice={tradePrice}
              onChangePrice={handleChangePrice}
              monthlyRentFee={monthlyRentFee}
              onChangeMonthlyRentFee={handleChangeMonthlyRentFee}
              floor={floor}
              onChangeFloor={handleChangeFloor}
              pyoungArea={pyoungArea}
              onChangePyoungArea={handleChangePyoungArea}
              meterArea={meterArea}
              onChangeMeterArea={handleChangeMeterArea}
              direction={direction}
              onChangeDirection={handleChangeDirection}
              description={description}
              onChangeDescription={handleChangeDescription}
              loading={loading}
              disabledCTA={disabledCTA}
              handleCTA={handleCTA}
            />
          ) : null)}

        {showInActivePopup && (
          <OverlayPresenter>
            <Popup>
              <Popup.ContentGroup tw="py-6">
                <Popup.SubTitle tw="text-center">
                  현재 로그인 계정으로는
                  <br />
                  접근이 불가능한 페이지입니다.
                </Popup.SubTitle>
              </Popup.ContentGroup>
              <Popup.ButtonGroup>
                <Popup.ActionButton onClick={handleInActivePopupCTA}>네고시오 홈으로 돌아가기</Popup.ActionButton>
              </Popup.ButtonGroup>
            </Popup>
          </OverlayPresenter>
        )}
      </Panel>
    </AuthRequired>
  );
});
