import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { usePlatform } from '@/providers/PlatformProvider';

import { BuyOrRent, RealestateType } from '@/constants/enums';

import { TimeTypeString } from '@/constants/strings';

import { searchAddress } from '@/lib/kakao/search_address';

import useForm from './useForm';

import useFormDispatch from './useFormDispatch';

import { FormsInfo } from '../types';

export default function useInit() {
  const router = useRouter();

  const form = useForm();

  const dispatch = useFormDispatch();

  const platform = usePlatform();

  // 법정동 프리필
  useEffect(() => {
    let ignore = false;

    function prefillBubjundong(address: string) {
      searchAddress(address).then((data) => {
        const bCode = data?.documents?.[0].address?.b_code;

        if (bCode && !ignore) {
          dispatch?.({
            type: 'update_Field',
            key: 'bubjungdong',
            payLoad: { name: address as string, code: bCode },
          });
        }
      });
    }

    if (router?.query?.address && typeof router.query.address === 'string') {
      prefillBubjundong(router.query.address);

      if (form && form?.forms) {
        const currentForm = form.forms[form.forms.length - 1];
        if (currentForm === FormsInfo.Region) {
          dispatch?.({
            type: 'update_Forms',
            payLoad: FormsInfo.BasicInfo,
          });
        }
      }

      return;
    }

    if (router.query.params) {
      const params: Record<string, unknown> = JSON.parse(router.query.params as string);

      if (params?.address) {
        prefillBubjundong(String(params.address) as string);
      }
    }

    return () => {
      ignore = true;
    };
  }, [dispatch, form, router.query.address, router.query.params]);

  // 수정하기
  useEffect(() => {
    if (!router.query.params || !router.query.forms) return;

    const params: Record<string, unknown> = JSON.parse(router.query.params as string);

    dispatch?.({ type: 'update_Forms', payLoad: JSON.parse(router.query.forms as string) });

    dispatch?.({
      type: 'update_Field',
      key: 'realestateType',
      payLoad: String(params.realestate_types)
        .split(',')
        .map((v) => +v)
        .filter((type) => type !== RealestateType.Yunrip),
    });

    if (Number(params.buy_or_rents) === BuyOrRent.Buy) {
      dispatch?.({
        type: 'update_Field',
        key: 'buyOrRent',
        payLoad: 1,
      });
      dispatch?.({
        type: 'update_Field',
        key: 'price',
        payLoad: params.trade_price ? String(params.trade_price)?.slice(0, -4) : '',
      });
      dispatch?.({
        type: 'update_Field',
        key: 'investAmount',
        payLoad: params.invest_amount ? String(params.invest_amount)?.slice(0, -4) : '',
      });
    } else {
      dispatch?.({
        type: 'update_Field',
        key: 'buyOrRent',
        payLoad: 2,
      });
      dispatch?.({
        type: 'update_Field',
        key: 'price',
        payLoad: params.deposit ? String(params.deposit)?.slice(0, -4) : '',
      });
      dispatch?.({
        type: 'update_Field',
        key: 'monthlyRentFee',
        payLoad: params.monthly_rent_fee ? String(params.monthly_rent_fee)?.slice(0, -4) : '',
      });
    }

    dispatch?.({
      type: 'update_Field',
      key: 'negotiable',
      payLoad: Boolean(params.negotiable),
    });

    dispatch?.({
      type: 'update_Field',
      key: 'minArea',
      payLoad: String(params.pyoung_from ?? ''),
    });

    dispatch?.({
      type: 'update_Field',
      key: 'maxArea',
      payLoad: String(params.pyoung_to ?? ''),
    });

    dispatch?.({
      type: 'update_Field',
      key: 'purpose',
      payLoad: String(params.purpose ?? ''),
    });

    if (String(params.purpose) === '투자') {
      dispatch?.({
        type: 'update_Field',
        key: 'moveInDate',
        payLoad: null,
      });

      dispatch?.({
        type: 'update_Field',
        key: 'moveInDateType',
        payLoad: '이전',
      });
    } else {
      dispatch?.({
        type: 'update_Field',
        key: 'moveInDate',
        payLoad: new Date(String(params.move_in_date ?? '')),
      });

      dispatch?.({
        type: 'update_Field',
        key: 'moveInDateType',
        payLoad: params.move_in_date_type ? TimeTypeString[Number(params.move_in_date_type)] : '이전',
      });
    }

    dispatch?.({
      type: 'update_Field',
      key: 'description',
      payLoad: String(params.note ?? ''),
    });

    dispatch?.({
      type: 'update_Field',
      key: 'interviewAvailabletimes',
      payLoad: params.interview_available_times ? String(params.interview_available_times).split(',') : [],
    });

    if (platform?.platform === 'pc') {
      const url = new URL(window.location.href);

      url.searchParams.delete('params');

      url.searchParams.delete('forms');

      router.replace(url.toString());
    }
  }, [dispatch, platform?.platform, router]);
}
