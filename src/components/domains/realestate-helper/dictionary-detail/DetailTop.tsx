import tw, { styled } from 'twin.macro';

type DetailTopProps = {
  name: string;
  content: string;
};

const Container = styled.div`
  ${tw`flex flex-col gap-5 px-5 py-5 mt-5`}

  span {
    ${tw`text-heading_03 text-gray-1000`}
  }

  p {
    ${tw`text-gray-800 whitespace-pre-line text-body_03`}
  }
`;

export default function DetailTop({ name, content }: DetailTopProps) {
  return (
    <Container>
      <span>{name}</span>
      <p>{content}</p>
    </Container>
  );
}
