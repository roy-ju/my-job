import { ChangeEventHandler } from 'react';

import { Label, Radio } from '@/components/atoms';

import { RadioGroup } from '@/components/molecules';

interface FunnelInfoProps {
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export default function FunnelInfo({ value, onChange }: FunnelInfoProps) {
  const funnels = [
    { value: 'internet', label: '인터넷 검색' },
    { value: 'sns', label: 'SNS 및 블로그' },
    { value: 'appstore', label: '앱스토어' },
    { value: 'friends', label: '지인 소개' },
    { value: 'ad', label: '광고' },
    { value: 'news', label: '뉴스 기사' },
    { value: 'etc', label: '기타' },
  ];

  return (
    <div tw="px-5">
      <p tw="text-heading_01 mb-1">가입 경로</p>
      <p tw="text-body_01 text-gray-700 mb-6">네고시오를 가입한 경로를 선택해주세요!</p>

      <div tw="flex flex-col gap-4">
        <RadioGroup value={value} onChange={onChange} tw="flex flex-col bg-white gap-4">
          {funnels.map((item) => (
            <Label key={item.value} size="large" control={<Radio iconBlue />} value={item.value} label={item.label} />
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}
