import { useCallback, useEffect, useMemo, useState } from 'react';

import { useRouter } from 'next/router';

import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';

import convertNumberToPriceInput from '@/utils/convertNumberToPriceInput';

import { TimeTypeString } from '@/constants/strings';

import { BuyOrRent } from '@/constants/enums';

import Routes from '@/router/routes';

import useFetchListingDetail from '@/services/listing/useFetchListingDetail';

import makeCreateBiddingParams from './makeCreateBiddingParams';

export default function useBiddingForm() {
  const router = useRouter();

  const listingID = Number(router.query.listingID);

  const { data } = useFetchListingDetail(listingID);

  const biddingParams = useMemo(() => {
    if (typeof router.query.params === 'string') {
      return JSON.parse(router.query.params);
    }
    return null;
  }, [router.query.params]);

  const [nextButtonDisabled, setNextButtonDisabled] = useState(true);

  const [type, setType] = useState(1);

  const [price, setPrice] = useState('');
  const [monthlyRentFee, setMonthlyRentFee] = useState('');

  const [moveInDate, setMoveInDate] = useState<Date | null>(null);
  const [moveInDateType, setMoveInDateType] = useState('이전');

  const [etcs, setEtcs] = useState<string[]>([]);
  const [description, setDescription] = useState('');

  const handleChangeType = useCallback(
    (value: number) => {
      if (value === type) return;

      setType(value);

      if (value === 2) {
        setPrice('');
        setMonthlyRentFee('');

        setMoveInDate(null);
        setMoveInDateType('이후');

        setDescription('');
        setEtcs([]);
      }
    },
    [type],
  );

  const handleChangePrice = useCallback((value: string) => {
    setPrice(value);
  }, []);

  const handleChangeMonthlyRentFee = useCallback((value: string) => {
    setMonthlyRentFee(value);
  }, []);

  const handleChangeMoveInDate = useCallback((value: Date | null) => {
    setMoveInDate(value);
  }, []);

  const handleChangeMoveInDateType = useCallback((value: string) => {
    setMoveInDateType(value);
  }, []);

  const handleChangeEtcs = useCallback((value: string[]) => {
    setEtcs(value);
  }, []);

  const handleChangeDescription = useCallback((value: string) => {
    setDescription(value);
  }, []);

  const handleSubmit = useCallback(() => {
    const params = makeCreateBiddingParams({
      acceptingTargetPrice: type === 2,
      price,
      monthlyRentFee,
      moveInDate,
      moveInDateType,
      etcs,
      description,
    });
    router.replace(
      {
        pathname: `/${Routes.EntryMobile}/${Routes.BiddingSummary}`,
        query: {
          listingID: router.query.listingID,
          params: JSON.stringify(params),
        },
      },
      `/${Routes.EntryMobile}/${Routes.BiddingSummary}?listingID=${router.query.listingID}`,
    );
  }, [router, price, type, monthlyRentFee, moveInDate, moveInDateType, etcs, description]);

  const handleClickNext = useCallback(() => {
    setNextButtonDisabled(true);
    handleSubmit();
  }, [handleSubmit]);

  // 버튼 비활성화 로직
  useEffect(() => {
    setNextButtonDisabled(false);

    const buyOrRent = data?.listing?.buy_or_rent ?? 0;
    const priceNum = Number(price) ?? 0;
    const monthlyRentFeeNum = Number(monthlyRentFee) ?? 0;

    if (type === 2) {
      setNextButtonDisabled(false);
      return;
    }

    if (buyOrRent === BuyOrRent.Buy) {
      if (priceNum < 1) {
        setNextButtonDisabled(true);
        return;
      }
    }

    if (buyOrRent === BuyOrRent.Jeonsae) {
      if (priceNum < 1) {
        setNextButtonDisabled(true);
        return;
      }

      if (!moveInDate) {
        setNextButtonDisabled(true);
        return;
      }
    }

    if (buyOrRent === BuyOrRent.Wolsae) {
      if (priceNum < 1 || monthlyRentFeeNum < 1) {
        setNextButtonDisabled(true);
        return;
      }

      if (!moveInDate) {
        setNextButtonDisabled(true);
        return;
      }
    }

    setNextButtonDisabled(false);
  }, [data?.listing?.buy_or_rent, monthlyRentFee, moveInDate, price, type]);

  useIsomorphicLayoutEffect(() => {
    if (!biddingParams) return;

    if (biddingParams.accepting_target_price === true) {
      setType(2);
    }
    if (biddingParams.accepting_target_price === false) {
      setType(1);
    }
    if (biddingParams.bidding_trade_or_deposit_price) {
      setPrice(convertNumberToPriceInput(biddingParams.bidding_trade_or_deposit_price));
    }
    if (biddingParams.bidding_monthly_rent_fee) {
      setMonthlyRentFee(convertNumberToPriceInput(biddingParams.bidding_monthly_rent_fee));
    }

    if (biddingParams.move_in_date) {
      setMoveInDate(new Date(biddingParams.move_in_date));
    }
    if (biddingParams.move_in_date_type) {
      setMoveInDateType(TimeTypeString[biddingParams.move_in_date_type]);
    }
    if (biddingParams.etcs) {
      setEtcs(biddingParams.etcs.split(','));
    }
    if (biddingParams.description) {
      setDescription(biddingParams.description);
    }
  }, [biddingParams, data?.listing?.buy_or_rent]);

  return {
    listing: data?.listing,
    displayAddress: data?.display_address,

    type,
    handleChangeType,

    price,
    handleChangePrice,

    monthlyRentFee,
    handleChangeMonthlyRentFee,

    moveInDate,
    handleChangeMoveInDate,

    moveInDateType,
    handleChangeMoveInDateType,

    etcs,
    handleChangeEtcs,

    description,
    handleChangeDescription,

    nextButtonDisabled,
    handleClickNext,
  };
}
