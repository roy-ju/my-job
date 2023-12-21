import { toast } from 'react-toastify';

import { RegionItem } from '@/components/organisms/RegionList';

import convertPriceInputToNumber from '@/utils/convertPriceInputToNumber';

import { BuyOrRent, RealestateType } from '@/constants/enums';

import { Forms, FormsInfo } from '../types';

interface Args {
  bubjungdong: RegionItem;
  realestateType: number[];
  buyOrRent: number;
  price: string;
  monthlyRentFee: string;
  investAmount: string;
  negotiable: boolean;
  minArea: string;
  maxArea: string;
  purpose: string;
  moveInDate: Date | null;
  moveInDateType: string;
  description: string;
  interviewAvailabletimes: string[];
}

type ErrorHandlingWithElementTypes = {
  elementID: Forms;
  errorMessage?: string;
  behavior?: ScrollBehavior;
};

export default class SuggestRegionalFormUtils {
  static getDateType(value?: string) {
    if (value === '이전') return 1;
    if (value === '이후') return 2;
    return 3;
  }

  static autoScroll(elementID: string, forms: Forms[], currentForm: Forms, params?: string | string[]) {
    const formContainer = document.getElementById(elementID);
    const formElement = document.getElementById(currentForm);

    const containerHeight = formContainer?.getBoundingClientRect().height ?? 0;

    if (formElement && currentForm !== FormsInfo.Region) {
      formElement.style.minHeight = `${containerHeight}px`;
      const prevForm = forms[forms.length - 2];

      if (prevForm) {
        const prevFormElement = document.getElementById(prevForm);
        if (prevFormElement && !params) {
          prevFormElement.style.minHeight = '';
        }
      }

      if (params) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
      } else {
        formElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  static makeSuggestRegionalParams(args: Args) {
    if (args.realestateType.includes(RealestateType.Dasaedae)) {
      args.realestateType.push(RealestateType.Yunrip);
    }

    const params: Record<string, unknown> = {
      address: args.bubjungdong.name,
      bubjungdong_code: args.bubjungdong.code,
      realestate_types: `${args.realestateType}`,
      buy_or_rents: args.buyOrRent === BuyOrRent.Buy ? '1' : '2,3',
      invest_amount: args.buyOrRent === BuyOrRent.Buy ? convertPriceInputToNumber(args.investAmount) : 0,
      trade_price: args.buyOrRent === BuyOrRent.Buy ? convertPriceInputToNumber(args.price) : 0,
      deposit: args.buyOrRent !== BuyOrRent.Buy ? convertPriceInputToNumber(args.price) : 0,
      monthly_rent_fee: args.buyOrRent !== BuyOrRent.Buy ? convertPriceInputToNumber(args.monthlyRentFee) : 0,
      negotiable: args.negotiable,
      pyoung_from: args.minArea,
      pyoung_to: args.minArea === args.maxArea ? undefined : args.maxArea,
      purpose: args.purpose,
      move_in_date: args.purpose === '투자' ? null : args.moveInDate?.toISOString(),
      move_in_date_type: args.purpose === '투자' ? null : SuggestRegionalFormUtils.getDateType(args.moveInDateType),
      note: args.description,
      interview_available_times: args.interviewAvailabletimes.join(),
    };
    Object.keys(params).forEach((key) => (params[key] === undefined || params[key] === '') && delete params[key]);
    return params;
  }

  static errorHandlingWithElement({
    elementID,
    errorMessage = '',
    behavior = 'smooth',
  }: ErrorHandlingWithElementTypes) {
    const element = document.getElementById(elementID);

    if (element) {
      element.scrollIntoView({ behavior });

      if (errorMessage) {
        toast.error(errorMessage);
      }
    }
  }
}
