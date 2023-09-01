/* eslint-disable @typescript-eslint/no-unused-vars */
import { AuthRequired, Panel } from '@/components/atoms';
import { memo, useState, useCallback, useEffect, useMemo } from 'react';
import { SuggestMyListing as SuggestMyListingTemplate } from '@/components/templates';
import useAPI_GetUserAddress from '@/apis/user/getUserAddress';
import { BuyOrRent } from '@/constants/enums';
import createSuggestRecommend from '@/apis/suggest/createSuggestRecommend';
import { toast } from 'react-toastify';
import { useRouter } from '@/hooks/utils';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const { data } = useAPI_GetUserAddress();

  const router = useRouter(depth);

  const [address, setAddress] = useState<string>('');

  const [buyOrRent, setBuyOrRent] = useState<number>();

  const [tradePrice, setTradePrice] = useState<string>('');

  const [monthlyRentFee, setMonthlyRentFee] = useState<string>('');

  const [floor, setFloor] = useState<string>('');

  const [pyoungArea, setPyoungArea] = useState<string>('');

  const [meterArea, setMeterArea] = useState<string>('');

  const [direction, setDirection] = useState('');

  const [description, setDescription] = useState('');

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

  const reqPrice = useMemo(() => {
    if (buyOrRent === BuyOrRent.Buy) {
      return tradePrice ? Number(tradePrice) * 10000 : 0;
    }

    if (buyOrRent === BuyOrRent.Jeonsae || buyOrRent === BuyOrRent.Wolsae) {
      return tradePrice ? Number(tradePrice) * 10000 : 0;
    }
  }, [buyOrRent, tradePrice]);

  const handleCTA = useCallback(async () => {
    if (!address || !buyOrRent || !description) return;

    const res = await createSuggestRecommend({
      suggest_id: 0,

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

    if (!res) {
      toast.success('매물 추천이 완료되었습니다.', { toastId: 'suggestRecommendSuccess' });
      router.replace('/');
    }
  }, [address, buyOrRent, description, direction, floor, monthlyRentFee, pyoungArea, router, tradePrice]);

  useEffect(() => {
    if (data?.road_name_address) {
      setAddress(data.road_name_address);
    }
  }, [data?.road_name_address]);

  return (
    <AuthRequired depth={depth} ciRequired>
      <Panel width={panelWidth}>
        <SuggestMyListingTemplate
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
          disabledCTA={disabledCTA}
        />
      </Panel>
    </AuthRequired>
  );
});
