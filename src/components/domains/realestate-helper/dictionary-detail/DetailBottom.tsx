import { Fragment } from 'react';

import tw, { styled } from 'twin.macro';

import { GuideListItem } from '@/services/sub-home/types';

import Seperator from '../dictionary/widget/Seperator';

const Container = styled.div`
  ${tw`flex-1 w-full bg-gray-100`}
`;

const ContentsWrraper = styled.div`
  ${tw`bg-white mt-5 mx-5 p-5 [box-shadow:  0px 2px 16px 0px #0000000F] flex flex-col gap-5 rounded-2xl`}
`;

const ContentsTitle = styled.div`
  ${tw`flex items-center justify-between`}

  span:nth-of-type(1) {
    ${tw`text-heading_01 text-gray-1000`}
  }

  span:nth-of-type(2) {
    ${tw`text-gray-700 text-body_02`}
  }
`;

const ContentsBody = styled.div`
  ${tw`flex flex-col gap-4 pt-5`}
`;

const ContentsDict = styled.div`
  ${tw`flex flex-col gap-1`}

  span:nth-of-type(1) {
    ${tw`text-gray-800 text-subhead_03`}
  }

  p:nth-of-type(1) {
    ${tw`text-gray-700 whitespace-pre-line text-body_02`}
  }
`;

const GoListButton = styled.button`
  ${tw`block mx-auto mt-10 text-center text-gray-700 underline text-body_02`}
`;

type DetailBottomProps = {
  relatedTerms?: GuideListItem[];
};

export default function DetailBottom({ relatedTerms }: DetailBottomProps) {
  const totalCount = relatedTerms?.length ?? 0;

  return (
    <Container>
      <ContentsWrraper>
        <ContentsTitle>
          <span>연관용어</span>
          <span>{totalCount}개</span>
        </ContentsTitle>

        <ContentsBody>
          {relatedTerms?.map((item, idx) => (
            <Fragment key={item.id}>
              <ContentsDict>
                <span>{item.name}</span>
                <p>{item.content}</p>
              </ContentsDict>
              {relatedTerms.length !== idx + 1 && <Seperator tw="my-0" />}
            </Fragment>
          ))}
        </ContentsBody>
      </ContentsWrraper>

      <GoListButton>목록으로 이동</GoListButton>
    </Container>
  );
}
