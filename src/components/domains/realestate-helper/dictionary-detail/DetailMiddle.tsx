import tw, { styled } from 'twin.macro';

import BulbIcon from '@/assets/icons/bulb_20.svg';

type DetailMiddleProps = {
  content: string;
};

const Container = styled.div`
  ${tw`p-5 mx-5 bg-gray-100 rounded-2xl`}

  p {
    ${tw`text-gray-700 whitespace-pre-line text-body_03`}
  }
`;

const Flex = styled.div`
  ${tw`flex flex-row items-center gap-1 mb-2`}

  span {
    ${tw`text-gray-800 text-subhead_03`}
  }
`;

export default function DetailMiddle({ content }: DetailMiddleProps) {
  if (!content) return null;

  return (
    <Container>
      <Flex>
        <BulbIcon />
        <span>참고사항</span>
      </Flex>
      <p>{content}</p>
    </Container>
  );
}
