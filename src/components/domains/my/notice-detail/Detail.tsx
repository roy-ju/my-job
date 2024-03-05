import tw, { styled } from 'twin.macro';

import { Moment } from '@/components/atoms';

type DetailProps = {
  title: string;
  createdTime: string;
  html: string;
};

const ContentsWrraper = styled.div`
  ${tw`flex flex-col gap-2 mb-5`}
`;

const Title = styled.div`
  ${tw`leading-5 break-words text-b2`}
`;

const HtmlWrraper = styled.div`
  ${tw`text-b2`}
`;

export default function Detail({ title, createdTime, html }: DetailProps) {
  return (
    <>
      <ContentsWrraper>
        <Title>{title}</Title>
        <Moment format="YYYY.MM.DD" tw="text-info leading-3.5 text-gray-700">
          {createdTime}
        </Moment>
      </ContentsWrraper>
      <HtmlWrraper dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}
