import { BuyOrRent } from '@/constants/enums';

import ERROR_MESSAGE from '../form/constants/errorMessage';

import forms from '../form/constants/forms';

import SuggestForm from '../form/types';

import errorHandlingWithElement from './errorHandlingWidthElement';

import isEqualValue from './isEqualValue';

import isNotEqualValue from './isNotEqualValue';

export default function checkFinalValidation(state: SuggestForm, formType: 'create' | 'update' = 'create') {
  if (!state.realestateTypes || (state.realestateTypes && isEqualValue(state.realestateTypes.length, 0))) {
    errorHandlingWithElement({
      elementID: forms.REALESTATE_AND_BUYORRENT_AND_PRICE,
      errorMessage: ERROR_MESSAGE.REQUIRE_REALESTATE_TYPES,
    });

    return false;
  }

  if (!state.buyOrRent) {
    errorHandlingWithElement({
      elementID: forms.REALESTATE_AND_BUYORRENT_AND_PRICE,
      errorMessage: ERROR_MESSAGE.REQUIRE_BUY_OR_RENT,
    });

    return false;
  }

  if (isNotEqualValue(state.quickSale, '1')) {
    if (state.errorMessageTradeOrDepositPrice) {
      errorHandlingWithElement({
        elementID: forms.REALESTATE_AND_BUYORRENT_AND_PRICE,
        errorMessage: state.errorMessageTradeOrDepositPrice,
      });

      return false;
    }

    if (state.errorMessageMonthlyRentFeePrice) {
      errorHandlingWithElement({
        elementID: forms.REALESTATE_AND_BUYORRENT_AND_PRICE,
        errorMessage: state.errorMessageMonthlyRentFeePrice,
      });

      return false;
    }
  }

  if (
    isEqualValue(state.buyOrRent, BuyOrRent.Buy) &&
    isEqualValue(state.purpose, '투자') &&
    state.errorMessageInvestAmountPrice
  ) {
    errorHandlingWithElement({
      elementID: forms.BUY_PURPOSE,
      errorMessage: state.errorMessageInvestAmountPrice,
    });

    return false;
  }

  if (
    isEqualValue(state.buyOrRent, BuyOrRent.Buy) &&
    isEqualValue(state.purpose, '실거주') &&
    (!state.moveInDate || !state.moveInDateType)
  ) {
    errorHandlingWithElement({
      elementID: forms.BUY_PURPOSE,
      errorMessage: ERROR_MESSAGE.REQUIRE_MOVE_IN_DATE,
    });

    return false;
  }

  if (isNotEqualValue(state.buyOrRent, BuyOrRent.Buy) && (!state.moveInDate || !state.moveInDateType)) {
    errorHandlingWithElement({
      elementID: forms.MOVE_IN_DATE,
      errorMessage: ERROR_MESSAGE.REQUIRE_MOVE_IN_DATE,
    });

    return false;
  }

  if (!state.pyoungList || (state.pyoungList && isEqualValue(state.pyoungList.length, 0))) {
    errorHandlingWithElement({
      elementID: forms.AREA,
      errorMessage: ERROR_MESSAGE.REQUIRE_AREA,
    });

    return false;
  }

  if (formType === 'create') {
    if (
      !state.additionalConditions ||
      (state.additionalConditions && isEqualValue(state.additionalConditions.length, 0))
    ) {
      errorHandlingWithElement({
        elementID: forms.ADDITIONAL_CONDITIONS,
        errorMessage: ERROR_MESSAGE.REQUIRE_ADDITIONAL_CONDITIONS,
      });
      return false;
    }
  }

  if (formType === 'update') {
    if (
      (!state.additionalConditions ||
        (state.additionalConditions && isEqualValue(state.additionalConditions.length, 0))) &&
      !state.note
    ) {
      errorHandlingWithElement({
        elementID: forms.ADDITIONAL_CONDITIONS,
        errorMessage: ERROR_MESSAGE.REQUIRE_ADDITIONAL_CONDITIONS_UPDATE,
      });
      return false;
    }
  }

  if (
    !state.interviewAvailabletimes ||
    (state.interviewAvailabletimes && isEqualValue(state.interviewAvailabletimes.length, 0))
  ) {
    errorHandlingWithElement({
      elementID: forms.INTERVIEW,
      errorMessage: ERROR_MESSAGE.REQUIRE_INTERVIEW,
    });

    return false;
  }

  return true;
}
