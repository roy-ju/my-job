import tw, { styled } from 'twin.macro';

import { Accordion } from '@/components/molecules';

const Conatiner = styled.div`
  & > div:not(:last-of-type) {
    ${tw`border-b border-b-gray-300`}
  }
`;

const SummaryText = styled.p`
  ${tw`font-semibold text-b2 text-start text-gray-1000`}
`;

const DetailText = styled.p`
  ${tw`px-5 py-4 break-words whitespace-pre-wrap text-info`}
`;

type ListProps = {
  list?:
    | {
        a: string;
        q: string;
      }[]
    | null;
};

export default function List({ list }: ListProps) {
  return (
    <Conatiner>
      {list?.map((item) => (
        <Accordion key={item.q}>
          <Accordion.Summary tw="px-5 py-4 flex gap-4">
            <SummaryText>{item.q}</SummaryText>
          </Accordion.Summary>
          <Accordion.Details>
            <DetailText>{item.a}</DetailText>
          </Accordion.Details>
        </Accordion>
      ))}
    </Conatiner>
  );
}
