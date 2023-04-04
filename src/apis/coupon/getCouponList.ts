import { useMemo } from 'react';
import useSWR from 'swr';

export interface GetCouponListResponse {
  coupons: [
    {
      coupon_type: 0;
      created_time: string;
      discount_rate: 0;
      expiration_time: string;
      expired_time: string;
      name: string;
      price: 0;
      redeemtion_time: string;
      status: 0;
      tag_name: string;
      user_coupon_id: 0;
    },
  ];
}

export default function useAPI_GetCouponList() {
  const { data, isLoading, mutate } = useSWR<GetCouponListResponse>('/my/coupons');

  const list = useMemo(
    () =>
      data?.coupons.map((item) => ({
        couponType: item.coupon_type,
        createdTime: item.created_time,
        discountRate: item.discount_rate,
        expirationTime: item.expiration_time,
        expiredTime: item.expired_time,
        name: item.name,
        price: item.price,
        redeemtionTime: item.redeemtion_time,
        status: item.status,
        tagName: item.tag_name,
        couponId: item.user_coupon_id,
      })) ?? [],
    [data],
  );

  return { list, isLoading, mutate };
}
