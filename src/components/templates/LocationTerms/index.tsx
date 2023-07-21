import { Separator } from '@/components/atoms';
import { Dropdown, NavigationHeader } from '@/components/molecules';

interface LocationTermsProps {
  termDate: string;
  html: string;
  onClickGoBack?: () => void;
  onChangeSelectedTerms?: (termDate: string) => void;
}

/* eslint-disable */

export default function LocationTerms({ html, termDate, onClickGoBack, onChangeSelectedTerms }: LocationTermsProps) {
  return (
    <div tw="flex flex-col h-full">
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={onClickGoBack} />
        <NavigationHeader.Title>위치기반 서비스 이용약관</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="flex-1 min-h-0 overflow-y-auto">
        <div tw="mt-7 px-5 text-gray-700 text-info">시행일자: {termDate}</div>
        <div tw="mt-3 px-5" dangerouslySetInnerHTML={{ __html: html }} />
        <Separator />
        <div tw="min-h-[8px] bg-gray-300 mt-10" />
        <div tw="py-7 px-5">
          <div tw="text-b1 font-bold text-gray-1000 mb-4">이전 약관 보기</div>
          <Dropdown value={termDate} variant="outlined" onChange={onChangeSelectedTerms}>
            <Dropdown.Option value="2022.10.17">2022.10.17</Dropdown.Option>
            <Dropdown.Option value="2022.11.03">2022.11.03</Dropdown.Option>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}