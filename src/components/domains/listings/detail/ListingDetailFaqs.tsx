import tw, { styled } from 'twin.macro';

import List from '@/components/domains/my/faq/List';

import useFetchInternalFaqList from '@/services/internal/useFetchInternalFaqList';

const SectionWrraper = styled.div`
  ${tw`px-5 py-10`}
`;

export default function ListingDetailFaqs() {
  const { data } = useFetchInternalFaqList();

  return (
    <SectionWrraper>
      <div>
        <div tw="text-b1 font-bold">
          <h2>거래가이드 & FAQ</h2>
        </div>
        <div tw="mt-5 -mx-5">
          <List list={data?.['[매수인/임차인] 거래 방법이 궁금해요.'] ?? []} />
        </div>
      </div>
    </SectionWrraper>
  );
}
