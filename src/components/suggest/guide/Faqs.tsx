import tw, { styled, theme } from 'twin.macro';

import { Accordion } from '@/components/molecules';

import { FAQ } from './constants/guide_ments';

const Conatiner = styled.div`
  & > div:not(:last-of-type) {
    ${tw`border-b border-b-gray-300`}
  }
`;

export default function Faqs() {
  return (
    <div tw="pb-10 pt-10">
      <p tw="text-h3 font-bold px-5 pr-4 pb-4">자주묻는 질문</p>

      <Conatiner>
        {FAQ.map((item) => (
          <Accordion key={item.head}>
            <Accordion.Summary
              tw="px-5 pr-4 py-4 flex gap-4 hover:bg-white"
              isCustomIcon
              iconColor={theme`colors.gray.700`}
              iconWidth={16}
            >
              <p tw="[text-align: left]">{item.head}</p>
            </Accordion.Summary>

            <Accordion.Details tw="pb-4">
              {item.paragraph.map((value) => (
                <p tw="px-5 pr-4 text-info break-words whitespace-pre-wrap [letter-spacing: -0.15px]" key={value}>
                  {value}
                </p>
              ))}
            </Accordion.Details>
          </Accordion>
        ))}
      </Conatiner>
    </div>
  );
}
