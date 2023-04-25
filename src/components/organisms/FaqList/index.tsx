import { Accordion } from '@/components/molecules';
import tw, { styled } from 'twin.macro';

const Conatiner = styled.div`
  & > div:not(:last-of-type) {
    ${tw`border-b border-b-gray-300`}
  }
`;

export default function FaqList({
  list,
}: {
  list?:
    | {
        a: string;
        q: string;
      }[]
    | null;
}) {
  return (
    <Conatiner>
      {list?.map((item) => (
        <Accordion key={item.q}>
          <Accordion.Summary tw="px-5 py-2">
            <p tw="text-b2 mb-2">{item.q}</p>
            <p tw="text-gray-700 text-mobCaption text-left">2022.10.10</p>
          </Accordion.Summary>
          <Accordion.Details>
            <p tw="px-5 text-b2 break-words py-2 whitespace-pre-wrap">{item.a}</p>
          </Accordion.Details>
        </Accordion>
      ))}
    </Conatiner>
  );
}
