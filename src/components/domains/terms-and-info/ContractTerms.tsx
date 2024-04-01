import tw, { styled } from 'twin.macro';

import Container from '@/components/atoms/Container';

import { NavigationHeader } from '@/components/molecules';

import useContractTerms from './hooks/useContractTerms';

const Time = styled.div`
  ${tw`px-5 text-gray-700 mt-7 text-info`}
`;

const HtmlWrraper = styled.div`
  ${tw`px-5 my-3`}
`;

/** Only Pc */
export default function ContractTerms() {
  const { html, type, handleClickNavigateToListingDetail } = useContractTerms();

  return (
    <Container>
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={handleClickNavigateToListingDetail} />
        <NavigationHeader.Title>{type === 'seller' ? '집주인' : '매수인'} 중개약정</NavigationHeader.Title>
      </NavigationHeader>
      <Time>시행일자: 2022.11.03</Time>
      <HtmlWrraper dangerouslySetInnerHTML={{ __html: html }} />
    </Container>
  );
}
