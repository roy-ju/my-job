import { Chip } from '@/components/atoms';
import { Accordion } from '@/components/molecules';
import React from 'react';

function AvailableCoupon() {
  return (
    <div tw="flex items-center w-full">
      <div tw="w-14 h-14 mr-3 bg-nego rounded-full flex justify-center items-center text-white text-info">
        <strong>10%</strong>
      </div>
      <div tw="mr-14">
        <strong>중개수수료 할인</strong>
        <p tw="text-[.625rem] text-gray-700">발급일 2021.11.11</p>
      </div>
    </div>
  );
}

function UnAvailableCoupon() {
  return (
    <div tw="flex items-center w-full">
      <div tw="w-14 h-14 mr-3 bg-gray-400 rounded-full flex justify-center items-center text-white text-info">
        <strong>10%</strong>
      </div>
      <div tw="mr-14">
        <strong>중개수수료 할인</strong>
        <p tw="text-[.625rem] text-left text-gray-700">발급일 2021.11.11</p>
      </div>
      <Chip tw="text-info justify-self-end" variant="gray">
        기간만료
      </Chip>
    </div>
  );
}

export default function MyCouponListItem() {
  return (
    <Accordion>
      <div tw="py-3 pl-4 pr-8">
        <Accordion.Summary>{UnAvailableCoupon()}</Accordion.Summary>
      </div>
    </Accordion>
  );
}
