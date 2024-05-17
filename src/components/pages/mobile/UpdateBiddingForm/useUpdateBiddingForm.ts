import { useCallback, useEffect, useMemo, useState } from 'react';

import { useRouter } from 'next/router';

import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';

import convertNumberToPriceInput from '@/utils/convertNumberToPriceInput';

import { BuyOrRent } from '@/constants/enums';

import { TimeTypeString } from '@/constants/strings';

import Routes from '@/router/routes';

import useFetchListingDetail from '@/services/listing/useFetchListingDetail';

import { apiService } from '@/services';

import useFethcBiddingInfo from '@/services/bidding/useFetchBiddingInfo';

import { BiddingInfoResponse } from '@/services/bidding/types';

import makeUpdateBiddingParams from './makeUpdateBiddingParams';

export default function useUpdateBiddingForm() {
  const router = useRouter();

  const listingID = Number(router.query.listingID) ?? 0;
  const biddingID = Number(router.query.biddingID) ?? 0;

  const { data, isLoading: isLoadingListing } = useFetchListingDetail(listingID);
  const { data: biddingData } = useFethcBiddingInfo(biddingID);
  const [isLoadingBidding, setIsLoadingBidding] = useState(true);

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
  const [moveInDateType, setMoveInDateType] = useState('이후');

  const [etcs, setEtcs] = useState<string[]>([]);

  const [description, setDescription] = useState('');

  const [popup, setPopup] = useState('none');

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
    const reqParams = makeUpdateBiddingParams({
      acceptingTargetPrice: type === 2,
      price,
      monthlyRentFee,
      moveInDate,
      moveInDateType,
      etcs,
      description,
      biddingInfo: biddingData as BiddingInfoResponse,
    });
    router.replace(
      {
        pathname: `/${Routes.EntryMobile}/${Routes.UpdateBiddingSummary}`,
        query: {
          listingID: router.query.listingID as string,
          biddingID: router.query.biddingID as string,
          params: JSON.stringify(reqParams),
        },
      },
      `/${Routes.EntryMobile}/${Routes.UpdateBiddingSummary}?listingID=${router.query.listingID}`,
    );
  }, [router, biddingData, price, type, monthlyRentFee, moveInDate, moveInDateType, etcs, description]);

  const handleCancelBidding = useCallback(async () => {
    if (listingID && biddingID) {
      await apiService.cancelBidding(listingID, biddingID);
    }
    router.back();
  }, [router, listingID, biddingID]);

  const handleClickNext = useCallback(() => {
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
  }, [type, price, monthlyRentFee, data?.listing?.buy_or_rent, moveInDate]);

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

  useIsomorphicLayoutEffect(() => {
    if (biddingParams) {
      setIsLoadingBidding(false);
      return;
    }

    if (!biddingData || !data?.listing?.buy_or_rent) return;

    if (biddingData.accepting_target_price === true) {
      setType(2);
    }
    if (biddingData.accepting_target_price === false) {
      setType(1);
    }
    if (biddingData.bidding_trade_or_deposit_price) {
      setPrice(convertNumberToPriceInput(biddingData.bidding_trade_or_deposit_price));
    }
    if (biddingData.bidding_monthly_rent_fee) {
      setMonthlyRentFee(convertNumberToPriceInput(biddingData.bidding_monthly_rent_fee));
    }

    if (biddingData.move_in_date) {
      setMoveInDate(new Date(biddingData.move_in_date));
    }
    if (biddingData.move_in_date_type) {
      setMoveInDateType(TimeTypeString[biddingData.move_in_date_type]);
    }
    if (biddingData.etcs) {
      setEtcs(biddingData.etcs.split(','));
    }
    if (biddingData.description) {
      setDescription(biddingData.description);
    }

    setIsLoadingBidding(false);
  }, [biddingParams, biddingData, data?.listing?.buy_or_rent]);

  return {
    isLoadingListing,
    isLoadingBidding,

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
    handleCancelBidding,
    handleClickNext,

    popup,
    setPopup,
  };
}
