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
          <Accordion.Summary tw="px-5 py-4 flex gap-4">
            <p tw="text-b2 text-start font-semibold text-gray-1000">{item.q}</p>
          </Accordion.Summary>
          <Accordion.Details>
            <p tw="px-5 text-info break-words py-4 whitespace-pre-wrap">{item.a}</p>
          </Accordion.Details>
        </Accordion>
      ))}
    </Conatiner>
  );
}
