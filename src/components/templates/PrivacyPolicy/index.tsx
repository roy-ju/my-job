import { Dropdown, NavigationHeader } from '@/components/molecules';
import { Separator } from '@/components/atoms';

interface PrivacyPolicyProps {
  termDate: string;
  html: string;
  onClickGoBack?: () => void;
  onChangeSelectedTerms?: (termDate: string) => void;
}

/* eslint-disable */

export default function PrivacyPolicy({ html, termDate, onClickGoBack, onChangeSelectedTerms }: PrivacyPolicyProps) {
  return (
    <div tw="flex flex-col h-full">
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={onClickGoBack} />
        <NavigationHeader.Title>개인정보 처리방침</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="flex-1 min-h-0 overflow-auto">
        <div tw="mt-7 px-5 text-gray-700 text-info">시행일자: {termDate}</div>
        <div tw="mt-3 px-5" dangerouslySetInnerHTML={{ __html: html }} />
        <Separator />
        <div tw="min-h-[8px] bg-gray-300 mt-10" />
        <div tw="py-7 px-5">
          <div tw="text-b1 font-bold text-gray-1000 mb-4">이전 약관 보기</div>
          <Dropdown value={termDate} variant="outlined" onChange={onChangeSelectedTerms}>
            <Dropdown.Option value="2022.10.17">2022.10.17</Dropdown.Option>
            <Dropdown.Option value="2022.11.03">2022.11.03</Dropdown.Option>
            <Dropdown.Option value="2022.12.08">2022.12.08</Dropdown.Option>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}