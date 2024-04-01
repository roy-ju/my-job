import tw, { styled } from 'twin.macro';

type NoticeProps = { firstLine?: string; secondLine?: string };

const NoticeContainer = styled.div`
  ${tw`flex flex-col gap-1 px-5`}

  span {
    ${tw`text-gray-700 text-body_02`}
  }
`;

const Row = styled.div`
  ${tw`flex flex-row justify-between`}

  p {
    ${tw`text-gray-800 text-subhead_03`}
  }
`;

export default function Notice({ firstLine, secondLine }: NoticeProps) {
  return (
    <NoticeContainer>
      <Row>{firstLine && <p>{firstLine}</p>}</Row>
      {secondLine && <span>{secondLine}</span>}
    </NoticeContainer>
  );
}
