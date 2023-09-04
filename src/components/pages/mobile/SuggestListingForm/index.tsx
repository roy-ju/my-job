import createSuggestRecommend from '@/apis/suggest/createSuggestRecommend';
import useAPI_GetSuggestDetail from '@/apis/suggest/getSuggestDetail';
import useAPI_GetUserAddress from '@/apis/user/getUserAddress';
import { Loading, MobAuthRequired, MobileContainer } from '@/components/atoms';
import { SuggestListingForm } from '@/components/templates';
import { BuyOrRent } from '@/constants/enums';
import Routes from '@/router/routes';
import { useRouter } from 'next/router';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

export default memo(() => {
  const router = useRouter();

  const { data } = useAPI_GetUserAddress();

  const suggestID = router?.query?.suggestID ? Number(router.query.suggestID) : undefined;

  const { data: suggestData, isLoading } = useAPI_GetSuggestDetail(suggestID);

  const [address, setAddress] = useState<string>('');

  const [buyOrRent, setBuyOrRent] = useState<number>();

  const [tradePrice, setTradePrice] = useState<string>('');

  const [monthlyRentFee, setMonthlyRentFee] = useState<string>('');

  const [floor, setFloor] = useState<string>('');

  const [pyoungArea, setPyoungArea] = useState<string>('');

  const [meterArea, setMeterArea] = useState<string>('');

  const [direction, setDirection] = useState<string>('');

  const [description, setDescription] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);

  const handleChangeAddress = useCallback((val: string) => {
    setAddress(val);
  }, []);

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
    if (!address) return true;

    // 거래종류가 없을 때
    if (!buyOrRent) return true;

    // 금액이 없을 때
    if ((buyOrRent === BuyOrRent.Buy || buyOrRent === BuyOrRent.Jeonsae) && !tradePrice) return true;

    // 금액이 없을 때
    if (buyOrRent === BuyOrRent.Wolsae && (!tradePrice || !monthlyRentFee)) return true;

    // 추천의견이 없을 때
    if (!description) return true;

    return false;
  }, [address, buyOrRent, description, monthlyRentFee, tradePrice]);

  const handleCTA = useCallback(async () => {
    if (!address || !buyOrRent || !description || !suggestID) return;

    setLoading(true);

    const res = await createSuggestRecommend({
      suggest_id: 44,

      address_text: address,

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

      jeonyong_areas: pyoungArea || undefined,

      direction: direction || undefined,

      note: description,
    });

    setTimeout(() => {
      setLoading(false);
    }, 1000);

    if (!res) {
      toast.success('매물 추천이 완료되었습니다.', { toastId: 'suggestRecommendSuccess' });
      router.replace(`/${Routes.EntryMobile}`);
    }
  }, [address, buyOrRent, description, direction, floor, monthlyRentFee, pyoungArea, router, suggestID, tradePrice]);

  const handleClickBack = useCallback(() => {
    router.back();
  }, [router]);

  useEffect(() => {
    if (data?.road_name_address) {
      setAddress(data.road_name_address);
    }
  }, [data?.road_name_address]);

  return (
    <MobAuthRequired ciRequired>
      <MobileContainer>
        {isLoading ? (
          <div tw="py-20">
            <Loading />
          </div>
        ) : suggestData ? (
          <SuggestListingForm
            data={suggestData}
            address={address}
            onChangeAddress={handleChangeAddress}
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
            onClickBack={handleClickBack}
            loading={loading}
            disabledCTA={disabledCTA}
            handleCTA={handleCTA}
          />
        ) : null}
      </MobileContainer>
    </MobAuthRequired>
  );
});
