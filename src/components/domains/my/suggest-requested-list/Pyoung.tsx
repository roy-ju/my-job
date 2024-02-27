import tw, { styled } from 'twin.macro';

const Title = styled.p`
  ${tw`text-gray-800 text-subhead_02`}
`;

const Content = styled.div`
  ${tw`text-gray-700 text-body_02`}
`;

export default function Pyoung({ pyoung, isNeedTitle = false }: { pyoung?: string; isNeedTitle?: boolean }) {
  if (!pyoung) return null;

  if (pyoung.includes('잘 모르겠어요')) {
    if (isNeedTitle)
      return (
        <div>
          <Title>평형</Title>
          <Content>평형 잘 모르겠어요</Content>
        </div>
      );

    return <Content>평형 잘 모르겠어요</Content>;
  }

  return isNeedTitle ? (
    <div>
      <Title>평형</Title>
      <Content>{pyoung}</Content>
    </div>
  ) : (
    <Content>{pyoung}</Content>
  );
}
