import { AuthRequired, Loading, Panel } from '@/components/atoms';
import { memo, useState, useCallback, useEffect, useMemo } from 'react';
import { SuggestListingForm } from '@/components/templates';
import useAPI_GetUserAddress from '@/apis/user/getUserAddress';
import { BuyOrRent } from '@/constants/enums';
import createSuggestRecommend from '@/apis/suggest/createSuggestRecommend';
import { toast } from 'react-toastify';
import { useRouter } from '@/hooks/utils';
import useAPI_GetSuggestDetail from '@/apis/suggest/getSuggestDetail';
import { useAPI_GetDanjiSuggestList } from '@/apis/danji/danjiSuggestList';
import Routes from '@/router/routes';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);

  const { data } = useAPI_GetUserAddress();

  const suggestID = useMemo(
    () => (router?.query?.suggestID ? Number(router.query.suggestID) : undefined),
    [router?.query?.suggestID],
  );

  const danjiID = useMemo(
    () => (router?.query?.danjiID ? Number(router.query.danjiID) : undefined),
    [router?.query?.danjiID],
  );

  const { mutate } = useAPI_GetDanjiSuggestList({
    danjiId: danjiID,
    pageSize: 10,
  });

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
      suggest_id: suggestID,

      address_free_text: address,

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
        searchParams: danjiID
          ? { suggestID: suggestID.toString(), danjiID: danjiID.toString() }
          : { suggestID: suggestID.toString() },
      });
    }
  }, [
    address,
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

  useEffect(() => {
    if (data?.building_name && !data?.dong) {
      setAddress(data.building_name);
      return;
    }

    if (!data?.building_name && data?.dong) {
      setAddress(data.dong);
      return;
    }

    if (data?.building_name && data?.dong) {
      setAddress(`${data.building_name} ${data.dong}`);
      return;
    }

    if (!data?.building_name && !data?.dong && data?.road_name_address) {
      setAddress(data.road_name_address);
    }
  }, [data?.building_name, data?.dong, data?.road_name_address]);

  useEffect(() => {
    if (data?.floor) {
      setFloor(data.floor);
    }
  }, [data?.floor]);

  return (
    <AuthRequired depth={depth} ciRequired>
      <Panel width={panelWidth}>
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
            loading={loading}
            disabledCTA={disabledCTA}
            handleCTA={handleCTA}
          />
        ) : null}
      </Panel>
    </AuthRequired>
  );
});
