import React from 'react';

export default function ListHeader({ count }: { count: number }) {
  return (
    <div tw="px-5 py-2">
      <p tw="text-subhead_03 text-gray-800">
        구해요 <span tw="text-nego-1000">{count}</span>
      </p>
      <p tw="text-body_01 text-gray-700">중개사와 집주인의 연락을 기다리고 있는 요청이에요.</p>
    </div>
  );
}
