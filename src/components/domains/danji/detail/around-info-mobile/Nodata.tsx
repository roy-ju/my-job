import tw, { styled } from 'twin.macro';

const Container = styled.div`
  ${tw`flex items-center justify-center w-full`}
`;

const Message = styled.span`
  ${tw`text-gray-700 text-body_02 [line-height: 20px]`}
`;

export default function Nodata({ message }: { message: string }) {
  return (
    <Container>
      <Message>{message}</Message>
    </Container>
  );
}
