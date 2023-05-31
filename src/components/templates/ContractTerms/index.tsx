import { NavigationHeader } from '@/components/molecules';

interface Props {
  onClickNavigateToListingDetail: () => void;
  html: string;
  type: string;
}

/*eslint-disable*/

export default function ContractTerms({ onClickNavigateToListingDetail, html, type }: Props) {
  return (
    <div tw="flex flex-col h-full">
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={onClickNavigateToListingDetail} />
        <NavigationHeader.Title>{type === 'seller' ? '집주인' : '매수인'} 중개약정</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="mt-7 px-5 text-gray-700 text-info">시행일자: 2022.11.03</div>
      <div tw="my-3 px-5" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
