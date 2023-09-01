import { Avatar, Chip } from '@/components/atoms';
import React from 'react';
import defaultAvatar from '@/../public/static/images/default_avatar.png';
import { Accordion } from '@/components/molecules';

function NegotiableChip() {
  return <div tw="text-white rounded-tl rounded-br text-info font-semibold bg-orange-700 px-1.5 h-5">협의가능</div>;
}

export default function BasicInfo() {
  return (
    <>
      <div tw="flex gap-1 items-center px-5">
        <Avatar alt="" src={defaultAvatar.src} size={24} />
        <span tw="text-gray-700 text-info [letter-spacing: -0.4px]">유저닉네임</span>
        <span tw="text-gray-700 text-info [letter-spacing: -0.4px] ml-auto">1일전</span>
      </div>

      <div tw="flex gap-1 items-center mt-4 px-5">
        <Chip variant="nego">아파트</Chip>
        <span tw="text-info">단지명</span>
      </div>

      <div tw="flex gap-1 items-center mt-1 px-5">
        <span tw="font-bold text-b1">전월세 1억 3,000만 / 50만</span>
        <NegotiableChip />
      </div>

      <div tw="flex flex-col mt-1 px-5">
        <p tw="text-info text-gray-700">평형 34평, 42평, 52평</p>
        <p tw="text-info text-gray-700">입주가능일 23.03.12 이전</p>
      </div>

      <Accordion>
        <Accordion.Summary tw="py-4 px-5 flex gap-4">
          <p tw="[max-width: 300px] text-info text-start text-gray-1000 overflow-hidden [text-overflow: ellipsis] whitespace-nowrap">
            요청사항 최대 1줄 노출. 1줄 이상은 말줄임 처리합니다. 최대 200자 들어옴
          </p>
        </Accordion.Summary>
        <Accordion.Details tw="px-5 pb-4">
          <p tw="text-info break-words whitespace-pre-wrap">
            요청사항요청사항요청사항요청사항요청사항요청사항요청사항요청사항요청사항요청사항요청사항
            요청사항요청사항요청사항요청사항요청사항 요청사항요청사항요청사항요청사항요청사항
            요청사항요청사항요청사항요청사항요청사항요청사항요청사항요청사항요청사항요청사항요청사항
            요청사항요청사항요청사항요청사항요청사항 요청사항요청사항요청사항요청사항요청사항
          </p>
        </Accordion.Details>
      </Accordion>
    </>
  );
}
