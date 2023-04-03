import { useMemo } from 'react';
import useSWR from 'swr';

export interface GetCouponListResponse {
  coupons: [
    {
      coupon_type: 0;
      created_time: 'string';
      discount_rate: 0;
      expiration_time: 'string';
      expired_time: 'string';
      name: 'string';
      price: 0;
      redeemtion_time: 'string';
      status: 0;
      tag_name: 'string';
      user_coupon_id: 0;
    },
  ];
}
